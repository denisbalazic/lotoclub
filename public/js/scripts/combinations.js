import { auth } from "./auth.js";

const combinations = {};

combinations.init = () => {
  const container = document.querySelector(".container");

  async function init() {
    const response = await fetchCombinations();
    if (!response.success && response.error) {
      handleError(response.error);
    }
    const userCombinations = response.result;
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
      const res = await fetch("/api/combinations/", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.dir(err);
    }
  }

  function handleError(err) {
    if (err.code === 9) {
      location.hash = "#login";
    } else {
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
};

export { combinations };
