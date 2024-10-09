import { useState } from "react";
// icons
import { IoMdClose } from "./ReactICON";
// components
import PopUpInputField from "./Admin/RegularComp/PopUpInputField";
import PupUpButton from "./Admin/RegularComp/PupUpButton";

const WithdrawModal = ({
  withdrawPoolID,
  withdrawn,
  address,
  setLoader,
  claimReward,
}) => {
  // internal state
  const [amount, setAmount] = useState(0);

  const CALLING_FUNCTION = async (withdrawPoolID, amount, address) => {
    try {
      setLoader(true);
      const receipt = await withdrawn(withdrawPoolID, amount, address);
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

  const CALLING_CLAIM = async (withdrawPoolID) => {
    try {
      setLoader(true);
      const receipt = await claimReward(withdrawPoolID);
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
            <h4 className="modal__title">Withdraw Token</h4>
            <p className="modal__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              praesentium magnam dolore magni. Quod labore rem animi nemo
              itaque, temporibus
            </p>

            <div className="modal__form">
              <PopUpInputField
                title="Amount"
                placeholder={"Amount"}
                handleChange={(e) => setAmount(e.target.value)}
              />

              <PupUpButton
                title={"Withdraw"}
                handleClick={() =>
                  CALLING_FUNCTION(withdrawPoolID, amount, address)
                }
              />

              <PupUpButton
                title={"Claim Reward"}
                handleClick={() => CALLING_CLAIM(withdrawPoolID)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
