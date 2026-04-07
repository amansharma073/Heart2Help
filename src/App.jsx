import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function AboutPage() {
  return (
    <div style={{ backgroundColor: "#f8faff", minHeight: "100vh" }}>
      <div className="py-5 text-white text-center" style={{ background: "linear-gradient(135deg, #1a2a4a, #1a73e8)" }}>
        <h1 className="fw-bold">About Heart2Help</h1>
        <p className="text-white-75">Our mission, values, and the team behind the platform</p>
      </div>
      <div className="container py-5" style={{ maxWidth: "760px" }}>
        <div className="card border-0 shadow-sm rounded-4 p-5 mb-4">
          <h4 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>Our Mission</h4>
          <p className="text-muted">
            Heart2Help was founded with a simple belief: every family deserves access to trustworthy,
            compassionate care. We connect families with verified caretakers for elderly care, childcare,
            and pet care — making the process safe, simple, and stress-free.
          </p>
        </div>
        <div className="row g-4">
          {[
            { icon: "🔒", title: "Verified Professionals", desc: "Every caretaker is background-checked and verified before joining our platform." },
            { icon: "⭐", title: "Quality Assured", desc: "Real reviews from real families help you make confident, informed decisions." },
            { icon: "💬", title: "24/7 Support", desc: "Our support team is always available to help you find the right care." },
          ].map(({ icon, title, desc }) => (
            <div className="col-md-4" key={title}>
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100">
                <div style={{ fontSize: "2.5rem" }}>{icon}</div>
                <h6 className="fw-bold mt-2 mb-1" style={{ color: "#1a2a4a" }}>{title}</h6>
                <p className="text-muted small mb-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
