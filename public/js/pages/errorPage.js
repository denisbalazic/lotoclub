import { header } from "../components/header.js";
import { navbar } from "../components/navbar.js";
import { mycombinations } from "../scripts/mycombinations.js";

const errorPage = {
  render: () => {
    return `
      ${header.render(true)}
      ${navbar.render()}
      <main>
        <div class="container">
          <h1>Page not found</h1>
        </div>
      </main>
    `;
  },

  init: () => {
    navbar.init();
  },
};

export { errorPage };
