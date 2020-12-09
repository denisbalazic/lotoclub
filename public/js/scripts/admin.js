import { auth } from "./auth.js";

const admin = {};

admin.init = () => {
  const tabSelectors = document.querySelector(".tab-selectors");
  const combDisplay = document.querySelector(".combination-display");
  const mainCombDisplay = document.querySelectorAll(".combination-display .main");
  const euroCombDisplay = document.querySelectorAll(".combination-display .euro");
  const mainNumbers = document.querySelectorAll("#numbers-table .main .number");
  const euroNumbers = document.querySelectorAll("#numbers-table .euro .number");
  const numbers = document.querySelector("#numbers-table");
  const saveBtn = document.querySelector("#save-btn");
  const info = document.querySelector("#info");
  const activeCombCheckboxes = document.querySelectorAll("#active-combinations input");

  let activeCombs = [];
  let combination = {
    mainNums: [],
    euroNums: [],
  };

  init();

  async function init() {}

  /*
   * Populate combination display
   */
  function displayCombination() {
    let i = 0;
    for (const number of mainCombDisplay) {
      number.innerText = combination.mainNums[i] || "";
      i++;
    }
    i = 0;
    for (const number of euroCombDisplay) {
      number.innerText = combination.euroNums[i] || "";
      i++;
    }
    info.innerText = "";
    if (combination.mainNums.length === 5 && combination.euroNums.length === 2) {
      info.innerText = "Trebate spremiti novu kombinaciju";
    }
  }

  /*
   * Style numbers in table according to combination
   */
  function styleTable() {
    styleNums(mainNumbers, combination.mainNums, 5);
    styleNums(euroNumbers, combination.euroNums, 2);

    function styleNums(tabNums, nums, n) {
      for (let number of tabNums) {
        number.classList.remove("selected");
        for (let num of nums) {
          if (parseInt(number.innerText) === num) {
            number.classList.add("selected");
            if (nums.length === n) {
              number.classList.add("success");
            } else {
              number.classList.remove("success");
            }
          }
        }
      }
    }
  }

  /*
   * Triggers adding or deleting numbers from combination
   */
  numbers.addEventListener("click", (e) => {
    const selectedNum = parseInt(e.target.innerText);
    if (e.target.closest(".column.main")) {
      addNumber(selectedNum, "mainNums");
    } else if (e.target.closest(".column.euro")) {
      addNumber(selectedNum, "euroNums");
    }
    displayCombination();
    styleTable();
  });

  /*
   * Add or delete number from combination
   */
  function addNumber(num, select) {
    select === "mainNums" ? (length = 5) : (length = 2);
    // deletes number if it is present
    if (combination[select].includes(num)) {
      const index = combination[select].indexOf(num);
      console.log("deleted: ", combination[select].splice(index, 1));
      // adds number if there is room
    } else if (combination[select].length < length) {
      combination[select].push(num);
      combination[select].sort((a, b) => (a < b ? -1 : 1));
    } else {
      console.log("cant add or delete number");
      return false;
    }
  }

  /**
   * Saving active combinations for next draw from checkboxes
   */
  function getActiveCombs() {
    for (const checkbox of activeCombCheckboxes) {
      checkbox.checked && activeCombs.push(checkbox.value);
    }
  }

  /*
   * Changes combination or adds new if first time
   * according to selected numbers
   * and posts changes to server
   */
  saveBtn.addEventListener("click", async () => {
    if (combination.mainNums.length === 5 && combination.euroNums.length === 2) {
      getActiveCombs();
      const data = await postSettings();
      if (data.success) {
        activeCombs = [];
        displayCombination();
        styleTable();
        showMessage("Kombinacija uspješno spremljena", "success");
      } else {
        showMessage("Nešto je pošlo krivo :(", "warning");
      }
    } else {
      showMessage("Kombinacije nisu potpune", "warning");
    }
  });

  /*
   * Post combination to server
   */
  async function postSettings() {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ combination, activeCombs }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  /*
   * Display message
   */
  function showMessage(message, type) {
    info.innerText = message;
    if (type === "warning") {
      info.classList.remove("success");
    } else if (type === "success") {
      info.classList.add("success");
      setTimeout(() => {
        info.innerText = "";
        info.classList.remove("success");
      }, 3000);
      combDisplay.classList.add("successful");
      setTimeout(() => combDisplay.classList.remove("successful"), 3000);
    }
  }
};

export { admin };
