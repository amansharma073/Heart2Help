import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SlidersHorizontal, RotateCcw, ArrowRight, Search, ShieldCheck } from "lucide-react";
import CaretakerCard from "../components/CaretakerCard";
import caretakers from "../data/caretakers";

const categories = ["All", "Elderly Care", "Child Care", "Pet Care"];
const availOpts  = ["All", "Available", "Unavailable"];
const sortOpts   = [
  { value: "default",    label: "Sort: Default" },
  { value: "rating",     label: "Rating: High → Low" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

function parseRate(r) {
  return parseFloat(String(r).replace(/[^0-9.]/g, "")) || 0;
}

const trustItems = [
  "Background verified",
  "Top-rated pros",
  "Trusted by families",
];

export default function Listings() {
  const { search } = useLocation();
  const [category,     setCategory]     = useState("All");
  const [availability, setAvailability] = useState("All");
  const [minRating,    setMinRating]    = useState(0);
  const [sortBy,       setSortBy]       = useState("default");
  const [loading,      setLoading]      = useState(true);
  const [searchQ,      setSearchQ]      = useState("");

  useEffect(() => {
    const svc = new URLSearchParams(search).get("service");
    if (svc) setCategory(svc);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = caretakers
    .filter((c) => {
      const matchCat   = category === "All" || c.category === category;
      const matchAvail = availability === "All" || (availability === "Available" ? c.available : !c.available);
      const matchQ     = !searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.location.toLowerCase().includes(searchQ.toLowerCase());
      return matchCat && matchAvail && c.rating >= minRating && matchQ;
    })
    .sort((a, b) => {
      if (sortBy === "rating")     return b.rating - a.rating;
      if (sortBy === "price-asc")  return parseRate(a.hourlyRate) - parseRate(b.hourlyRate);
      if (sortBy === "price-desc") return parseRate(b.hourlyRate) - parseRate(a.hourlyRate);
      return 0;
    });

  const rangePct = (minRating / 5) * 100;

  const resetFilters = () => {
    setCategory("All");
    setAvailability("All");
    setMinRating(0);
    setSortBy("default");
    setSearchQ("");
  };

  const hasActiveFilters = category !== "All" || availability !== "All" || minRating > 0 || searchQ;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Page header ── */}
      <div className="listings-hero">
        <div className="container">
          <div className="listings-hero-inner">
            <div>
              <span className="section-label" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>
                ✦ Browse Caretakers
              </span>
              <h2 style={{ color: "#fff", marginTop: ".5rem", marginBottom: ".4rem" }}>
                Find Your Perfect Match
              </h2>
              <p style={{ color: "rgba(255,255,255,.65)", margin: 0 }}>
                All caretakers are background-verified and reviewed by real families
              </p>
            </div>

            {/* Trust signals */}
            <div className="listings-trust">
              {trustItems.map((t) => (
                <span key={t} className="listings-trust-item">
                  <ShieldCheck size={12} color="#4ade80" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick search — removed from hero, now lives in filter panel */}
        </div>
      </div>

      <div className="container" style={{ padding: "var(--sp-4) 16px var(--sp-7)" }}>
        <div className="row g-4">

          {/* ── Filter sidebar ── */}
          <div className="col-lg-3">
            <div className="filter-panel">
              {/* Header */}
              <div className="filter-header">
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <SlidersHorizontal size={14} color="var(--blue)" />
                  <h5 style={{ margin: 0, fontSize: ".95rem" }}>Filters</h5>
                  {hasActiveFilters && (
                    <span className="filter-active-dot" />
                  )}
                </div>
                <button className="filter-reset-btn" onClick={resetFilters}>
                  <RotateCcw size={11} /> Reset
                </button>
              </div>

              {/* Search inside filter panel */}
              <div className="filter-search-wrap">
                <Search size={14} className="filter-search-icon" />
                <input
                  className="filter-search-input"
                  type="text"
                  placeholder="Search by name or location…"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                />
                {searchQ && (
                  <button
                    className="filter-search-clear"
                    onClick={() => setSearchQ("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="filter-divider" />

              {/* Category */}
              <div className="filter-group">
                <div className="filter-title">Category</div>
                <div className="filter-chips">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`toggle-btn${category === cat ? " active" : ""}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-divider" />

              {/* Availability */}
              <div className="filter-group">
                <div className="filter-title">Availability</div>
                <div className="filter-chips">
                  {availOpts.map((opt) => (
                    <button
                      key={opt}
                      className={`toggle-btn${availability === opt ? " active" : ""}`}
                      onClick={() => setAvailability(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-divider" />

              {/* Min Rating */}
              <div className="filter-group" style={{ marginBottom: 0 }}>
                <div className="filter-title" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Min Rating</span>
                  <span className="filter-rating-val">
                    {minRating > 0 ? `${minRating}+ ★` : "Any"}
                  </span>
                </div>
                <input
                  type="range" className="range-slider"
                  min="0" max="5" step="0.5" value={minRating}
                  style={{ background: `linear-gradient(to right, var(--blue) ${rangePct}%, var(--border) ${rangePct}%)` }}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                />
                <div className="filter-range-labels">
                  <span>Any</span><span>5 ★</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="col-lg-9">
            {/* Results bar */}
            <div className="results-bar">
              <p style={{ margin: 0, fontSize: ".875rem", color: "var(--muted)" }}>
                {loading ? "Loading…" : (
                  <>
                    <strong style={{ color: "var(--text)" }}>{filtered.length}</strong>
                    {" "}caretaker{filtered.length !== 1 ? "s" : ""} found
                  </>
                )}
              </p>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortOpts.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="row g-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div className="col-md-6 col-xl-4" key={n}>
                    <CaretakerCard loading={true} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-emoji">🔍</span>
                <h4>No caretakers found</h4>
                <p>Try adjusting your filters or search term.</p>
                <button
                  onClick={resetFilters}
                  className="btn-card"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", width: "auto", padding: ".55rem 1.4rem" }}
                >
                  <RotateCcw size={13} /> Reset Filters
                </button>
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

            {/* Bottom CTA */}
            {!loading && filtered.length > 0 && (
              <div className="listings-bottom-cta">
                <p>Can't find what you're looking for?</p>
                <Link to="/about" className="listings-bottom-link">
                  Become a Caretaker <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
