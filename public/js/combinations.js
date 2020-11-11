const navBtn = document.querySelector("#nav-btn");
const closeNav = document.querySelector("#close-nav");
const navBar = document.querySelector("nav");

navBtn.addEventListener("click", () => {
  navBar.classList.remove("hidden");
});

closeNav.addEventListener("click", () => {
  navBar.classList.add("hidden");
})