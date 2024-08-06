import React from "react";

const List = ({ name, value }) => {
  return (
    <li>
      {name}: <b>{value}</b>
    </li>
  );
};

export default List;
