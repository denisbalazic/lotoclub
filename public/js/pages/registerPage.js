import { header } from "../components/header.js";
import { registration } from "../scripts/registration.js";

const registerPage = {
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
            <small>Error message</small>
          </div>
          <div class="form-control">
            <label for="email">Email</label>
            <input id="email" type="text" name="email" placeholder="Enter email" />
            <small>Error message</small>
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
          <div class="form-control">
            <label for="password2">Confirm password</label>
            <input
              id="password2"
              type="password"
              name="password2"
              placeholder="Repeat password"
            />
            <small>Error message</small>
          </div>
          <div class="form-control">
            <label for="passcode">Passcode</label>
            <input
              id="passcode"
              type="text"
              name="passcode"
              placeholder="Enter passcode"
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
    registration.init();
  },
};

export { registerPage };
