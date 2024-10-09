import React from "react";
// components
import {
  AdminNav,
  AdminCard,
  Token,
  Investing,
  Transfer,
  Pool,
  Staking,
  ICOToken,
} from "./index";

const Admin = ({
  poolDetails,
  transferToken,
  address,
  setLoader,
  createPool,
  sweep,
  setModifyPoolID,
}) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <AdminNav />

          <div className="col-12 col-lg-9">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
              >
                <div className="row">
                  {poolDetails?.poolInfoArray?.map((poolInfo, index) => {
                    return (
                      <AdminCard
                        key={index}
                        name={`Current APY: ${poolInfo?.apy}`}
                        value={`${poolInfo?.depositedAmount} ${poolDetails?.depositToken?.symbol}`}
                      />
                    );
                  })}

                  <AdminCard
                    name={"Total Stake"}
                    value={`${poolDetails?.depositedAmount || "0"} ${
                      poolDetails?.depositToken?.symbol
                    }`}
                  />

                  <AdminCard
                    name={"Your Balance"}
                    value={`${poolDetails?.depositToken?.balance?.slice(
                      0,
                      8
                    )} ${poolDetails?.depositToken?.symbol}`}
                  />

                  <AdminCard
                    name={"Available Supply"}
                    value={`${poolDetails?.contractTokenBalance
                      ?.toString()
                      ?.slice(0, 8)} ${poolDetails?.depositToken?.symbol}`}
                  />

                  <Token token={poolDetails?.depositToken} />
                </div>
              </div>

              <Investing poolDetails={poolDetails} />
              <Staking
                setLoader={setLoader}
                poolDetails={poolDetails}
                sweep={sweep}
              />
              <Transfer
                setLoader={setLoader}
                poolDetails={poolDetails}
                address={address}
                transferToken={transferToken}
              />
              <Pool
                setLoader={setLoader}
                poolDetails={poolDetails}
                createPool={createPool}
                setModifyPoolID={setModifyPoolID}
              />
              <ICOToken setLoader={setLoader} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
