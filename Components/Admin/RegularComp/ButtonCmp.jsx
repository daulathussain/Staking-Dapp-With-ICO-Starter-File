import { useState, useEffect } from "react";

const ButtonCmp = ({ name, tab, styleClass, selectedAria }) => {
  const [isSelected, setIsSelected] = useState(selectedAria || false);
  const [tabIndexValue, setTabIndexValue] = useState(-1);

  useEffect(() => {
    setTabIndexValue(tab);
  }, []);

  useEffect(() => {
    setIsSelected(true);
  }, [selectedAria]);

  return (
    <li className="nav-item" role="presentation">
      <button
        className={`${styleClass}`}
        data-bs-toggle="tab"
        data-bs-target={`#tab-${tab}`}
        type="button"
        role="tab"
        aria-controls={`tab-${tab}`}
        aria-selected={isSelected}
        tabIndex={tabIndexValue}
      >
        {name}
      </button>
    </li>
  );
};

export default ButtonCmp;
