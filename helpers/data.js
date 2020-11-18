const combinationObj = {
  combinations: [
    {
      mainNums: [2, 5, 19, 27, 36],
      euroNums: [1, 9],
      id: "comb-1",
      name: "Glavna",
    },
    {
      mainNums: [5, 6, 21, 30, 39],
      euroNums: [4, 9],
      id: "comb-2",
      name: "Dodatna",
    },
    {
      mainNums: [5, 11, 23, 36, 42],
      euroNums: [1, 8],
      id: "comb-3",
      name: "Posebna",
    },
  ],
  getCombinations: function () {
    return this.combinations;
  },
  getCombination: function (index) {
    return this.combinations[index];
  },
  setCombination: function (comb) {
    const index = parseInt(comb.id.slice(-1)) - 1;
    return (this.combinations[index] = comb);
  },
};

module.exports = combinationObj;
