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
      console.log("user is successfully logged out");
    } else {
      console.log("something went wrong while logging out");
    }
  });

  /*
   * Logout
   */
  async function logout() {
    try {
      const res = await fetch("/api/users/logout", {
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
