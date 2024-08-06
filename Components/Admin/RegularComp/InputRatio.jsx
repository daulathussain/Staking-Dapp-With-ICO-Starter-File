import React from "react";

const InputRatio = ({ value, index }) => {
  return (
    <li>
      <input id={`type${index}`} type="radio" name="type" />
      <label htmlFor={`type${index}`}>{value}</label>
    </li>
  );
};

export default InputRatio;
