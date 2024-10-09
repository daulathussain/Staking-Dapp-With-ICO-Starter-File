// components
import { MdAdminPanelSettings } from "../../Components/ReactICON/index";
// constants
const ADDRESS_EXPLORER = process.env.NEXT_PUBLIC_ADDRESS_EXPLORER;
const STAKING_DAPP = process.env.NEXT_PUBLIC_STAKING_DAPP;
const TOKEN_EXPLORER = process.env.NEXT_PUBLIC_TOKEN_EXPLORER;

const Token = ({ token }) => {
  return (
    <div className="col-12">
      <div className="invest invest--big">
        <h2 className="invest__title">Block Explorer</h2>
        <div className="invest__group">
          <input
            type="text"
            id="partnerlink"
            name="partnerlink"
            className="form__input"
            defaultValue={`${ADDRESS_EXPLORER}${STAKING_DAPP}`}
          />
          <p className="invest__text">
            Stake token for a good investment @todo: update here
          </p>

          <table className="invest__table">
            <thead>
              <tr>
                <th>Token</th>
                <th>value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Name</td>
                <td>{token?.name}</td>
              </tr>
              <tr>
                <td>Symbol</td>
                <td>{token?.symbol}</td>
              </tr>
              <tr>
                <td>Total Supply</td>
                <td>
                  {token?.totalSupply} {token?.symbol}
                </td>
              </tr>
              <tr>
                <td>Total Stake</td>
                <td>
                  {token?.contractTokenBalance || "0"} {token?.symbol}
                </td>
              </tr>
              <tr className="yellow">
                <td>Explorer Token</td>
                <td>
                  <a
                    href={`${TOKEN_EXPLORER}${token}`}
                    style={{ marginLeft: "10px" }}
                    target="_blank"
                    className="header__profile"
                  >
                    <i className="ti">
                      <MdAdminPanelSettings />
                    </i>
                    <span>
                      {token?.name} &nbsp;
                      {token?.symbol}
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Token;
