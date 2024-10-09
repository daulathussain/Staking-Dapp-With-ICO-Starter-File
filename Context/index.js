import { FixedNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import {
  contract,
  tokenContract,
  toEth,
  ERC20,
  TOKEN_ICO_CONTRACT,
} from "./constants";

const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;

export const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
export const notifyError = (msg) => toast.error(msg, { duration: 2000 });

export const CONVERT_TIMESTAMP_TO_READABLE = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

export const toWei = (amount) => {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei.toString();
};

export const parseErrorMsg = (e) => {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
};

export const shortenAddress = (address) =>
  `${address?.slice(0, 8)}...${address?.slice(address?.length - 4)}`;

export const copyAddress = (address) => {
  navigator.clipboard.writeText(address);
  notifySuccess("Address copied to clipboard!");
};

export const CONTRACT_DATA = async (address) => {
  try {
    const contractObj = await contract();
    // const stakingTokenObj = await tokenContract();

    if (address) {
      const contractOwner = await contractObj.owner();
      const contractAddress = await contractObj.address;

      // notifications
      const notifications = await contractObj.getNotifications();
      const _notificationsArray = await Promise.all(
        notifications?.map(
          async ({ poolID, amount, user, typeOf, timestamp }) => ({
            poolID: poolID.toNumber(),
            amount: toEth(amount),
            user,
            typeOf,
            timestamp: CONVERT_TIMESTAMP_TO_READABLE(timestamp),
          })
        )
      );

      let poolInfoArray = [];
      const poolLength = await contractObj.poolCount();
      const length = poolLength.toNumber();

      // i = 3 temporarily for testing purposes @todo: update
      for (let i = 3; i < length; i++) {
        const poolInfo = await contractObj.poolInfo(i);
        const userInfo = await contractObj.userInfo(i, address);
        const userReward = await contractObj.pendingReward(i, address);
        const tokenPoolInfoA = await ERC20(poolInfo.depositToken, address);
        const tokenPoolInfoB = await ERC20(poolInfo.rewardToken, address);

        const pool = {
          depositTokenAddress: poolInfo.depositToken,
          rewardTokenAddress: poolInfo.rewardToken,
          depositToken: tokenPoolInfoA,
          rewardToken: tokenPoolInfoB,
          depositedAmount: toEth(poolInfo.depositedAmount.toString()),
          apy: poolInfo.apy.toString(),
          lockDays: poolInfo.lockDays.toString(),

          // user
          amount: toEth(userInfo.amount.toString()),
          userReward: toEth(userReward),
          lockUntil: CONVERT_TIMESTAMP_TO_READABLE(
            userInfo.lockUntil.toNumber()
          ),
          lastRewardAt: toEth(userInfo.lastRewardAt.toString()),
        };

        poolInfoArray.push(pool);
      }

      const totalDepositAmount = poolInfoArray.reduce((total, pool) => {
        return total + parseFloat(pool.depositedAmount);
      }, 0);

      const rewardToken = await ERC20(REWARD_TOKEN, address);
      const depositToken = await ERC20(DEPOSIT_TOKEN, address);

      const data = {
        contractOwner,
        contractAddress,
        notifications: _notificationsArray.reverse(),
        rewardToken,
        depositToken,
        poolInfoArray,
        totalDepositAmount,
        contractTokenBalance:
          depositToken.contractTokenBalance - totalDepositAmount,
      };

      return data;
    }
  } catch (error) {
    console.error(error);
    console.error(parseErrorMsg(error));
    return parseErrorMsg(error);
  }
};

export const deposit = async (poolID, amount, address) => {
  try {
    notifySuccess("Calling contract...");
    const contractObj = await contract();
    const stakingTokenObj = await tokenContract();
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
    const currentAllowance = await stakingTokenObj.allowance(
      address,
      contractObj.address
    );
    console.log({ currentAllowance });

    console.log("111");
    if (currentAllowance.lt(amountInWei)) {
      console.log("222");
      notifySuccess("Approving token...");
      const approveTx = await stakingTokenObj.approve(
        contractObj.address,
        amountInWei
      );
      console.log("333");

      await approveTx.wait();
      console.log("444");
      console.log(`Approved ${amountInWei.toString()} tokens for staking`);
      console.log("555");
    }
    console.log("666");

    // @todo: update deposite to deposit after deploying the updated contract
    const gasEstimation = await contractObj.estimateGas.deposite(
      Number(poolID),
      amountInWei
    );

    console.log({ gasEstimation });

    notifySuccess("Staking token call...");

    const stakeTx = await contractObj.deposit(Number(poolID), amountInWei, {
      gasLimit: gasEstimation,
    });
    console.log({ stakeTx });

    const receipt = await stakeTx.wait();
    console.log({ receipt });
    notifySuccess("Token stake successfully...");
    return receipt;
  } catch (error) {
    console.error(error);
    const errorMessage = parseErrorMsg(error);
    notifyError(errorMessage);
  }
};

export const transferToken = async (amount, transferAddress) => {
  try {
    notifySuccess("Calling contract token...");
    const stakingTokenObj = await tokenContract();
    const transferAmount = ethers.utils.parseEther(amount);
    const approveTx = await stakingTokenObj.transfer(
      transferAddress,
      transferAmount
    );

    await approveTx.wait();
    notifySuccess("Token transfer successfully");
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const withdraw = async (poolID, amount) => {
  try {
    notifySuccess("Calling contract...");
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
    const contractObj = await contract();
    const gasEstimation = await contractObj.estimateGas.withdraw(
      Number(poolID),
      amountInWei
    );

    const data = await contractObj.withdraw(Number(poolID), amountInWei, {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("Token completed successfully");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const claimReward = async (poolID) => {
  try {
    notifySuccess("Calling contract...");
    const contractObj = await contract();

    const gasEstimation = await contractObj.estimateGas.claimReward(
      Number(poolID)
    );

    const data = await contractObj.claimReward(Number(poolID), {
      gasLimit: gasEstimation,
    });

    const receipt = await data.wait();
    notifySuccess("Reward claim completed successfully");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const createPool = async (pool) => {
  try {
    const { _depositToken, _rewardToken, _apy, _lockDays } = pool;
    if (!_rewardToken || !_depositToken || !_apy || !_lockDays) {
      return notifyError("Provide all pool details!");
    }

    notifySuccess("Calling contract...");
    const contractObj = await contract();

    const gasEstimation = await contractObj.estimateGas.addPool(
      _depositToken,
      _rewardToken,
      Number(_apy),
      Number(_lockDays)
    );

    const stakeTx = await contractObj.addPool(
      _depositToken,
      _rewardToken,
      Number(_apy),
      Number(_lockDays),
      {
        gasLimit: gasEstimation,
      }
    );

    const receipt = await stakeTx.wait();
    notifySuccess("Pool created successfully");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const modifyPool = async (poolID, amount) => {
  try {
    notifySuccess("Calling contract...");
    const contractObj = await contract();

    const gasEstimation = await contractObj.estimateGas.modifyPool(
      Number(poolID),
      Number(amount)
    );

    const stakeTx = await contractObj.modifyPool(
      Number(poolID),
      Number(amount),
      {
        gasLimit: gasEstimation,
      }
    );

    const receipt = await stakeTx.wait();
    notifySuccess("Pool modified successfully");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const sweep = async (tokenData) => {
  try {
    const { token, amount } = tokenData;
    if (!token || !amount) {
      return notifyError("Token data is missing!");
    }

    notifySuccess("Calling contract...");
    const contractObj = await contract();
    const transferAmount = ethers.utils.parseEther(amount);

    const gasEstimation = await contractObj.estimateGas.sweep(
      token,
      transferAmount
    );

    const stakeTx = await contractObj.sweep(token, transferAmount, {
      gasLimit: gasEstimation,
    });

    const receipt = await stakeTx.wait();
    notifySuccess("Transaction completed successfully");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

// add token metamask
export const addTokenMetamask = async () => {
  if (window.ethereum) {
    const contract = await tokenContract();
    const tokenDecimals = await contract.decimals();
    const tokenAddress = await contract.address;
    const tokenSymbol = await contract.symbol();
    const tokenImage = TOKEN_LOGO;

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        notifySuccess("Token added");
      } else {
        notifyError("Failed to add token!");
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to add token!");
    }
  } else {
    notifyError("metamask is not installed!");
  }
};

// ico contract
export const BUY_TOKEN = async (amount) => {
  try {
    notifySuccess("Calling ico contract");
    const contract = await TOKEN_ICO_CONTRACT();
    const tokenDetails = await contract.getTokenDetails();
    const availableToken = ethers.utils.formatEther(
      tokenDetails.balance.toString()
    );

    if (availableToken > 1) {
      const price =
        ethers.utils.formatEther(tokenDetails.tokenPrice.toString()) *
        Number(amount);

      const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

      const transaction = await contract.buyToken(Number(amount), {
        value: payAmount.toString(),
        gasLimit: ethers.utils.hexlify(8000000),
      });

      const receipt = transaction.wait();
      notifySuccess("Token purchase successful");
      return receipt;
    } else {
      notifyError("Token balance is insufficient!");
      return "receipt ";
    }
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const TOKEN_WITHDRAW = async (amount) => {
  try {
    notifySuccess("Calling ico contract");
    const contract = await TOKEN_ICO_CONTRACT();
    const tokenDetails = await contract.getTokenDetails();
    const availableToken = ethers.utils.formatEther(
      tokenDetails.balance.toString()
    );

    if (availableToken > 1) {
      const transaction = await contract.withdrawAllTokens();

      const receipt = transaction.wait();
      notifySuccess("Token purchase successful");
      return receipt;
    } else {
      notifyError("Token balance is insufficient!");
      return "receipt ";
    }
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const UPDATE_TOKEN = async (_address) => {
  try {
    if (!_address) return notifyError("No address available");

    const contract = await TOKEN_ICO_CONTRACT();

    const gasEstimation = await contractObj.estimateGas.updateToken(_address);

    const transaction = await contract.updateToken(_address, {
      value: payAmount.toString(),
      gasLimit: gasEstimation,
    });

    const receipt = transaction.wait();
    notifySuccess("Token purchase successful");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};

export const UPDATE_TOKEN_PRICE = async (price) => {
  try {
    if (!price) return notifyError("No price available");
    const contract = await TOKEN_ICO_CONTRACT();
    const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

    const gasEstimation = await contractObj.estimateGas.updateTokenSalePrice(
      payAmount
    );

    const transaction = await contract.updateTokenSalePrice(payAmount, {
      value: payAmount.toString(),
      gasLimit: gasEstimation,
    });

    const receipt = transaction.wait();
    notifySuccess("Token purchase successful");
    return receipt;
  } catch (error) {
    console.error(error);
    const errMsg = parseErrorMsg(error);
    notifyError(errMsg);
  }
};
