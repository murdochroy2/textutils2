import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme={`${props.mode}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {props.aboutText}
              </Link>
            </li>
          </ul>
          <div className="d-flex me-2">
            <button className="btn btn-warning rounded me-2 rounded-4" style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }} onClick={(event) => props.toggleMode(event, "warning")}></button>
          </div>
          <div className="d-flex me-2">
            <button className="btn btn-info rounded me-2 rounded-4" style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }} onClick={(event) => props.toggleMode(event, "info")}></button>
          </div>
          <div className="d-flex me-2">
            <button className="btn btn-danger rounded me-2 rounded-4" style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }} onClick={(event) => props.toggleMode(event, "danger")}></button>
          </div>
          <div
            className={`form-check form-switch me-2 text-${props.mode === "dark" ? "light" : "dark"
              }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={props.toggleMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Dark
            </label>
          </div>
          {/* Red mode */}
          <div
            className={`form-check form-switch me-2 text-${props.mode === "dark" ? "light" : "dark"
              }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={props.toggleRedMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Red
            </label>
          </div>
          {/* Green mode */}
          <div
            className={`form-check form-switch me-2 text-${props.mode === "dark" ? "light" : "dark"
              }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={props.toggleGreenMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Green
            </label>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string.isRequired,
};

Navbar.defaultProps = { title: "Default Title" };
export default Navbar;
