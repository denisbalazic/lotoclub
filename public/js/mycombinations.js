const tabs = document.querySelector(".tab-names");
const mainCombDisplay = document.querySelectorAll(".combination-numbers .main");
const euroCombDisplay = document.querySelectorAll(".combination-numbers .euro");
const numbers = document.querySelector(".numbers-table");


let combination = {
  mainNums: [],
  euroNums: [],
  isMain: function(num) {
    return this.mainNums.includes(num);
  },
  isEuro: function(num) {
    return this.euroNums.includes(num);
  },
  addMain: function(num) {
    this.addNumber(num, "mainNums");
  },
  addEuro: function(num) {
    this.addNumber(num, "euroNums");
  },
  addNumber: function(num, select) {
    select === "mainNums" ? length = 5 : length = 2;
    // deletes number if it is present
    if(this[select].includes(num)) {
      const index = combination[select].indexOf(num);
      console.log("deleted: ", combination[select].splice(index, 1));
    // adds number if there is room
    } else if (this[select].length < length) {
      this[select].push(num);
      this[select].sort((a, b) => a < b ? -1 : 1);
      console.log("added: ", num);
    } else {
      console.log("cant add or delete number");
      return false;
    }
    console.log(this[select]);
  }
}

/* 
 * Tabs control
 * Switches between different combinations
 */
tabs.addEventListener("click", (e) => {
  chooseMycombination(e.target.innerText);
  displayCombination();
  styleTable();
  for(tab of tabs.children) {
    tab.classList.remove("selected");
  }
  e.target.classList.add("selected");
})


/*
 * Chooses combination to be displayed, 
 * retrieves data from api
 */
function chooseMycombination(combName) {
  if(combName === "Dodatna") {
    combination.mainNums = [1, 4, 23, 33, 41]; // return dummy data
    combination.euroNums = [2, 6]; // return dummy data
  } else {
    combination.mainNums = [6, 8, 17, 24, 45]; // return dummy data
    combination.euroNums = [3, 8]; // return dummy data
  }
}

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

numbers.addEventListener("click", (e) => {
  const selectedNum = parseInt(e.target.innerText);
  if(e.target.closest(".column.main")) {
    combination.addMain(selectedNum);
  } else if(e.target.closest(".column.euro")) {
    combination.addEuro(selectedNum);
  }
  styleTable();
})