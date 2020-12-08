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
          <div class="tab-selectors"></div>
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
