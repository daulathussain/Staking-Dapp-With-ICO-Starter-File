import React from "react";

const InputField = ({ size, type, title, name, placeholder, handleChange }) => {
  return (
    <div className={`col-12 col-xl-${size}`}>
      <div className="form__group">
        <label htmlFor={name} className="form__label">
          {title}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className="form__input"
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
