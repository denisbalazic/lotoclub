import { header } from "../components/header.js";
import { navbar } from "../components/navbar.js";
import { table } from "../components/table.js";
import { admin } from "../scripts/admin.js";

const adminPage = {
  isProtected: true,
  render: () => {
    return `
      ${header.render(true)}
      ${navbar.render()}
      <main>
        <div class="container">
          <div class="tab">
            <div class="combination-display">
              <div class="number main"></div>
              <div class="number main"></div>
              <div class="number main"></div>
              <div class="number main"></div>
              <div class="number main"></div>
              <div class="number euro"></div>
              <div class="number euro"></div>
            </div>
            <p id="info"></p>
            ${table.render()}
            <div id="active-combinations">
              <input type="checkbox" id="comb-1" name="" value="comb-1">
              <label for="comb-1"> Glavna</label><br>
              <input type="checkbox" id="comb-2" name="" value="comb-2">
              <label for="comb-2"> Dodatna</label><br>
              <input type="checkbox" id="comb-3" name="" value="comb-3">
              <label for="comb-3"> Dodatna 2</label><br><br>
            </div>
            <button id="save-btn">Spremi</button>
          </div>
          </div>
      </main>
    `;
  },

  init: () => {
    navbar.init();
    admin.init();
  },
};

export { adminPage };
