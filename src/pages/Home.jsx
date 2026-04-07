import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CaretakerCard from "../components/CaretakerCard";
import caretakers from "../data/caretakers";

const categories = [
  { icon: "👴", label: "Elderly Care", desc: "Compassionate support for seniors at home", color: "#e8f0fe" },
  { icon: "👶", label: "Child Care", desc: "Safe, nurturing care for your little ones", color: "#fce8f3" },
  { icon: "🐾", label: "Pet Care", desc: "Loving care for your furry family members", color: "#e8f5e9" },
];

const stats = [
  { value: "2,500+", label: "Verified Caretakers" },
  { value: "15,000+", label: "Happy Families" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
];

export default function Home() {
  const featured = caretakers.filter((c) => c.available).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #1a2a4a 0%, #1a73e8 100%)",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container py-4">
          <span
            className="badge rounded-pill px-3 py-2 mb-3 small fw-medium"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            ✨ Trusted by 15,000+ families
          </span>
          <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: 1.2 }}>
            Find Trusted Care,{" "}
            <span style={{ color: "#a8d4ff" }}>Anytime</span>
          </h1>
          <p className="lead mb-4 text-white-75" style={{ maxWidth: "560px", margin: "0 auto 2rem" }}>
            Connect with verified caretakers for elderly care, childcare, and pet care — all in one place.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <section className="py-4 bg-white shadow-sm">
        <div className="container">
          <div className="row text-center g-3">
            {stats.map(({ value, label }) => (
              <div className="col-6 col-md-3" key={label}>
                <div className="fw-bold fs-4" style={{ color: "#1a73e8" }}>{value}</div>
                <div className="text-muted small">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5" style={{ backgroundColor: "#f8faff" }}>
        <div className="container">
          <h2 className="fw-bold text-center mb-2" style={{ color: "#1a2a4a" }}>
            Our Care Services
          </h2>
          <p className="text-center text-muted mb-4">Choose the type of care that fits your family's needs</p>
          <div className="row g-4 justify-content-center">
            {categories.map(({ icon, label, desc, color }) => (
              <div className="col-md-4" key={label}>
                <Link to={`/listings?service=${label}`} className="text-decoration-none">
                  <div
                    className="p-4 rounded-4 text-center h-100"
                    style={{
                      backgroundColor: color,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div style={{ fontSize: "3rem" }}>{icon}</div>
                    <h5 className="fw-bold mt-2 mb-1" style={{ color: "#1a2a4a" }}>{label}</h5>
                    <p className="text-muted small mb-0">{desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Caretakers */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#1a2a4a" }}>Featured Caretakers</h2>
              <p className="text-muted mb-0">Top-rated professionals ready to help</p>
            </div>
            <Link
              to="/listings"
              className="btn btn-outline-primary rounded-pill px-4"
              style={{ borderColor: "#1a73e8", color: "#1a73e8" }}
            >
              View All →
            </Link>
          </div>
          <div className="row g-4">
            {featured.map((c) => (
              <div className="col-md-4" key={c.id}>
                <CaretakerCard caretaker={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-5 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1a73e8, #0d47a1)" }}
      >
        <div className="container py-3">
          <h2 className="fw-bold mb-3">Ready to find the perfect caretaker?</h2>
          <p className="mb-4 text-white-75">
            Join thousands of families who trust Heart2Help every day.
          </p>
          <Link
            to="/listings"
            className="btn btn-light fw-semibold px-5 py-2 rounded-pill"
            style={{ color: "#1a73e8" }}
          >
            Browse Caretakers
          </Link>
        </div>
      </section>
    </>
  );
}
