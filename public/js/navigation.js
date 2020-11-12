const navBtn = document.querySelector("#nav-btn");
const closeNav = document.querySelector("#close-nav");
const navBar = document.querySelector("nav");
const links = navBar.querySelectorAll("a");



/* 
 * Toggle navigation sidebar
 */
navBtn.addEventListener("click", () => {
  navBar.classList.remove("hidden");
});

closeNav.addEventListener("click", () => {
  navBar.classList.add("hidden");
});

console.log("ASEFSF");
/* 
 * Styles selected option in navbar
 */
navBar.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e);
  for(link of links) {
    link.classList.remove("active");
  }
  e.target.classList.add("active");
});



/* 
 * Tabs control
 * DEPRECATED and left commented for reuse purposes
 */
// tab1Btn.addEventListener("click", () => {
//   tab1.classList.remove("hidden");
//   tab2.classList.add("hidden");
//   tab1Btn.classList.add("selected");
//   tab2Btn.classList.remove("selected");
// });

// tab2Btn.addEventListener("click", () => {
//   tab2.classList.remove("hidden");
//   tab1.classList.add("hidden");
//   tab2Btn.classList.add("selected");
//   tab1Btn.classList.remove("selected");
// });