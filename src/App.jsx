import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/listings"    element={<Listings />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/about"       element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1d4ed8)", padding: "64px 0" }}>
        <div className="container text-center">
          <span className="section-label" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>✦ Our Story</span>
          <h2 style={{ color: "#fff", marginTop: ".6rem" }}>About Heart2Help</h2>
          <p style={{ color: "rgba(255,255,255,.65)", maxWidth: "440px", margin: ".5rem auto 0" }}>
            Our mission, values, and the team behind the platform
          </p>
        </div>
      </div>
      <div className="container" style={{ padding: "56px 16px", maxWidth: "760px" }}>
        <div className="about-mission-card">
          <h4 style={{ marginBottom: ".75rem" }}>Our Mission</h4>
          <p style={{ margin: 0 }}>
            Heart2Help was founded with a simple belief: every family deserves access to trustworthy,
            compassionate care. We connect families with verified caretakers for elderly care, childcare,
            and pet care — making the process safe, simple, and stress-free.
          </p>
        </div>
        <div className="row g-4">
          {[
            { icon: "🔒", title: "Verified Professionals", desc: "Every caretaker is background-checked and verified before joining our platform." },
            { icon: "⭐", title: "Quality Assured",        desc: "Real reviews from real families help you make confident, informed decisions." },
            { icon: "💬", title: "24/7 Support",           desc: "Our support team is always available to help you find the right care." },
          ].map(({ icon, title, desc }) => (
            <div className="col-md-4" key={title}>
              <div className="about-feature-card">
                <div style={{ fontSize: "2rem", marginBottom: ".6rem" }}>{icon}</div>
                <h5 style={{ marginBottom: ".35rem" }}>{title}</h5>
                <p style={{ fontSize: ".875rem", margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
