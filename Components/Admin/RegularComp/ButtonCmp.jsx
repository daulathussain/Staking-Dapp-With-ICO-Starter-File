import React from "react";

const ButtonCmp = ({ tab, name, styleClass }) => {
  return (
    <li className="nav-item" role="presentation">
      <button
        className={` ${styleClass}`}
        data-bs-toggle="tab"
        data-bs-target={`#tab-${tab}`}
        type="button"
        role="tab"
        aria-controls={`tab-${tab}`}
        aria-selected="true"
      >
        {name}
      </button>
    </li>
  );
};

export default ButtonCmp;
