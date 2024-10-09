import React from "react";

const Statistics = ({ poolDetails }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {poolDetails?.poolInfoArray
            ?.map((poolInfo, index) => (
              <div key={index} className="col-12 col-sm-6 col-xl-3">
                <div className="stats">
                  <span className="stats__value">
                    {poolInfo?.depositedAmount} &nbsp;{" "}
                    {poolInfo?.depositToken?.symbol}
                  </span>
                  <p className="stats__name">Current APY: {poolInfo?.apy}%</p>
                </div>
              </div>
            ))
            .slice(0, 3)}

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stats">
              <span className="stats__value">
                {poolDetails?.totalDepositAmount} &nbsp;{" "}
                {poolDetails?.depositToken?.symbol}
              </span>
              <p className="stats__name">Total Stake</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
