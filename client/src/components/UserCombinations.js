import React from "react";
import Combination from "./Combination";

const UserCombinations = ({ username, combinations }) => {
  return (
    <div className="combination">
      <h3 className="combination-heading">{username}</h3>
      {combinations.map((comb, index) => (
        <Combination key={index} combination={comb} />
      ))}
    </div>
  );
};

export default UserCombinations;
