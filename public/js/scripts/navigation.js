import { auth } from "./auth.js";

const navigation = {};

navigation.init = () => {
  const navBtn = document.querySelector("#nav-btn");
  const closeNav = document.querySelector("#close-nav");
  const navBar = document.querySelector("nav");
  const links = navBar.querySelectorAll("a");
  const logoutBtn = navBar.querySelector("#logout-btn");

  /*
   * Toggle navigation sidebar
   */
  navBtn.addEventListener("click", () => {
    navBar.classList.remove("hidden");
    for (const link of links) {
      link.classList.remove("active");
      if (link.href === document.URL) {
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

  /**
   * Logout
   */
  logoutBtn.addEventListener("click", async () => {
    const response = await logout();
    if (response.success) {
      auth.token = "";
    }
  });

  /*
   * Logout
   */
  async function logout() {
    try {
      console.log("Token from logout: ", auth.token);
      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.dir(err);
    }
  }
};

export { navigation };
