import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Search } from "lucide-react";

const services = [
  { value: "",             label: "All Services"  },
  { value: "Elderly Care", label: "Elderly Care"  },
  { value: "Child Care",   label: "Child Care"    },
  { value: "Pet Care",     label: "Pet Care"      },
];

export default function HeroSearch() {
  const [location, setLocation] = useState("");
  const [service,  setService]  = useState("");
  const [locFocus, setLocFocus] = useState(false);
  const [svcFocus, setSvcFocus] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/listings?location=${encodeURIComponent(location)}&service=${encodeURIComponent(service)}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="hs-form" noValidate>

      {/* ── Field 1: Location ── */}
      <div className={`hs-field hs-field-location${locFocus ? " hs-field--focus" : ""}`}>
        <MapPin size={16} className="hs-icon" aria-hidden="true" />
        <input
          id="hs-location"
          className="hs-input"
          type="text"
          placeholder="Search by name or location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setLocFocus(true)}
          onBlur={() => setLocFocus(false)}
          autoComplete="off"
        />
      </div>

      {/* ── Divider ── */}
      <div className="hs-divider" aria-hidden="true" />

      {/* ── Field 2: Service ── */}
      <div className={`hs-field hs-field-service${svcFocus ? " hs-field--focus" : ""}`}>
        <select
          id="hs-service"
          className="hs-select"
          value={service}
          onChange={(e) => setService(e.target.value)}
          onFocus={() => setSvcFocus(true)}
          onBlur={() => setSvcFocus(false)}
        >
          {services.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <ChevronDown size={14} className={`hs-chevron${svcFocus ? " hs-chevron--open" : ""}`} aria-hidden="true" />
      </div>

      {/* ── Search button ── */}
      <button type="submit" className="hs-btn">
        <Search size={15} strokeWidth={2.5} aria-hidden="true" />
        <span>Find Caretakers</span>
      </button>

    </form>
  );
}
