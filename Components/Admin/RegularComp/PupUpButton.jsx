import React from "react";

const PupUpButton = ({ handleClick, title }) => {
  return (
    <button onClick={handleClick} className="form__btn" type="button">
      {title}
    </button>
  );
};

export default PupUpButton;
