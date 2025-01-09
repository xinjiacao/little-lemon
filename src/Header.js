import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header>
      <div>
        <img id="logo" src="logo.png" alt="Little Lemon Logo" />
        <span>Little Lemon</span>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
