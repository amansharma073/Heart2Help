export default function Footer() {
  return (
    <footer className="text-white pt-5 pb-3 mt-5" style={{ backgroundColor: "#1a2a4a" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <span style={{ fontSize: "1.3rem" }}>❤️</span> Heart2Help
            </h5>
            <p className="text-white-50 small">
              Connecting families with verified, compassionate caretakers for elderly care,
              childcare, and pet care — anytime, anywhere.
            </p>
          </div>

          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <li key={item} className="mb-1">
                  <a href="/" className="text-white-50 text-decoration-none hover-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Services</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-1">👴 Elderly Care</li>
              <li className="mb-1">👶 Child Care</li>
              <li className="mb-1">🐾 Pet Care</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Contact Us</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-1">📧 hello@heart2help.com</li>
              <li className="mb-1">📞 +1 (800) 555-0199</li>
              <li className="mb-1">📍 123 Care Lane, New York, NY</li>
            </ul>
            <div className="d-flex gap-3 mt-3">
              {["🐦", "📘", "📸", "💼"].map((icon, i) => (
                <a
                  key={i}
                  href="/"
                  className="text-white-50 text-decoration-none fs-5"
                  style={{ transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <p className="text-center text-white-50 small mb-0">
          © {new Date().getFullYear()} Heart2Help. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
