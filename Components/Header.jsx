import { useState } from "react";
// icons
import { MdGeneratingTokens } from "../Components/ReactICON/index";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = ({ page }) => {
  const [tokenBalComp, setTokenBalComp] = useState();

  const navigation = [
    { name: "Home", link: "#home" },
    { name: "Staking", link: "#staking" },
    { name: "crypto", link: "#crypto" },
    { name: "Partners", link: "#partners" },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header__content">
              <button
                className="header__btn"
                type="button"
                aria-label="header__ nav"
              >
                <span />
                <span />
                <span />
              </button>
              {/* @todo: update to link */}
              <a href="/" className="header__logo">
                <img src="img/logo.svg" alt="app logo" />
              </a>

              <span className="header__tagline">Crypto King</span>

              <ul className="header__nav" id="header--nav">
                {navigation.map((item, index) => (
                  <li key={index}>
                    {/* update below to shorthand */}
                    <a
                      href={
                        page === "activity"
                          ? "/"
                          : page === "admin"
                          ? "/"
                          : `${item.link}`
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

              <ConnectButton />

              <a
                href=""
                style={{
                  marginLeft: "10px",
                }}
                data-bs-target="#modal-deposit1"
                type="button"
                data-bs-toggle="modal"
                className="header__profile"
              >
                <i className="ti ti-user-circle">
                  <MdGeneratingTokens />
                </i>
                <span>Token ICO </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
