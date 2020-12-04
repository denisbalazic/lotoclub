const navigation = {};

navigation.init = () => {
  const navBtn = document.querySelector("#nav-btn");
  const closeNav = document.querySelector("#close-nav");
  const navBar = document.querySelector("nav");
  const links = navBar.querySelectorAll("a");

  /*
   * Toggle navigation sidebar
   */
  navBtn.addEventListener("click", () => {
    navBar.classList.remove("hidden");
    for (const link of links) {
      link.classList.remove("active");
      if (link.href === document.URL) {
        console.log(link.href);
        link.className = "active";
      }
    }
  });

  /**
   * Hide navbar when link clicked
   * or when close button clicked
   */
  for (const link of links) {
    link.addEventListener("click", () => {
      navBar.classList.add("hidden");
    });
  }

  closeNav.addEventListener("click", () => {
    navBar.classList.add("hidden");
  });
};

export { navigation };
