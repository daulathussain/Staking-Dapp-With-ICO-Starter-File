import React from "react";

const AdminCard = ({ name, value }) => {
  return (
    <div className="col-12 col-md-4">
      <div className="stats">
        <span className="stats__value">{value}</span>
        <p className="stats__name">{name}</p>
      </div>
    </div>
  );
};

export default AdminCard;
