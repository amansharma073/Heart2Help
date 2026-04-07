import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CaretakerCard from "../components/CaretakerCard";
import caretakers from "../data/caretakers";

export default function Listings() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [category, setCategory] = useState(params.get("service") || "All");
  const [availability, setAvailability] = useState("All");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const svc = params.get("service");
    if (svc) setCategory(svc);
  }, [search]); // eslint-disable-line

  const filtered = caretakers.filter((c) => {
    const matchCat = category === "All" || c.category === category;
    const matchAvail =
      availability === "All" ||
      (availability === "Available" && c.available) ||
      (availability === "Unavailable" && !c.available);
    const matchRating = c.rating >= minRating;
    return matchCat && matchAvail && matchRating;
  });

  return (
    <div style={{ backgroundColor: "#f8faff", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        className="py-5 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1a2a4a, #1a73e8)" }}
      >
        <h1 className="fw-bold mb-2">Find Your Caretaker</h1>
        <p className="text-white-75 mb-0">Browse verified professionals in your area</p>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "80px" }}>
              <h6 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>🔧 Filters</h6>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-muted">Category</label>
                {["All", "Elderly Care", "Child Care", "Pet Care"].map((cat) => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id={cat}
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      style={{ accentColor: "#1a73e8" }}
                    />
                    <label className="form-check-label small" htmlFor={cat}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-muted">Availability</label>
                {["All", "Available", "Unavailable"].map((opt) => (
                  <div className="form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="availability"
                      id={opt}
                      checked={availability === opt}
                      onChange={() => setAvailability(opt)}
                      style={{ accentColor: "#1a73e8" }}
                    />
                    <label className="form-check-label small" htmlFor={opt}>
                      {opt}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="form-label small fw-semibold text-muted">
                  Min Rating: <span style={{ color: "#1a73e8" }}>{minRating}★</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  style={{ accentColor: "#1a73e8" }}
                />
                <div className="d-flex justify-content-between small text-muted">
                  <span>0</span><span>5</span>
                </div>
              </div>

              <button
                className="btn btn-sm btn-outline-secondary mt-3 w-100 rounded-pill"
                onClick={() => { setCategory("All"); setAvailability("All"); setMinRating(0); }}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0 small">
                Showing <strong>{filtered.length}</strong> caretaker{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: "3rem" }}>🔍</div>
                <h5 className="mt-3 text-muted">No caretakers match your filters</h5>
                <p className="text-muted small">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="row g-4">
                {filtered.map((c) => (
                  <div className="col-md-6 col-xl-4" key={c.id}>
                    <CaretakerCard caretaker={c} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
