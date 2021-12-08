import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">BCB-API</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav ">
          <button type="button" className="btn btn-primary btn-sm">
            Small button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>
          <button className="btn btn-sm btn-outline-secondary" type="button">
            Smaller button
          </button>

          <button className="btn btn-outline-success btn-sm" type="button">
            Main button
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
