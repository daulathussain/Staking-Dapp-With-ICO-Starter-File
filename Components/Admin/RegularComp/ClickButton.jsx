import React from "react";

const ClickButton = ({ name, handleClick }) => {
  return (
    <div className="col-12">
      <button
        className="form__btn form__btn--small"
        type="button"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default ClickButton;
