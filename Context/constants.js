import { ethers } from "ethers";
import StakingDappABI from "./StakingDapp.json";
import TokenIco from "./TokenICO.json";
import CustomTokenABI from "./ERC20.json";

// @todo: rename functions as actions & properties to be more precise & descriptive;

// contract
const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
const TOKEN_ICO = process.env.NEXT_PUBLIC_TOKEN_ICO;

// token
const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;

export const toEth = (amount, decimals = 18) => {
  const toEth = ethers.utils.formatUnits(amount, decimals);
  return toEth.toString();
};

export const tokenContract = async () => {
  if (window?.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      DEPOSIT_TOKEN,
      CustomTokenABI.abi,
      signer
    );

    return contractReader;
  }
};

export const contract = async () => {
  if (window?.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      STAKING_DAPP_ADDRESS,
      StakingDappABI.abi,
      signer
    );

    return contractReader;
  }
};

export const ERC20 = async (address, userAddress) => {
  try {
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractReader = new ethers.Contract(
        address,
        CustomTokenABI.abi,
        signer
      );

      const token = {
        name: await contractReader.name(),
        symbol: await contractReader.symbol(),
        address: await contractReader.address,
        totalSupply: toEth(await contractReader.totalSupply()),
        balance: toEth(await contractReader.balanceOf(userAddress)),
        contractTokenBalance: toEth(
          await contractReader.balanceOf(STAKING_DAPP_ADDRESS)
        ),
      };

      return token;
    }
  } catch (error) {
    console.error(error);
  }
};

// token ico contract
export const LOAD_TOKEN_ICO = async () => {
  try {
    const contract = await TOKEN_ICO_CONTRACT();
    const tokenDetails = await contract.getTokenDetails();
    const contractOwner = await contract.owner();
    const soldTokens = await contract.soldTokens();
    const ICO_TOKEN = await Token_ICO_ERC20();

    const token = {
      tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
      name: tokenDetails.name,
      symbol: tokenDetails.symbol,
      supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
      tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
      tokenAddr: tokenDetails.tokenAddr,
      owner: contractOwner.toLowerCase(),
      soldTokens: soldTokens.toNumber(),
      token: ICO_TOKEN,
    };

    return token;
  } catch (error) {
    console.error(error);
  }
};

export const TOKEN_ICO_CONTRACT = async () => {
  if (window?.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(TOKEN_ICO, TokenIco.abi, signer);

    return contractReader;
  }
};

export const Token_ICO_ERC20 = async () => {
  if (window?.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      DEPOSIT_TOKEN,
      CustomTokenABI.abi,
      signer
    );

    // user address
    const userAddress = await signer.getAddress();
    const nativeBalance = await signer.getBalance();

    const token = {
      address: await contractReader.address,
      name: await contractReader.name(),
      symbol: await contractReader.symbol(),
      decimals: await contractReader.decimals(),
      supply: toEth(await contractReader.totalSupply()),
      balance: toEth(await contractReader.balanceOf(userAddress)),
      nativeBalance: toEth(nativeBalance.toString()),
    };

    return token;
  }
};
