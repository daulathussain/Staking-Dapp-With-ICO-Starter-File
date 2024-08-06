import React from "react";

const PopUpInputField = ({ title, placeholder, handleChange }) => {
  return (
    <div className="form__group">
      <label className="form__label">{title}</label>
      <input
        type="text"
        className="form__input"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default PopUpInputField;
