import React from "react";

// constants
import { SHORT_ADDRESS, copyAddress } from "../Context/index";
// icons
import { FaRegCopy } from "./ReactICON";

const Notification = ({ poolDetails, page }) => {
  const notificationsArray = poolDetails?.notifications ?? [];

  console.log({ poolDetails });

  return (
    <div className="section" id="staking">
      <div className="container">
        <div className="row">
          {page !== "activity" && (
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <div className="section__title">
                <h2>Active Live (WIP) </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  omnis in vitae labore sint culpa eveniet a dolorum quas
                  aliquam
                </p>
              </div>
            </div>
          )}

          <div className="col-12">
            <div
              className="deals scrollable-div"
              style={{ overflowX: "scrolls" }}
            >
              <table className="table__deals">
                <thead>
                  <tr>
                    <th>TypeOf</th>
                    <th>Token</th>
                    <th>User</th>
                    <th>Pool ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {notificationsArray?.map((notify, index) => (
                    <tr key={index}>
                      <td>
                        <div className="deals__text">{notify?.typeOf}</div>
                      </td>
                      <td>
                        <div className="deals__exchange">
                          <img src="img/exchanges/ethereum.png" alt="" />
                          <span className="green">
                            {poolDetails?.rewardToken?.symbol}{" "}
                            {poolDetails?.rewardToken?.name}
                          </span>
                          <span className="red">
                            &nbsp;&nbsp;{" "}
                            <FaRegCopy
                              onClick={() =>
                                copyAddress(poolDetails?.rewardToken?.address)
                              }
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
