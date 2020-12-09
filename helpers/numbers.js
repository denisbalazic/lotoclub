const Number = require("../models/number");
const numbers = {};

/**
 * State after 4th of Dec 2020 draw
 */

mainFrequencies = [
  39,
  28,
  34,
  30,
  29,
  26,
  35,
  29,
  30,
  23,
  30,
  34,
  30,
  34,
  35,
  38,
  29,
  33,
  39,
  40,
  33,
  31,
  33,
  38,
  32,
  29,
  28,
  28,
  30,
  36,
  33,
  29,
  31,
  34,
  41,
  26,
  24,
  34,
  34,
  36,
  32,
  31,
  29,
  33,
  34,
  39,
  34,
  23,
  41,
  29,
];

mainLastDraws = [
  0,
  1,
  18,
  17,
  3,
  21,
  10,
  14,
  10,
  55,
  5,
  4,
  20,
  11,
  9,
  23,
  3,
  2,
  5,
  2,
  3,
  1,
  6,
  5,
  1,
  4,
  0,
  13,
  8,
  1,
  27,
  19,
  5,
  2,
  7,
  22,
  0,
  3,
  5,
  0,
  0,
  11,
  12,
  7,
  6,
  10,
  4,
  16,
  2,
  2,
];

euroFrequencies = [60, 58, 68, 65, 68, 62, 63, 66, 73, 61];
euroLastDraws = [3, 4, 4, 3, 1, 17, 0, 2, 6, 0];

numbers.populate = async function () {
  for (let i = 0; i < 50; i++) {
    const newNumber = await new Number();
    newNumber.numType = "main";
    newNumber.num = i + 1;
    newNumber.frequency = mainFrequencies[i];
    newNumber.lastDraw = mainLastDraws[i];
    await newNumber.save();
  }
  for (let i = 0; i < 10; i++) {
    const newNumber = await new Number();
    newNumber.numType = "euro";
    newNumber.num = i + 1;
    newNumber.frequency = euroFrequencies[i];
    newNumber.lastDraw = euroLastDraws[i];
    await newNumber.save();
  }
};

module.exports = numbers;
