import React from "react";

const Number = ({ number }) => {
  return <div className="number">{number || ""}</div>;
};

export default Number;
