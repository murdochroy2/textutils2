import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ title, mode, toggleMode }) {
  const { pathname } = useLocation();
  const isDark = mode === "dark";

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      data-bs-theme={isDark ? "dark" : "light"}
      style={{
        backgroundColor: isDark ? "#161b22" : "#ffffff",
        borderBottom: `1px solid ${isDark ? "#30363d" : "#d0d7de"}`,
      }}
    >
      <div className="container-fluid px-3 px-md-4">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: isDark ? "#58a6ff" : "#0969da" }}>
          {title}
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link${pathname === "/" ? " active fw-semibold" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${pathname === "/about" ? " active fw-semibold" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <span className="small" style={{ color: isDark ? "#8b949e" : "#57606a" }}>
              {isDark ? "Dark" : "Light"}
            </span>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="darkModeSwitch"
                checked={isDark}
                onChange={toggleMode}
              />
              <label className="form-check-label visually-hidden" htmlFor="darkModeSwitch">
                Toggle dark mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
