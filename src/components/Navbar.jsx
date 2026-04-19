import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Sun, Moon } from "lucide-react";
import AuthModal from "./AuthModal";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();
  const [showModal,  setShowModal]  = useState(false);
  const [modalRole,  setModalRole]  = useState("user");
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const openModal = (role) => { setModalRole(role); setShowModal(true); };

  const links = [
    { label: "Home",     path: "/" },
    { label: "Services", path: "/listings" },
    { label: "About",    path: "/about" },
  ];

  return (
    <>
      <nav className={`h2h-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between">

          {/* Logo */}
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} fill="#fff" color="#fff" />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em" }}>
              Heart2Help
            </span>
          </Link>

          {/* Desktop links */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            {links.map(({ label, path }) => (
              <Link key={path} to={path} className={`nav-link-h2h ${pathname === path ? "active" : ""}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop buttons + theme toggle */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {/* Theme toggle */}
            <button
              className="theme-toggle-btn"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              <span className={`theme-toggle-icon${dark ? " theme-toggle-icon--out" : ""}`}>
                <Sun size={15} />
              </span>
              <span className={`theme-toggle-icon${!dark ? " theme-toggle-icon--out" : ""}`}>
                <Moon size={15} />
              </span>
            </button>

            <button className="btn-ghost" onClick={() => openModal("user")}>
              Sign In
            </button>
            <button className="btn-primary-nav" onClick={() => openModal("caretaker")}>
              Join as Caretaker
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="d-lg-none d-flex align-items-center gap-2">
            <button
              className="theme-toggle-btn"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className={`theme-toggle-icon${dark ? " theme-toggle-icon--out" : ""}`}>
                <Sun size={15} />
              </span>
              <span className={`theme-toggle-icon${!dark ? " theme-toggle-icon--out" : ""}`}>
                <Moon size={15} />
              </span>
            </button>
            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="d-lg-none"
          style={{
            overflow: "hidden",
            maxHeight: mobileOpen ? 360 : 0,
            opacity: mobileOpen ? 1 : 0,
            transition: "max-height .35s cubic-bezier(.22,1,.36,1), opacity .25s ease",
          }}
        >
          <div className="container">
            <div className="mobile-menu-inner">
              {links.map(({ label, path }) => (
                <Link
                  key={path} to={path}
                  className={`nav-link-h2h ${pathname === path ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontSize: ".95rem", padding: ".35rem 0" }}
                >
                  {label}
                </Link>
              ))}
              <div className="d-flex gap-2 pt-2 flex-wrap">
                <button className="btn-ghost" onClick={() => { openModal("user"); setMobileOpen(false); }}>
                  Sign In
                </button>
                <button className="btn-primary-nav" onClick={() => { openModal("caretaker"); setMobileOpen(false); }}>
                  Join as Caretaker
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <AuthModal defaultRole={modalRole} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
