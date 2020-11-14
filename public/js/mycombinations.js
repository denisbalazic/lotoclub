const tabs = document.querySelector(".tab-names");
const combDisplay = document.querySelector(".combination-numbers");
const mainCombDisplay = document.querySelectorAll(".combination-numbers .main");
const euroCombDisplay = document.querySelectorAll(".combination-numbers .euro");
const mainNumbers = document.querySelectorAll(".numbers-table .main .number");
const euroNumbers = document.querySelectorAll(".numbers-table .euro .number");
const numbers = document.querySelector(".numbers-table");
const changeBtn = document.querySelector("#change-btn");
const info = document.querySelector("#info");

let combIndex = 0;
let combinations = fetchCombinations();
let combination = combinations[0];
createTabs();
displayCombination();
styleTable();


/* 
 * Fetch combinations from server api
 */
function fetchCombinations() {
  const combs = [
    {
      mainNums: [2, 5, 19, 27, 36],
      euroNums: [1, 9],
      id: "comb-1",
      name: "Glavna"
    },
    {
      mainNums: [5, 6, 21, 30, 39],
      euroNums: [4, 9],
      id: "comb-2",
      name: "Dodatna"
    },
    {
      mainNums: [5, 11, 23, 36, 42],
      euroNums: [1, 8],
      id: "comb-3",
      name: "Posebna"
    }
  ];
  return combs;
}


/* 
 * Create tabs for combination control
 * according to fetched combinations data
 */
function createTabs() {
  let i = 1;
  for(comb of combinations) {
    const tab = document.createElement("button");
    tab.classList.add("tab-selector");
    i === 1 && tab.classList.add("selected");
    tab.id = "comb-" + i.toString();
    tab.innerText = comb.name;
    tabs.append(tab);
    i++;
  }

}


/* 
 * Tabs control
 * Switches between different combinations
 */
tabs.addEventListener("click", (e) => {
  combIndex = parseInt(e.target.id.slice(-1)) - 1;
  combination = combinations[combIndex];
  console.log(combIndex, combination);
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
    number.innerText = combination.mainNums[i] || "";
    i++;
  }
  i = 0;
  for(number of euroCombDisplay) {
    number.innerText = combination.euroNums[i] || "";
    i++;
  }
  combDisplay.classList.remove("editing");
  info.innerText = "";
  if(combination.isEdited) {
    combDisplay.classList.add("editing");
    if(combination.mainNums.length === 5 && combination.euroNums.length === 2) {
      info.innerText = "Trebate spremiti novu kombinaciju"
    }
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
    addNumber(selectedNum, "mainNums");
  } else if(e.target.closest(".column.euro")) {
    addNumber(selectedNum, "euroNums");
  }
  displayCombination();
  styleTable();
})


/* 
 * Add or delete number from combination
 */
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
  combination.isEdited = true;
}


/* 
 * Changes combination or adds new if first time 
 * according to selected numbers
 * and posts changes to server
 */
changeBtn.addEventListener("click", () => {
  combinations[combIndex] = combination;
  combDisplay.classList.remove("editing");
  combination.isEdited = false;
  displayCombination();
  styleTable();
  //post combination to server
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