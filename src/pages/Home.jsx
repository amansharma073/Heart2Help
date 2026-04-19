import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCheck, Baby, PawPrint, Search, CalendarCheck,
  HeartHandshake, ShieldCheck, Star, ArrowRight,
  Users, Smile, Headphones, CheckCircle, Zap,
} from "lucide-react";
import CaretakerCard from "../components/CaretakerCard";
import HeroSearch from "../components/HeroSearch";
import caretakers from "../data/caretakers";

/* ── Data ── */
const categories = [
  {
    Icon: UserCheck, label: "Elderly Care",
    desc: "Compassionate in-home support for seniors",
    iconBg: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    cardBg: "#f8faff", border: "#dbeafe",
  },
  {
    Icon: Baby, label: "Child Care",
    desc: "Safe, nurturing care for your little ones",
    iconBg: "linear-gradient(135deg,#db2777,#be185d)",
    cardBg: "#fff7fb", border: "#fce7f3",
  },
  {
    Icon: PawPrint, label: "Pet Care",
    desc: "Loving care for your furry family members",
    iconBg: "linear-gradient(135deg,#16a34a,#15803d)",
    cardBg: "#f7fdf9", border: "#dcfce7",
  },
];

const steps = [
  { Icon: Search,         num: "01", title: "Search", desc: "Enter your location and the type of care you need.", active: true },
  { Icon: UserCheck,      num: "02", title: "Choose", desc: "Browse verified profiles, ratings, and reviews." },
  { Icon: CalendarCheck,  num: "03", title: "Book",   desc: "Schedule a session directly with your caretaker." },
  { Icon: HeartHandshake, num: "04", title: "Relax",  desc: "Enjoy peace of mind knowing your family is cared for." },
];

const stats = [
  { Icon: Users,      value: "2,500+",  label: "Verified Caretakers", sub: "Across 50+ cities" },
  { Icon: Smile,      value: "15,000+", label: "Happy Families",      sub: "Trusted globally" },
  { Icon: Star,       value: "4.9★",    label: "Average Rating",      sub: "From real reviews" },
  { Icon: Headphones, value: "24/7",    label: "Support",             sub: "Always available" },
];

const trustItems = [
  { Icon: ShieldCheck, label: "Background verified" },
  { Icon: CheckCircle, label: "24/7 support" },
  { Icon: Star,        label: "Top-rated pros" },
];

export default function Home() {
  const featured = caretakers.filter((c) => c.available).slice(0, 3);
  const [cardsLoading, setCardsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setCardsLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">

            {/* Left */}
            <div className="col-lg-6">
              <div className="trust-badge fade-up">
                <span className="pulse-dot" />
                Trusted by 15,000+ families worldwide
              </div>

              <h1 className="text-white fade-up fade-up-1" style={{ marginBottom: "1rem" }}>
                Find Trusted Care,{" "}
                <span style={{ color: "#93c5fd" }}>Anytime</span>
              </h1>

              <p className="fade-up fade-up-2" style={{
                color: "rgba(255,255,255,.72)",
                fontSize: "clamp(.95rem,2vw,1.1rem)",
                maxWidth: "460px", marginBottom: "2rem",
              }}>
                Connect with background-verified caretakers for elderly care,
                childcare, and pet care — all in one trusted platform.
              </p>

              {/* Premium search bar — glass wrapper */}
              <div className="hero-search-glass fade-up fade-up-3" style={{ marginBottom: "1.5rem" }}>
                <HeroSearch />
              </div>

              {/* Trust signals */}
              <div className="trust-row fade-up fade-up-4">
                {trustItems.map(({ Icon, label }) => (
                  <span key={label} className="trust-item">
                    <Icon size={13} color="#4ade80" /> {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — preview card */}
            <div className="col-lg-6 d-none d-lg-block fade-up fade-up-2">
              <div className="hero-preview-card" style={{ maxWidth: "360px", marginLeft: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <p style={{ color: "rgba(255,255,255,.55)", fontSize: ".75rem", margin: 0 }}>Available now</p>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem", margin: 0 }}>Top Caretakers Near You</p>
                  </div>
                  <span style={{ background: "rgba(74,222,128,.15)", color: "#4ade80", borderRadius: "50px", padding: "2px 9px", fontSize: ".7rem", fontWeight: 700 }}>
                    ● Live
                  </span>
                </div>

                {caretakers.slice(0, 3).map((c) => (
                  <div key={c.id} className="hero-mini-row" style={{ marginBottom: "7px" }}>
                    <img src={c.image} alt={c.name} className="hero-avatar" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: ".83rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</p>
                      <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".73rem", margin: 0 }}>{c.category} · {c.rating}★</p>
                    </div>
                    <span style={{
                      background: c.available ? "rgba(74,222,128,.15)" : "rgba(248,113,113,.15)",
                      color: c.available ? "#4ade80" : "#f87171",
                      borderRadius: "50px", padding: "2px 8px", fontSize: ".68rem", fontWeight: 700, flexShrink: 0,
                    }}>
                      {c.available ? "Free" : "Busy"}
                    </span>
                  </div>
                ))}

                <div style={{ display: "flex", gap: "6px", marginTop: ".85rem" }}>
                  {[{ v: "2.5k+", l: "Caretakers" }, { v: "4.9★", l: "Rating" }, { v: "24/7", l: "Support" }].map(({ v, l }) => (
                    <div key={l} style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: "10px", padding: ".55rem", textAlign: "center" }}>
                      <p style={{ color: "#fff", fontWeight: 800, fontSize: ".85rem", margin: 0 }}>{v}</p>
                      <p style={{ color: "rgba(255,255,255,.45)", fontSize: ".68rem", margin: 0 }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div className="stats-bar reveal">
        <div className="container">
          <div className="row g-3 text-center">
            {stats.map(({ Icon, value, label, sub }) => (
              <div className="col-6 col-md-3" key={label}>
                <div className="stat-item">
                  <div className="stat-num">{value}</div>
                  <div className="stat-label">{label}</div>
                  <div className="stat-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section className="section-pad section-surface">
        <div className="container">
          <div className="section-head centered reveal">
            <span className="section-label">✦ Our Services</span>
            <h2>Care for Every Need</h2>
            <p>Choose the type of care that fits your family's unique needs</p>
          </div>
          <div className="row g-4">
            {categories.map(({ Icon, label, desc, iconBg }, i) => (
              <div className={`col-md-4 reveal reveal-d${i + 1}`} key={label}>
                <Link to={`/listings?service=${label}`} className={`service-card service-card--${label.toLowerCase().replace(" ", "-")}`}>
                  <div className="service-icon-wrap" style={{ background: iconBg }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  <h5>{label}</h5>
                  <p>{desc}</p>
                  <span className="btn-browse">
                    Browse caretakers <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section-pad" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head centered reveal">
            <span className="section-label">✦ How It Works</span>
            <h2>Simple. Fast. Trusted.</h2>
            <p>Get started in minutes — no complicated setup required</p>
          </div>
          <div className="steps-row reveal">
            {steps.map(({ Icon, num, title, desc, active }, i) => (
              <div className="steps-row-item" key={num}>
                <div className={`step-card${active ? " step-active" : ""}`}>
                  <span className="step-num-badge">{num}</span>
                  <div className="step-icon-wrap">
                    <Icon size={28} color={active ? "#fff" : "#2563eb"} />
                  </div>
                  <h5 style={{ marginBottom: ".35rem" }}>{title}</h5>
                  <p style={{ fontSize: ".875rem", margin: 0 }}>{desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="step-connector-arrow">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED CARETAKERS ══ */}
      <section className="section-pad section-surface">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3 reveal">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="section-label">✦ Top Rated</span>
              <h2>Featured Caretakers</h2>
            </div>
            <Link to="/listings" style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--blue)", fontWeight: 700, textDecoration: "none", fontSize: ".9rem" }}>
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="row g-4">
            {(cardsLoading ? [1, 2, 3] : featured).map((item, i) => (
              <div className={`col-md-4 reveal reveal-d${i + 1}`} key={cardsLoading ? item : item.id}>
                <CaretakerCard caretaker={cardsLoading ? null : item} loading={cardsLoading} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section-pad">
        <div className="container">
          <div className="cta-section reveal">
            <div className="cta-glow cta-glow-1" />
            <div className="cta-glow cta-glow-2" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="section-label" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>
                <ShieldCheck size={12} /> Trusted by 15,000+ families
              </span>
              <h2 style={{ color: "#fff", marginTop: ".75rem", marginBottom: ".75rem" }}>
                Ready to find the perfect caretaker?
              </h2>
              <p style={{ color: "rgba(255,255,255,.7)", maxWidth: "420px", margin: "0 auto 2rem", fontSize: "1rem" }}>
                Join thousands of families who trust Heart2Help every single day.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/listings" className="btn-cta-primary">Browse Caretakers</Link>
                <Link to="/about" className="btn-cta-outline">Become a Caretaker</Link>
              </div>
              <p className="urgency-text justify-content-center">
                <Zap size={13} color="#fbbf24" /> Start in under 2 minutes · No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
