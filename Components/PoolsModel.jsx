import { useState } from "react";
// icons
import { IoMdClose } from "./ReactICON";
// components
import PopUpInputField from "./Admin/RegularComp/PopUpInputField";
import PupUpButton from "./Admin/RegularComp/PupUpButton";
import InputRatio from "./Admin/RegularComp/InputRatio";

const PoolsModel = ({
  deposit,
  poolID,
  address,
  selectedPool,
  selectedToken,
  setLoader,
}) => {
  // internal state
  const [amount, setAmount] = useState(0);

  const CALLING_FUNCTION = async (poolID, amount, address) => {
    try {
      setLoader(true);
      const receipt = await deposit(poolID, amount, address);
      // console.log({ receipt });
      if (receipt) {
        setLoader(false);
        window.location.reload();
      }
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal modal--auto fade"
      id="modal-node"
      aria-labelledby="modal-node"
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
            <h4 className="modal__title">Invest</h4>
            <p className="modal__text">
              Welcome to BisoCrypto, stake your tokens & earn.
            </p>

            <div className="modal__form">
              <PopUpInputField
                title={`Stake ${selectedPool?.depositToken?.name} token`}
                placeholder={"amount"}
                handleChange={(e) => setAmount(e.target.value)}
              />

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Pool Details:
                </label>
                <ul className="form__ratio">
                  <InputRatio
                    index={1}
                    value={`Your deposit: ${selectedPool?.amount} ${selectedPool?.depositToken?.symbol}`}
                  />
                  <InputRatio
                    index={2}
                    value={`Your deposited amount: ${selectedPool?.depositedAmount} ${selectedPool?.depositToken?.symbol}`}
                  />
                  <InputRatio
                    index={3}
                    value={`Balance: ${selectedPool?.depositToken?.balance?.slice(
                      0,
                      8
                    )} ${selectedPool?.depositToken?.symbol}`}
                  />
                </ul>
              </div>

              <PupUpButton
                title={"Proceed"}
                handleClick={() => CALLING_FUNCTION(poolID, amount, address)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolsModel;
