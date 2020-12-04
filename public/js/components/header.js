const header = {
  render: (isLoggedin) => {
    let navMenu = "";
    if (isLoggedin) {
      navMenu = `
        <li>
          <i id="nav-btn" class="fas fa-bars"></i>
        </li>
      `;
    } else {
      navMenu = `
        <li>
          <a href="#login"><i class="fas fa-user-ninja"></i></a>
        </li>
        <li>
          <a href="#register"><i class="fas fa-user-plus"></i></a>
        </li>
      `;
    }
    return `
      <header>
        <div id="logo"><a href="/">Lotoklub#1</a></div>
        <div id="menu">
          <ul>            
            ${navMenu}
          </ul>
        </div>
      </header>
    `;
  },
};

export { header };
