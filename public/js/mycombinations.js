const tabs = document.querySelector(".tab-names");
const mainCombDisplay = document.querySelectorAll(".combination-numbers .main");
const euroCombDisplay = document.querySelectorAll(".combination-numbers .euro");
const mainNumbers = document.querySelectorAll(".numbers-table .main .number");
const euroNumbers = document.querySelectorAll(".numbers-table .euro .number");
const numbers = document.querySelector(".numbers-table");
const changeBtn = document.querySelector("#change-btn");

let combNo = 1;
let combinations = fetchCombinations();
let combination = combinations[0] || {};
displayCombination();
styleTable();


/* 
 * Fetch combinations from server api
 */
function fetchCombinations() {
  const combs = [
    {
      mainNums: [2, 5, 19, 27, 36],
      euroNums: [1, 9]
    }
  ];
  return combs;
}


/* 
 * Tabs control
 * Switches between different combinations
 */
tabs.addEventListener("click", (e) => {
  combNo = parseInt(e.target.id);
  combination = combinations[combNo - 1];
  console.log(combNo, combination);
  displayCombination();
  styleTable();
  for(tab of tabs.children) {
    tab.classList.remove("selected");
  }
  e.target.classList.add("selected");
})


/* 
 * Populate combination display
 */
function displayCombination() {
  let i = 0;
  for(number of mainCombDisplay) {
    number.innerText = combination.mainNums[i];
    i++;
  }
  i = 0;
  for(number of euroCombDisplay) {
    number.innerText = combination.euroNums[i];
    i++;
  }
}


/* 
 * Style numbers in table according to combination
 */
function styleTable() {  
  for(number of mainNumbers) {
    number.classList.remove("selected");
    for(combNum of combination.mainNums) {
      if(parseInt(number.innerText) === combNum) {
        number.classList.add("selected");
      }
    }
  }
  for(number of euroNumbers) {
    number.classList.remove("selected");
    for(combNum of combination.euroNums) {
      if(parseInt(number.innerText) === combNum) {
        number.classList.add("selected");
      }
    }
  }
}


/* 
 * Triggers adding or deleting of numbers from combination
 */
numbers.addEventListener("click", (e) => {
  const selectedNum = parseInt(e.target.innerText);
  if(e.target.closest(".column.main")) {
    addMain(selectedNum);
  } else if(e.target.closest(".column.euro")) {
    addEuro(selectedNum);
  }
  styleTable();
})


/* 
 * Add or delete number from combination
 */
function addMain(num) {
  addNumber(num, "mainNums");
}

function addEuro(num) {
  addNumber(num, "euroNums");
}

function addNumber(num, select) {
  select === "mainNums" ? length = 5 : length = 2;
  // deletes number if it is present
  if(combination[select].includes(num)) {
    const index = combination[select].indexOf(num);
    console.log("deleted: ", combination[select].splice(index, 1));
  // adds number if there is room
  } else if (combination[select].length < length) {
    combination[select].push(num);
    combination[select].sort((a, b) => a < b ? -1 : 1);
    console.log("added: ", num);
  } else {
    console.log("cant add or delete number");
    return false;
  }
}


/* 
 * Changes combination or adds new if first time 
 * according to selected numbers
 * and posts changes to server
 */
changeBtn.addEventListener("click", () => {
  combinations[combNo] = combination;
  displayCombination();
})















/* 
 * Combination object constructor
 */
// function Combination(mainNums, euroNums, type) {
//   this.mainNums = mainNums;
//   this.euroNums = euroNums;
//   this.type = type;
//   this.isMain = function(num) {
//     return this.mainNums.includes(num);
//   };
//   this.isEuro = function(num) {
//     return this.euroNums.includes(num);
//   };
//   this.addMain = function(num) {
//     this.addNumber(num, "mainNums");
//   };
//   this.addEuro = function(num) {
//     this.addNumber(num, "euroNums");
//   };
//   this.addNumber = function(num, select) {
//     select === "mainNums" ? length = 5 : length = 2;
//     // deletes number if it is present
//     if(this[select].includes(num)) {
//       const index = combination[select].indexOf(num);
//       console.log("deleted: ", combination[select].splice(index, 1));
//     // adds number if there is room
//     } else if (this[select].length < length) {
//       this[select].push(num);
//       this[select].sort((a, b) => a < b ? -1 : 1);
//       console.log("added: ", num);
//     } else {
//       console.log("cant add or delete number");
//       return false;
//     }
//     console.log(this[select]);
//   }
// }