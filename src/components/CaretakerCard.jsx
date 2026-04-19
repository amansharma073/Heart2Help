import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock, Heart, ShieldCheck } from "lucide-react";

const catStyle = {
  "Elderly Care": { bg: "#eff6ff", color: "#2563eb" },
  "Child Care":   { bg: "#fdf2f8", color: "#db2777" },
  "Pet Care":     { bg: "#f0fdf4", color: "#16a34a" },
};

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div className="skeleton skeleton-line" style={{ width: "38%", height: 10 }} />
          <div className="skeleton skeleton-line" style={{ width: "22%", height: 10 }} />
        </div>
        <div className="skeleton skeleton-line w-80" style={{ height: 13, marginBottom: 8 }} />
        <div className="skeleton skeleton-line w-60" style={{ marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <div className="skeleton skeleton-line" style={{ width: "42%", height: 22, borderRadius: 50 }} />
          <div className="skeleton skeleton-line" style={{ width: "38%", height: 22, borderRadius: 50 }} />
        </div>
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

export default function CaretakerCard({ caretaker, loading = false }) {
  const [liked, setLiked] = useState(false);

  if (loading) return <SkeletonCard />;

  const { id, name, category, skills, rating, reviews, available, image, hourlyRate, location } = caretaker;
  const cat = catStyle[category] || { bg: "#f1f5f9", color: "#475569" };

  return (
    <div className="ct-card">

      {/* ── Image ── */}
      <div className="ct-img-wrap">
        <img src={image} alt={name} loading="lazy" />

        {/* Favourite */}
        <button
          className={`ct-heart-btn${liked ? " active" : ""}`}
          onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart size={13} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "#64748b"} />
        </button>

        {/* Availability dot-badge — top left */}
        <span className={`ct-avail-badge${available ? " avail" : " busy"}`}>
          <span className="ct-avail-dot" />
          {available ? "Available" : "Busy"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="ct-body">

        {/* Row 1: category tag + star rating */}
        <div className="ct-meta-row">
          <span className="ct-cat-tag" style={{ background: cat.bg, color: cat.color }}>
            {category}
          </span>
          <span className="ct-rating">
            <Star size={11} fill="#f59e0b" color="#f59e0b" />
            <strong>{rating}</strong>
            <span className="ct-reviews">({reviews})</span>
          </span>
        </div>

        {/* Row 2: name */}
        <h5 className="ct-name">{name}</h5>

        {/* Row 3: location + price */}
        <div className="ct-info-row">
          <span className="ct-info-item">
            <MapPin size={11} /> {location}
          </span>
          <span className="ct-info-item ct-price-item">
            <Clock size={11} />
            <span className="ct-price">{hourlyRate}</span>
          </span>
        </div>

        {/* Row 4: skill tags — max 2 */}
        <div className="ct-skills">
          {skills.slice(0, 2).map((s) => (
            <span key={s} className="ct-skill-tag">{s}</span>
          ))}
        </div>

        {/* Row 5: inline trust badge — subtle, not a bar */}
        <div className="ct-trust-inline">
          <ShieldCheck size={10} strokeWidth={2.5} />
          <span>Background verified</span>
        </div>

        {/* Row 6: CTA */}
        <Link to={`/profile/${id}`} className="ct-cta">
          View Profile
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>

      </div>
    </div>
  );
}
