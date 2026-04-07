import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState("user"); // "user" or "caretaker"

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4">

          {/* Logo - far left */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span style={{ fontSize: "1.5rem" }}>❤️</span>
            <span style={{ color: "#1a73e8", fontSize: "1.25rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
              Heart2Help
            </span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Right side */}
          <div className="collapse navbar-collapse justify-content-end" id="navMenu">
            <ul className="navbar-nav align-items-center gap-2 me-3">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/listings" },
                { label: "About", path: "/about" },
              ].map(({ label, path }) => (
                <li className="nav-item" key={path}>
                  <Link
                    className="nav-link px-3 py-1 rounded-pill fw-medium"
                    style={
                      pathname === path
                        ? { backgroundColor: "#1a73e8", color: "#fff" }
                        : { color: "#4a5568" }
                    }
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Login buttons */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary rounded-pill px-3 py-1 fw-semibold"
                style={{ borderColor: "#1a73e8", color: "#1a73e8", fontSize: "0.9rem" }}
                onClick={() => { setLoginType("user"); setShowLoginModal(true); }}
              >
                👤 User Login
              </button>
              <button
                className="btn rounded-pill px-3 py-1 fw-semibold"
                style={{ backgroundColor: "#1a73e8", color: "#fff", fontSize: "0.9rem" }}
                onClick={() => { setLoginType("caretaker"); setShowLoginModal(true); }}
              >
                🩺 Join as Caretaker
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white rounded-4 p-4 shadow-lg"
            style={{ width: "100%", maxWidth: "420px", margin: "1rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0" style={{ color: "#1a2a4a" }}>
                {loginType === "user" ? "👤 User Login" : "🩺 Caretaker Login"}
              </h5>
              <button
                className="btn-close"
                onClick={() => setShowLoginModal(false)}
              />
            </div>

            {/* Toggle tabs */}
            <div className="d-flex rounded-3 p-1 mb-4" style={{ backgroundColor: "#f0f4ff" }}>
              {["user", "caretaker"].map((type) => (
                <button
                  key={type}
                  className="btn flex-fill rounded-2 fw-semibold py-1"
                  style={
                    loginType === type
                      ? { backgroundColor: "#1a73e8", color: "#fff", fontSize: "0.9rem" }
                      : { backgroundColor: "transparent", color: "#6b7a8d", fontSize: "0.9rem" }
                  }
                  onClick={() => setLoginType(type)}
                >
                  {type === "user" ? "👤 User" : "🩺 Caretaker"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label fw-medium small" style={{ color: "#4a5568" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="you@example.com"
                  style={{ fontSize: "0.95rem", padding: "0.6rem 1rem" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium small" style={{ color: "#4a5568" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Enter your password"
                  style={{ fontSize: "0.95rem", padding: "0.6rem 1rem" }}
                />
              </div>

              {loginType === "caretaker" && (
                <div className="mb-3">
                  <label className="form-label fw-medium small" style={{ color: "#4a5568" }}>
                    Service Category
                  </label>
                  <select className="form-select rounded-3" style={{ fontSize: "0.95rem" }}>
                    <option value="">Select your specialty</option>
                    <option>👴 Elderly Care</option>
                    <option>👶 Child Care</option>
                    <option>🐾 Pet Care</option>
                  </select>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label small" htmlFor="remember" style={{ color: "#6b7a8d" }}>
                    Remember me
                  </label>
                </div>
                <a href="/" className="small text-decoration-none" style={{ color: "#1a73e8" }}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold rounded-3 py-2"
                style={{ backgroundColor: "#1a73e8", color: "#fff", fontSize: "1rem" }}
              >
                {loginType === "user" ? "Login" : "Login as Caretaker"}
              </button>

              <p className="text-center small mt-3 mb-0" style={{ color: "#6b7a8d" }}>
                Don't have an account?{" "}
                <a href="/" className="fw-semibold text-decoration-none" style={{ color: "#1a73e8" }}>
                  {loginType === "caretaker" ? "Register as Caretaker" : "Sign Up"}
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
