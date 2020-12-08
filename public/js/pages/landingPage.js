import { header } from "../components/header.js";

const landingPage = {
  render: () => {
    return `
      ${header.render()}
      <main>
        <i class="fas fa-dice-d20"></i>
        <div class="hero">
          <h1>Eurojackpot grupa</h1>
          <p>
            Zajednica vječitih optimista koji su odlučili udružiti svoju sreću i
            statistički uvećati šanse za zgoditkom. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </div>
        <i class="fas fa-hand-holding-usd"></i>
        <i class="fas fa-handshake"></i>
      </main>
    `;
  },
  init: () => {},
};

export { landingPage };
