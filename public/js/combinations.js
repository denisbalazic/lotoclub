const container = document.querySelector(".container");

async function init() {
  const userCombinations = await fetchCombinations();
  //Create div with heading for every user
  for (const userCombination of userCombinations) {
    let hasCombinations = false;
    const combWrapper = createUserCard(userCombination.username);
    //Create combination display for every active combination user has
    for (const comb of userCombination.combinations) {
      if (comb.mainNums.length === 5) {
        hasCombinations = true;
        const combDisplay = createCombinationDisplay(combWrapper);
        //Populate numbers
        const numbers = comb.mainNums.concat(comb.euroNums);
        populateNumbers(numbers, combDisplay);
      }
    }
    //If user has at least one combination
    if (hasCombinations) {
      container.append(combWrapper);
    }
  }
}

//fetch array of combinations associated by user
async function fetchCombinations() {
  try {
    const res = await fetch("http://localhost:3000/api/combinations/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//Create card for one user to display combinations
function createUserCard(name) {
  const combWrapper = document.createElement("div");
  combWrapper.className = "combination";
  const combHeading = document.createElement("div");
  combHeading.className = "combination-heading";
  const username = document.createElement("h3");
  username.className = "name";
  username.innerText = name;
  combHeading.append(username);
  combWrapper.append(combHeading);
  return combWrapper;
}

//Create display for one combination
function createCombinationDisplay(combWrapper) {
  const combDisplay = document.createElement("div");
  combDisplay.className = "combination-display";
  combWrapper.append(combDisplay);
  return combDisplay;
}

//Populate numbers to combination display
function populateNumbers(numbers, combDisplay) {
  for (const num of numbers) {
    const number = document.createElement("div");
    number.className = "number";
    number.innerText = num || "";
    combDisplay.append(number);
  }
}

init();