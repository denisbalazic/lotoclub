const container = document.querySelector(".container");

async function fetchCombinations() {
  try {
    const res = await fetch("http://localhost:3000/api/combinations/");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function init() {
  const userCombinations = await fetchCombinations();
  //Create div with heading for every user
  for (const userCombination of userCombinations) {
    let hasCombinations = false;
    const combWrapper = document.createElement("div");
    combWrapper.className = "combination";
    const combHeading = document.createElement("div");
    combHeading.className = "combination-heading";
    const username = document.createElement("h3");
    username.className = "name";
    username.innerText = userCombination.username;
    combHeading.append(username);
    combWrapper.append(combHeading);
    //Create combination display for every active combination user has
    for (const comb of userCombination.combinations) {
      if (comb.mainNums.length === 5) {
        hasCombinations = true;
        const combNumbers = document.createElement("div");
        combNumbers.className = "combination-display";
        combWrapper.append(combNumbers);
        //Populate numbers
        const numbers = comb.mainNums.concat(comb.euroNums);
        for (let i = 0; i < 7; i++) {
          const number = document.createElement("div");
          number.className = "number";
          number.innerText = numbers[i] || "";
          combNumbers.append(number);
        }
      }
    }
    if (hasCombinations) {
      container.append(combWrapper);
    }
  }
}

init();
