import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ title, mode, toggleMode }) {
  const { pathname } = useLocation();
  const isDark = mode === "dark";

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      data-bs-theme="dark"
      style={{
        background: isDark
          ? "linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)"
          : "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
        borderBottom: "none",
        boxShadow: "0 2px 16px rgba(79, 70, 229, 0.35)",
      }}
    >
      <div className="container-fluid px-3 px-md-4">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#fff", letterSpacing: "0.02em" }}>
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
            <span className="small" style={{ color: "rgba(255,255,255,0.75)" }}>
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
