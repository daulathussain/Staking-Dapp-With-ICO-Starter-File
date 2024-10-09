import React from "react";

const PupUpButton = ({ title, handleClick }) => {
  return (
    <button type="button" className="form__btn" onClick={handleClick}>
      {title}
    </button>
  );
};

export default PupUpButton;
