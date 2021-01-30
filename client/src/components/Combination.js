import React from "react";
import Number from "./Number";

const Combination = ({ combination }) => {
  return (
    <div className="combination-display">
      {combination.mainNums.map((n, index) => (
        <Number key={index} number={n} />
      ))}
      {combination.euroNums.map((n, index) => (
        <Number key={index} number={n} />
      ))}
    </div>
  );
};

export default Combination;
