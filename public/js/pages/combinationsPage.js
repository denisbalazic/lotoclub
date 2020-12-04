import { header } from "../components/header.js";
import { navbar } from "../components/navbar.js";
import { combinations } from "../scripts/combinations.js";

const combinationsPage = {
  render: () => {
    return `
      ${header.render(true)}
      ${navbar.render()}
      <main>
        <div class="container"></div>
      </main>
    `;
  },

  init: () => {
    navbar.init();
    combinations.init();
  },
};

export { combinationsPage };
