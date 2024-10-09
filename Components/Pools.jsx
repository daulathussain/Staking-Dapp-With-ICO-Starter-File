import React from "react";

import { MdOutlineAttachMoney, FaRegCopy } from "./ReactICON/index";

const Pools = ({
  setPoolID,
  poolDetails,
  setSelectedPool,
  setSelectedToken,
}) => {
  const poolArray = poolDetails?.poolInfoArray ?? [];

  return (
    <div className="section" id="staking">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
            <div className="section__title">
              <h2>Staking Pool</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                omnis in vitae labore sint culpa eveniet a dolorum quas aliquam
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {poolArray
            .map((pool, index) => (
              <div
                className={`col-12 ${index < 2 ? "col-md-6" : ""} col-log-4`}
              >
                <div className="apool">
                  <h3 className="apool__title">
                    {index === 0
                      ? "Maximum"
                      : index === 1
                      ? "Standard"
                      : index === 2
                      ? "Lite"
                      : "Advanced"}
                  </h3>
                  <ul
                    className={`nav nav__tabs apool__tabs apool__tabs${
                      index === 0
                        ? "orange"
                        : index === 1
                        ? "green"
                        : index === 2
                        ? "blue"
                        : "orange"
                    }`}
                    id={
                      index === 0
                        ? "apool__tabs1"
                        : index === 1
                        ? "apool__tabs2"
                        : index === 2
                        ? "apool__tabs3"
                        : ""
                    }
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="active"
                        data-bs-toggle="tab"
                        data-bs-target={
                          index === 0
                            ? "#atab-1"
                            : index === 1
                            ? "#atab-3"
                            : index === 2
                            ? "#atab-5"
                            : ""
                        }
                        type="button"
                        role="tab"
                        aria-controls={
                          index === 0
                            ? "atab-1"
                            : index === 1
                            ? "atab-3"
                            : index === 2
                            ? "atab-5"
                            : ""
                        }
                        aria-selected="true"
                      >
                        {/* @todo: check y below is not working */}
                        {pool?.lockDays} {pool?.lockDays === 1 ? "Day" : "Days"}
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        data-bs-toggle="tab"
                        data-bs-target={
                          index === 0
                            ? "#atab-2"
                            : index === 1
                            ? "#atab-4"
                            : index === 2
                            ? "#atab-6"
                            : ""
                        }
                        type="button"
                        role="tab"
                        aria-controls={
                          index === 0
                            ? "atab-2"
                            : index === 1
                            ? "atab-4"
                            : index === 2
                            ? "atab-6"
                            : ""
                        }
                        aria-selected="false"
                      >
                        {/* @todo: check y below is not working */}
                        Details
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id={
                        index === 0
                          ? "atab-1"
                          : index === 1
                          ? "atab-3"
                          : index === 2
                          ? "atab-5"
                          : ""
                      }
                      role="tabpanel"
                    >
                      <div className="apool__content">
                        <span className="apool__value">
                          Deposited: {pool?.amount} {pool?.depositToken?.symbol}
                        </span>
                        <span className="apool__value">
                          Reward: {pool?.userReward}{" "}
                          {pool?.depositToken?.symbol}
                        </span>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id={
                        index === 0
                          ? "atab-2"
                          : index === 1
                          ? "atab-4"
                          : index === 2
                          ? "atab-6"
                          : ""
                      }
                      role="tabpanel"
                    >
                      <div className="apool__content">
                        <span className="apool__value">
                          <b>{pool?.depositToken?.symbol} &nbsp;:</b>{" "}
                          {pool?.depositToken?.address.slice(0, 15)}...{" "}
                          <FaRegCopy />
                        </span>

                        <span className="apool__value">
                          <b>{pool?.rewardToken?.symbol} &nbsp;:</b>{" "}
                          {pool?.rewardToken?.address.slice(0, 15)}...{" "}
                          <FaRegCopy />
                        </span>

                        <span className="apool__value">
                          <b>Current APY &nbsp;:</b> {pool?.apy}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="apool__group">
                    <label htmlFor="pool1" className="apool__label">
                      Total Deposited Amount
                    </label>
                    <input
                      type="text"
                      className="apool__input"
                      style={{ backgroundColor: "transparent" }}
                      placeholder={`${pool.depositedAmount} ${pool?.depositToken?.symbol}`}
                      disabled
                    />
                  </div>
                  <button
                    className="apool__btn"
                    data-bs-target="#modal-apool"
                    type="button"
                    data-bs-toggle="modal"
                    onClick={() => {
                      setPoolID(index);
                      setSelectedPool(pool);
                      setSelectedToken(pool);
                    }}
                  >
                    Invest
                  </button>

                  <span
                    className={`block-icon block-icon${
                      index === 0
                        ? "orange"
                        : index === 1
                        ? "green"
                        : index === 2
                        ? "blue"
                        : "orange"
                    }`}
                  >
                    <MdOutlineAttachMoney
                      style={{ color: "white", fontSize: "1.5rem" }}
                    />
                  </span>
                  <span className="screw screw--line-tr" />
                </div>
              </div>
            ))
            .slice(0, 3)}
        </div>
      </div>
    </div>
  );
};

export default Pools;
