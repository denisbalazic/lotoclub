import { navigation } from "../scripts/navigation.js";

const navbar = {
  render: () => {
    return `
      <nav class="hidden">
        <i id="close-nav" class="fas fa-times"></i>
        <ul>
          <li><a href="#mycombinations">MyCombinations</a></li>
          <li><a href="#combinations">Combinations</a></li>
          <li><a href="#table">Table</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">History</a></li>
          <li><a href="#">Blog</a></li>
          <li><a id="logout-btn" href="#">Logout</a></li>
        </ul>
      </nav>
    `;
  },

  init: () => {
    navigation.init();
  },
};

export { navbar };
