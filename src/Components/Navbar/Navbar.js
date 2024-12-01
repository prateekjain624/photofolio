import React from "react";
import logo from "./logo.jpg";
const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="150"
              height="40"
              className="d-inline-block align-text-center"
            />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
