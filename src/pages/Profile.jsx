import { useParams, Link } from "react-router-dom";
import caretakers from "../data/caretakers";

export default function Profile() {
  const { id } = useParams();
  const caretaker = caretakers.find((c) => c.id === parseInt(id));

  if (!caretaker) {
    return (
      <div className="text-center py-5">
        <h3>Caretaker not found</h3>
        <Link to="/listings" className="btn btn-primary mt-3">Back to Listings</Link>
      </div>
    );
  }

  const { name, category, skills, rating, reviews, available, image, hourlyRate, location,
    bio, experience, schedule, reviewsList } = caretaker;

  const badgeStyle = {
    backgroundColor: available ? "#e8f5e9" : "#fce8e6",
    color: available ? "#2e7d32" : "#c62828",
  };

  return (
    <div style={{ backgroundColor: "#f8faff", minHeight: "100vh" }}>
      <div className="py-5" style={{ background: "linear-gradient(135deg, #1a2a4a, #1a73e8)" }}>
        <div className="container">
          <Link to="/listings" className="text-white-50 text-decoration-none small">
            ← Back to Listings
          </Link>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Left: Profile Card */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center sticky-top" style={{ top: "80px" }}>
              <img
                src={image}
                alt={name}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #1a73e8" }}
              />
              <h4 className="fw-bold mb-1" style={{ color: "#1a2a4a" }}>{name}</h4>
              <p className="text-muted small mb-2">{category}</p>

              <div className="d-flex justify-content-center align-items-center gap-1 mb-2">
                <span style={{ color: "#f4b400", fontSize: "1.1rem" }}>
                  {"★".repeat(Math.round(rating))}
                </span>
                <span className="fw-semibold">{rating}</span>
                <span className="text-muted small">({reviews} reviews)</span>
              </div>

              <span className="badge rounded-pill px-3 py-2 mb-3" style={badgeStyle}>
                {available ? "✓ Available Now" : "Currently Unavailable"}
              </span>

              <div className="text-start small text-muted mb-3">
                <div className="mb-1">📍 {location}</div>
                <div className="mb-1">💼 {experience} experience</div>
                <div>💰 {hourlyRate}</div>
              </div>

              <button className="btn w-100 fw-semibold rounded-3" style={{ backgroundColor: "#1a73e8", color: "#fff" }}>
                📩 Contact {name.split(" ")[0]}
              </button>
              <button className="btn btn-outline-secondary w-100 mt-2 rounded-3 small">
                📅 Book a Session
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>About</h5>
              <p className="text-muted">{bio}</p>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>Skills & Expertise</h5>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="badge rounded-pill px-3 py-2"
                    style={{ backgroundColor: "#e8f0fe", color: "#1a73e8", fontWeight: 500 }}
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>Availability Schedule</h5>
              <div className="row g-2">
                {schedule.map((slot, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="p-3 rounded-3 small fw-medium" style={{ backgroundColor: "#e8f0fe", color: "#1a2a4a" }}>
                      🕐 {slot}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3" style={{ color: "#1a2a4a" }}>
                Client Reviews ({reviewsList.length})
              </h5>
              <div className="d-flex flex-column gap-3">
                {reviewsList.map((review, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-3"
                    style={{ backgroundColor: "#f8faff", border: "1px solid #e8f0fe" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-semibold small" style={{ color: "#1a2a4a" }}>{review.author}</span>
                      <span style={{ color: "#f4b400" }}>{"★".repeat(review.stars)}</span>
                    </div>
                    <p className="text-muted small mb-0">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
