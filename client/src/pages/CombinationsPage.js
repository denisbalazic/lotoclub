import React, { useState, useEffect } from "react";
import UserCombinations from "../components/UserCombinations";
import { apiService } from "../service/api";

const CombinationsPage = () => {
  const [userCombinations, setUserCombinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getUserCombinations();
      setUserCombinations(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="container">
        {userCombinations.length > 0 &&
          userCombinations.map((u, index) => (
            <UserCombinations key={index} username={u.username} combinations={u.combinations} />
          ))}
      </div>
    </main>
  );
};

export default CombinationsPage;
