import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?location=${location}&service=${service}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="d-flex flex-column flex-md-row gap-2 p-3 bg-white rounded-4 shadow"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <input
        type="text"
        className="form-control border-0 bg-light rounded-3"
        placeholder="📍 Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ flex: 1 }}
      />
      <select
        className="form-select border-0 bg-light rounded-3"
        value={service}
        onChange={(e) => setService(e.target.value)}
        style={{ flex: 1 }}
      >
        <option value="">🔍 Select service type</option>
        <option value="Elderly Care">👴 Elderly Care</option>
        <option value="Child Care">👶 Child Care</option>
        <option value="Pet Care">🐾 Pet Care</option>
      </select>
      <button
        type="submit"
        className="btn fw-semibold px-4"
        style={{ backgroundColor: "#1a73e8", color: "#fff", borderRadius: "10px", whiteSpace: "nowrap" }}
      >
        Find Caretakers
      </button>
    </form>
  );
}
