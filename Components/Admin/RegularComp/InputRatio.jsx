import React from "react";

const InputRatio = ({ index, value }) => {
  return (
    <li>
      <input type="radio" id={`type-${index}`} />
      <label htmlFor={`type${index}`}>{value}</label>
    </li>
  );
};

export default InputRatio;
