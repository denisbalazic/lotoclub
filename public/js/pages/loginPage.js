import { header } from "../components/header.js";
import { login } from "../scripts/login.js";

const loginPage = {
  render: () => {
    return `
      ${header.render()}
      <main>
        <i class="fas fa-dice-d20"></i>
        <form id="form" action="">
          <div class="form-control">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <small>Error message</small>
          </div>
          <button id="submit-btn">Submit</button>
        </form>
        <i class="fas fa-hand-holding-usd"></i>
        <i class="fas fa-handshake"></i>
      </main>
    `;
  },

  init: () => {
    login.init();
  },
};

export { loginPage };
