import { useState, useEffect } from "react";
// external libs
import { useAccount } from "wagmi";
// components
import { Header, Footer, Loader, ICOSale } from "../Components/index";
import {
  Admin,
  AdminHead,
  UpdateApyModel,
  Auth,
} from "../Components/Admin/index";
// functions
import {
  CONTRACT_DATA,
  transferToken,
  createPool,
  sweep,
  modifyPool,
} from "../Context/index";

// contract
const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const admin = () => {
  const { address } = useAccount();
  // internal state
  const [loader, setLoader] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [poolDetails, setPoolDetails] = useState();
  const [modifyPoolID, setModifyPoolID] = useState();

  // methods
  const LOAD_DATA = async () => {
    if (address) {
      setLoader(true);

      // @todo: extract out constants & .env variables & re-group again in a cleaner way
      if (address?.toLowerCase() === ADMIN_ADDRESS?.toLowerCase()) {
        setCheckAdmin(false);
        const data = await CONTRACT_DATA(address);
        setPoolDetails(data);
      }

      setLoader(false);
    }
  };

  useEffect(() => {
    LOAD_DATA();
  }, []);

  return (
    <>
      <Header page={"admin"} />
      <AdminHead />
      {/* @todo: clean up the hell below */}
      <Admin
        poolDetails={poolDetails}
        transferToken={transferToken}
        address={address}
        setLoader={setLoader}
        createPool={createPool}
        sweep={sweep}
        setModifyPoolID={setModifyPoolID}
      />
      <Footer />

      <UpdateApyModel
        setLoader={setLoader}
        modifyPool={modifyPool}
        modifyPoolID={modifyPoolID}
      />

      <ICOSale setLoader={setLoader} />

      {checkAdmin && <Auth />}
      {loader && <Loader />}
    </>
  );
};

export default admin;
