const tab1Btn = document.querySelector("#tab1-btn");
const tab2Btn = document.querySelector("#tab2-btn");
const mainCombDisplay = document.querySelectorAll(".combination-numbers .main");
const euroCombDisplay = document.querySelectorAll(".combination-numbers .euro");
const mainNumbers = document.querySelectorAll(".numbers-table .main .number");
const euroNumbers = document.querySelectorAll(".numbers-table .euro .number");
const numbers = document.querySelector(".numbers-table");


let combination = {
  mainNums: [],
  euroNums: []
}

/* 
 * Tabs control
 */
tab1Btn.addEventListener("click", (e) => {
  populateMycombination(e.target.innerText);
  tab1Btn.classList.add("selected");
  tab2Btn.classList.remove("selected");
});

tab2Btn.addEventListener("click", (e) => {
  populateMycombination(e.target.innerText);
  tab2Btn.classList.add("selected");
  tab1Btn.classList.remove("selected");
});


/*
 * Populates mycombination combination display, 
 * and styles table accordingly, 
 * with data retrieved from api
 */
function populateMycombination(combName) {
  if(combName === "Dodatna") {
    combination.mainNums = [1, 4, 23, 33, 41]; // return dummy data
    combination.euroNums = [2, 6]; // return dummy data
  } else {
    combination.mainNums = [6, 8, 17, 24, 45]; // return dummy data
    combination.euroNums = [3, 8]; // return dummy data
  }
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
  console.log(combination.mainNums);
}

numbers.addEventListener("click", (e) => {
  const selectedNum = e.target.innerText;
  console.log(selectedNum);
  const index = combination.mainNums.indexOf(selectedNum); ////////////// BUGGGGGGGGGGGGGGG
  console.log(index);
  console.log(combination.mainNums.splice(index, 1));
  console.log(combination.mainNums);
})