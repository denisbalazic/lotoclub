import { header } from "../components/header.js";
import { navbar } from "../components/navbar.js";
import { table } from "../components/table.js";

const tablePage = {
  isProtected: true,
  render: () => {
    return `
      ${header.render(true)}
      ${navbar.render()}
      ${table.render()}
    `;
  },

  init: () => {
    navbar.init();
  },
};

export { tablePage };
