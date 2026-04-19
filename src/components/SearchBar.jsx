import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [service,  setService]  = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/listings?location=${encodeURIComponent(location)}&service=${encodeURIComponent(service)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-search">
      {/* Location input with icon */}
      <div style={{ position: "relative", flex: 1, minWidth: "160px" }}>
        <MapPin
          size={15}
          style={{
            position: "absolute", left: "14px", top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,.65)", pointerEvents: "none", zIndex: 1,
          }}
        />
        <input
          type="text"
          placeholder="Your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ paddingLeft: "2.4rem !important" }}
        />
      </div>

      {/* Service select */}
      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">All services</option>
        <option value="Elderly Care">Elderly Care</option>
        <option value="Child Care">Child Care</option>
        <option value="Pet Care">Pet Care</option>
      </select>

      {/* Submit */}
      <button type="submit" className="btn-search">
        <Search size={15} />
        Find Caretakers
      </button>
    </form>
  );
}
