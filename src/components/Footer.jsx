import { Heart } from "lucide-react";

const socials = [
  { icon: "𝕏",  label: "Twitter" },
  { icon: "f",  label: "Facebook" },
  { icon: "in", label: "LinkedIn" },
  { icon: "▶",  label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="h2h-footer">
      <div className="container">
        <div className="footer-divider" />

        <div className="row g-5 mb-5">
          {/* Brand */}
          <div className="col-lg-4">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: ".85rem" }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart size={14} fill="#fff" color="#fff" />
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>Heart2Help</span>
            </div>
            <p style={{ fontSize: ".875rem", lineHeight: 1.75, maxWidth: "260px", marginBottom: "1.25rem" }}>
              Connecting families with verified, compassionate caretakers for elderly care, childcare, and pet care.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon, label }) => (
                <a key={label} href="/" className="social-btn" title={label} aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="col-6 col-lg-2">
            <p style={{ color: "#fff", fontWeight: 700, fontSize: ".875rem", marginBottom: "1rem" }}>Platform</p>
            {["Home", "Services", "About Us", "Pricing", "Blog"].map((l) => (
              <a key={l} href="/" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Services */}
          <div className="col-6 col-lg-2">
            <p style={{ color: "#fff", fontWeight: 700, fontSize: ".875rem", marginBottom: "1rem" }}>Services</p>
            {["Elderly Care", "Child Care", "Pet Care", "Become a Caretaker"].map((l) => (
              <a key={l} href="/" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="col-lg-4">
            <p style={{ color: "#fff", fontWeight: 700, fontSize: ".875rem", marginBottom: "1rem" }}>Stay Updated</p>
            <p style={{ fontSize: ".875rem", marginBottom: ".85rem" }}>
              Get tips on finding the best care for your family.
            </p>
            <div className="newsletter-wrap">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                style={{ height: "46px" }}
              />
              <button className="newsletter-btn" style={{ height: "46px" }}>Subscribe</button>
            </div>
            <p style={{ fontSize: ".75rem", marginTop: ".5rem", color: "#475569" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,.06)",
          paddingTop: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: ".5rem",
          alignItems: "center",
        }}>
          <p style={{ fontSize: ".8rem", margin: 0 }}>
            © {new Date().getFullYear()} Heart2Help. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="/" className="footer-link" style={{ display: "inline", marginBottom: 0, fontSize: ".8rem" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
