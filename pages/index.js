import { useState, useEffect } from "react";
// external libs
import { useAccount } from "wagmi";
// components
import {
  Header,
  Footer,
  HeroSection,
  Statistics,
  Pools,
  Token,
  Withdraw,
  Notification,
  Partners,
  Ask,
  PoolsModel,
  ICOSale,
  Contact,
  WithdrawModal,
  Loader,
} from "../Components/index";
import {
  CONTRACT_DATA,
  addTokenMetamask,
  claimReward,
  deposit,
  withdraw,
} from "../Context/index";

const index = () => {
  const { address } = useAccount();
  const [loader, setLoader] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const [poolID, setPoolID] = useState();
  const [withdrawPoolID, setWithdrawPoolID] = useState();
  const [poolDetails, setPoolDetails] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [selectedToken, setSelectedToken] = useState();

  const LOAD_DATA = async () => {
    try {
      setLoader(true);
      const data = await CONTRACT_DATA(address);
      setPoolDetails(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LOAD_DATA();
  }, [address]);

  return (
    <>
      <Header />
      <HeroSection
        poolDetails={poolDetails}
        addTokenMetamask={addTokenMetamask}
      />
      <Statistics poolDetails={poolDetails} />
      <Pools
        setPoolID={setPoolID}
        poolDetails={poolDetails}
        setSelectedPool={setSelectedPool}
        setSelectedToken={setSelectedToken}
      />
      <Token poolDetails={poolDetails} />
      <Withdraw
        setWithdrawPoolID={setWithdrawPoolID}
        poolDetails={poolDetails}
      />
      <Notification poolDetails={poolDetails} />
      <Partners />
      <Ask setContactUs={setContactUs} />
      <Footer />

      {/* modal */}
      <PoolsModel
        deposit={deposit}
        poolID={poolID}
        address={address}
        selectedPool={selectedPool}
        selectedToken={selectedToken}
        setLoader={setLoader}
      />

      <PoolsModel
        Withdraw={Withdraw}
        withdrawPoolID={withdrawPoolID}
        address={address}
        setLoader={setLoader}
        claimReward={claimReward}
      />

      <WithdrawModal
        withdrawPoolID={withdrawPoolID}
        withdrawn={withdraw}
        address={address}
        setLoader={setLoader}
        claimReward={claimReward}
      />

      <ICOSale setLoader={setLoader} />

      {contactUs && <Contact setContactUs={setContactUs} />}

      {loader && <Loader />}
    </>
  );
};

export default index;
