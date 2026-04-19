import { useParams, Link } from "react-router-dom";
import {
  MapPin, DollarSign, Star, CheckCircle2,
  Clock, ArrowLeft, MessageCircle, Calendar, ShieldCheck,
  Award, Briefcase,
} from "lucide-react";
import caretakers from "../data/caretakers";

const catStyle = {
  "Elderly Care": { bg: "#eff6ff", color: "#2563eb" },
  "Child Care":   { bg: "#fdf2f8", color: "#db2777" },
  "Pet Care":     { bg: "#f0fdf4", color: "#16a34a" },
};

/* ── Inline trust signals — replaces the boxed section ── */
const trustSignals = (c) => [
  { Icon: ShieldCheck, label: "Background verified",          color: "#16a34a" },
  { Icon: Star,        label: `${c.rating} rated by families`, color: "#d97706" },
  { Icon: Briefcase,   label: `${c.experience} experience`,    color: "#2563eb" },
];

/* ── Reusable section card ── */
function SectionCard({ icon, title, children }) {
  return (
    <div className="profile-section-card">
      <div className="profile-section-header">
        <div className="profile-section-icon">{icon}</div>
        <h5 className="profile-section-title">{title}</h5>
      </div>
      {children}
    </div>
  );
}

export default function Profile() {
  const { id } = useParams();
  const c = caretakers.find((x) => x.id === parseInt(id));

  if (!c) return (
    <div className="profile-not-found">
      <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>😕</div>
      <h3 style={{ marginBottom: ".4rem" }}>Caretaker not found</h3>
      <p style={{ marginBottom: "1.5rem" }}>This profile doesn't exist or may have been removed.</p>
      <Link to="/listings" className="btn-card" style={{ display: "inline-block", width: "auto", padding: ".65rem 1.75rem" }}>
        Back to Listings
      </Link>
    </div>
  );

  const cat = catStyle[c.category] || { bg: "#f1f5f9", color: "#475569" };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Hero banner ── */}
      <div className="profile-hero">
        <div className="container">
          <Link to="/listings" className="profile-back-link">
            <ArrowLeft size={14} /> Back to Listings
          </Link>
        </div>
      </div>

      <div className="container profile-page-body">
        <div className="row g-4">

          {/* ── Sidebar ── */}
          <div className="col-lg-4">
            <div className="profile-sidebar">

              {/* Avatar */}
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-ring">
                  <img src={c.image} alt={c.name} className="profile-avatar" />
                </div>
                {c.available && (
                  <span className="profile-online-dot" title="Available now" />
                )}
              </div>

              {/* Category pill */}
              <span className="profile-cat-tag" style={{ background: cat.bg, color: cat.color }}>
                {c.category}
              </span>

              {/* Name */}
              <h4 className="profile-name">{c.name}</h4>

              {/* Rating */}
              <div className="profile-rating-row">
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <strong>{c.rating}</strong>
                <span className="profile-rating-count">({c.reviews} reviews)</span>
              </div>

              {/* Availability */}
              <span className={`profile-avail-pill${c.available ? " avail" : " busy"}`}>
                {c.available ? "✓ Available Now" : "Currently Unavailable"}
              </span>

              {/* ── Inline trust signals — no box ── */}
              <ul className="profile-trust-list">
                {trustSignals(c).map(({ Icon, label, color }) => (
                  <li key={label} className="profile-trust-item">
                    <Icon size={12} color={color} strokeWidth={2.5} />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="profile-sidebar-divider" />

              {/* Meta */}
              <div className="profile-meta-list">
                {[
                  { Icon: MapPin,     text: c.location },
                  { Icon: DollarSign, text: c.hourlyRate + " / hour" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="profile-meta-item">
                    <div className="profile-meta-icon">
                      <Icon size={12} color="var(--blue)" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <button className="profile-btn-primary">
                <MessageCircle size={14} /> Contact {c.name.split(" ")[0]}
              </button>
              <button className="profile-btn-outline">
                <Calendar size={14} /> Book a Session
              </button>

            </div>
          </div>

          {/* ── Detail sections ── */}
          <div className="col-lg-8">

            {/* About */}
            <SectionCard
              icon={<CheckCircle2 size={15} color="var(--blue)" />}
              title="About"
            >
              <p className="profile-bio">{c.bio}</p>
            </SectionCard>

            {/* Skills — max 3 */}
            <SectionCard
              icon={<Award size={15} color="var(--blue)" />}
              title="Skills & Expertise"
            >
              <div className="profile-skills">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="profile-skill-tag">
                    <CheckCircle2 size={10} strokeWidth={2.5} /> {s}
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* Availability */}
            <SectionCard
              icon={<Clock size={15} color="var(--blue)" />}
              title="Availability Schedule"
            >
              <div className="profile-schedule-grid">
                {c.schedule.map((slot, i) => (
                  <div key={i} className="profile-schedule-slot">
                    <Clock size={11} color="var(--blue)" />
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Reviews */}
            <SectionCard
              icon={<Star size={15} color="var(--blue)" />}
              title={`Client Reviews (${c.reviewsList.length})`}
            >
              <div className="profile-reviews">
                {c.reviewsList.map((r, i) => (
                  <div key={i} className="profile-review-card">
                    <div className="profile-review-header">
                      <div className="profile-review-avatar">
                        {r.author.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="profile-review-author">{r.author}</div>
                        <div className="profile-review-stars">
                          {Array.from({ length: r.stars }).map((_, j) => (
                            <Star key={j} size={10} fill="#f59e0b" color="#f59e0b" />
                          ))}
                          {Array.from({ length: 5 - r.stars }).map((_, j) => (
                            <Star key={`e${j}`} size={10} fill="none" color="#e2e8f0" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="profile-review-text">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}
