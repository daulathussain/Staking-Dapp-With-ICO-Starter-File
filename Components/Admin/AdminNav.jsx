import React from "react";
// components
import ButtonCmp from "./RegularComp/ButtonCmp";

const AdminNav = () => {
  return (
    <div className="col-12 col-lg-3">
      <div className="section__tabs-profile">
        <ul
          className="nav nav-tabs section__tabs section__tabs--big section__tabs--profile"
          id="section__tabs"
          role="tablist"
        >
          <ButtonCmp
            name="Dashboard"
            tab={1}
            styleClass={"active"}
            selectedAria="true"
          />
          <ButtonCmp name="Investing" tab={2} />
          <ButtonCmp name="Staking" tab={3} />
          <ButtonCmp name="Transfer" tab={4} />
          <ButtonCmp name="Pool" tab={5} />
          <ButtonCmp name="ICO Token" tab={6} />
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
