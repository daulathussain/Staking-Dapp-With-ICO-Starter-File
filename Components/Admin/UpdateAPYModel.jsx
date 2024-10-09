import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const UpdateAPYModel = ({ setLoader, modifyPool, modifyPoolID }) => {
  const [amount, setAmount] = useState(0);

  const CALLING_FUNCTION_MODIFY_POOL = async (modifyPoolID, amount) => {
    try {
      setLoader(true);
      const receipt = await modifyPool(modifyPoolID, amount);

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
      id="modal-apool"
      aria-labelledby="modal-apool"
      aria-hidden="true"
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
              update staking pool #00-{modifyPoolID} APY %
            </p>

            <div className="modal__form">
              <label htmlFor="amount2" className="form__label">
                Enter amount
              </label>
              <input
                type="text"
                id="amount2"
                name="amount2"
                className="apool__input"
                style={{ backgroundColor: "transparent" }}
                placeholder="Amount in %"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="form__btn"
                type="button"
                onClick={() =>
                  CALLING_FUNCTION_MODIFY_POOL(modifyPoolID, amount)
                }
              >
                Update APY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAPYModel;
