// Pages
import { landingPage } from "./pages/landingPage.js";
import { registerPage } from "./pages/registerPage.js";
import { loginPage } from "./pages/loginPage.js";
import { combinationsPage } from "./pages/combinationsPage.js";
import { mycombinationsPage } from "./pages/mycombinationsPage.js";
import { tablePage } from "./pages/tablePage.js";
import { errorPage } from "./pages/errorPage.js";
import { login } from "./scripts/login.js";

let token = login.token;
let whatev = login.whatev;

// Routes
const routes = [
  { path: "/", page: landingPage },
  { path: "register", page: registerPage },
  { path: "login", page: loginPage },
  { path: "combinations", page: combinationsPage },
  { path: "mycombinations", page: mycombinationsPage },
  { path: "table", page: tablePage },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";

const findComponentByPath = (path, routes) => {
  const route = routes.find((r) => r.path === path) || undefined;
  return route;
};

const router = () => {
  console.log(login.token);
  console.log(whatev);
  // Find the page based on the current path
  const path = parseLocation();
  // If there's no matching route, get the "Error" page
  const { page = errorPage } = findComponentByPath(path, routes) || {};
  // Render the page in the "app" placeholder
  document.getElementById("app").innerHTML = page.render();
  if (page.init) {
    page.init();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
