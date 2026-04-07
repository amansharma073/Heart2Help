import { Link } from "react-router-dom";

const categoryColors = {
  "Elderly Care": "#e8f0fe",
  "Child Care": "#fce8f3",
  "Pet Care": "#e8f5e9",
};

const categoryIcons = {
  "Elderly Care": "👴",
  "Child Care": "👶",
  "Pet Care": "🐾",
};

export default function CaretakerCard({ caretaker }) {
  const { id, name, category, skills, rating, reviews, available, image, hourlyRate, location } =
    caretaker;

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "16px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div className="position-relative">
        <img
          src={image}
          alt={name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover", borderRadius: "16px 16px 0 0" }}
        />
        <span
          className="position-absolute top-0 end-0 m-2 badge"
          style={{
            backgroundColor: available ? "#34a853" : "#ea4335",
            borderRadius: "20px",
            fontSize: "0.75rem",
          }}
        >
          {available ? "✓ Available" : "Unavailable"}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <div
          className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill mb-2 small fw-medium"
          style={{ backgroundColor: categoryColors[category] || "#f0f0f0", width: "fit-content" }}
        >
          <span>{categoryIcons[category]}</span>
          <span style={{ color: "#444" }}>{category}</span>
        </div>

        <h6 className="fw-bold mb-1" style={{ color: "#1a2a4a" }}>
          {name}
        </h6>

        <p className="text-muted small mb-2">
          📍 {location} &nbsp;|&nbsp; 💰 {hourlyRate}
        </p>

        <div className="d-flex align-items-center gap-1 mb-2">
          <span style={{ color: "#f4b400" }}>{"★".repeat(Math.round(rating))}</span>
          <span className="small fw-semibold">{rating}</span>
          <span className="text-muted small">({reviews} reviews)</span>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="badge rounded-pill small"
              style={{ backgroundColor: "#e8f0fe", color: "#1a73e8", fontWeight: 500 }}
            >
              {skill}
            </span>
          ))}
        </div>

        <Link
          to={`/profile/${id}`}
          className="btn btn-sm mt-auto w-100 fw-semibold"
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
          }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
