import { useState, useEffect } from "react";
// external libs
import { useAccount } from "wagmi";
// icons
import { IoMdClose } from "./ReactICON/index";
// context
import { LOAD_TOKEN_ICO } from "../Context/constants";
import { BUY_TOKEN } from "../Context/index";
// constants
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const ICOSale = ({ setLoader }) => {
  const { address } = useAccount();
  // internal state
  const [tokenDetails, setTokenDetails] = useState();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const loadToken = async () => {
      const token = await LOAD_TOKEN_ICO();
      setTokenDetails(token);
    };
    loadToken();
  }, [address]);

  const CALLING_FUNCTION_BUY_TOKEN = async (quantity) => {
    try {
      setLoader(true);
      const receipt = await BUY_TOKEN(quantity);

      if (receipt) {
        setLoader(false);
        window.location.reload();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  return (
    <div
      className="modal modal--auto fade"
      id="modal-deposit1"
      aria-labelledby="modal-deposit1"
      aria-hidden="true"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal__content">
            <button
              className="modal__close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x">
                <IoMdClose />
              </i>
            </button>
            <h4 className="modal__title">
              {tokenDetails?.token?.symbol} ICO Token
            </h4>
            <p className="modal__text">
              Participate in the <span>Ongoing ICO Token</span> sale
            </p>

            <div className="modal__form">
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  ICO Supply:{" "}
                  {`${tokenDetails?.tokenBal} ${tokenDetails?.token?.symbol}`}
                </label>
                <input
                  type="text"
                  className="form__input"
                  placeholder={`${
                    tokenDetails?.token?.symbol
                  }  ${tokenDetails?.token?.balance?.toString().slice(0, 12)}`}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Pay Amount
                </label>
                <input
                  type="text"
                  className="form__input"
                  placeholder={`${
                    Number(tokenDetails?.tokenPrice) * quantity
                  } ${CURRENCY}`}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled
                />
              </div>

              <button
                className="form__btn"
                type="button"
                onClick={() => CALLING_FUNCTION_BUY_TOKEN(quantity)}
              >
                Buy {tokenDetails?.token?.symbol}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOSale;
