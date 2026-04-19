import { useState, useEffect, useRef } from "react";
import {
  X, Eye, EyeOff, Mail, Lock, Briefcase,
  Loader2, CheckCircle2,
} from "lucide-react";

const validate = (email, password, specialty, role) => {
  const errs = {};
  if (!email)                           errs.email     = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errs.email     = "Enter a valid email";
  if (!password)                        errs.password  = "Password is required";
  else if (password.length < 6)         errs.password  = "At least 6 characters";
  if (role === "caretaker" && !specialty) errs.specialty = "Please select your specialty";
  return errs;
};

export default function AuthModal({ defaultRole = "user", onClose }) {
  const [role,      setRole]      = useState(defaultRole);
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [specialty, setSpecialty] = useState("");
  const [remember,  setRemember]  = useState(false);
  const [showPw,    setShowPw]    = useState(false);
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const emailRef = useRef(null);

  /* autofocus */
  useEffect(() => {
    const t = setTimeout(() => emailRef.current?.focus(), 130);
    return () => clearTimeout(t);
  }, []);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Escape to close */
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleRoleSwitch = (r) => {
    setRole(r);
    setErrors({});
    if (r === "user") setSpecialty("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(email, password, specialty, role);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 1300);
  };

  /* input state helper */
  const wrapClass = (field) =>
    `auth-input-wrap${errors[field] ? " error" : field === "email" ? (email ? " filled" : "") : field === "password" ? (password ? " filled" : "") : (specialty ? " filled" : "")}`;

  return (
    <div
      className="auth-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sign in"
    >
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="auth-close" onClick={onClose} aria-label="Close modal">
          <X size={15} />
        </button>

        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <div>
            <h3 className="auth-title">Welcome back 👋</h3>
            <p className="auth-subtitle">
              Sign in to access your dashboard and manage care easily
            </p>
          </div>
        </div>

        {/* Segmented role toggle */}
        <div className="auth-segment" role="tablist">
          <div
            className="auth-segment-pill"
            style={{ transform: role === "caretaker" ? "translateX(100%)" : "translateX(0)" }}
          />
          {[
            { id: "user",      label: "👤 User" },
            { id: "caretaker", label: "🩺 Caretaker" },
          ].map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={role === id}
              className={`auth-segment-btn${role === id ? " active" : ""}`}
              onClick={() => handleRoleSwitch(id)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Success */}
        {success ? (
          <div className="auth-success">
            <div className="auth-success-icon">
              <CheckCircle2 size={28} color="var(--green)" strokeWidth={2} />
            </div>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", margin: "0 0 4px" }}>
              Signed in successfully!
            </p>
            <p style={{ fontSize: ".82rem", margin: 0 }}>Redirecting you now…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className={`auth-field${errors.email ? " has-error" : ""}`}>
              <label className="auth-label" htmlFor="auth-email">
                Email address
              </label>
              <div className={wrapClass("email")}>
                <Mail size={15} className="auth-input-icon" />
                <input
                  ref={emailRef}
                  id="auth-email"
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`auth-field${errors.password ? " has-error" : ""}`}>
              <label className="auth-label" htmlFor="auth-password">
                Password
              </label>
              <div className={wrapClass("password")}>
                <Lock size={15} className="auth-input-icon" />
                <input
                  id="auth-password"
                  type={showPw ? "text" : "password"}
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            {/* Specialty — caretaker only */}
            {role === "caretaker" && (
              <div className={`auth-field auth-field-slide${errors.specialty ? " has-error" : ""}`}>
                <label className="auth-label" htmlFor="auth-specialty">
                  Caregiving specialty
                  <span className="auth-label-hint">Helps match you with relevant families</span>
                </label>
                <div className={wrapClass("specialty")}>
                  <Briefcase size={15} className="auth-input-icon" />
                  <select
                    id="auth-specialty"
                    className="auth-input auth-select"
                    value={specialty}
                    onChange={(e) => { setSpecialty(e.target.value); setErrors((p) => ({ ...p, specialty: "" })); }}
                  >
                    <option value="">Select your specialty</option>
                    <option value="Elderly Care">Elderly Care</option>
                    <option value="Child Care">Child Care</option>
                    <option value="Pet Care">Pet Care</option>
                  </select>
                </div>
                {errors.specialty && <span className="auth-error">{errors.specialty}</span>}
              </div>
            )}

            {/* Remember + Forgot */}
            <div className="auth-row">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`auth-submit${loading ? " loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="auth-spinner" />
                  Signing in…
                </>
              ) : (
                role === "user" ? "Sign In" : "Login as Caretaker"
              )}
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Footer */}
            <p className="auth-footer-text">
              No account?{" "}
              <a href="/" className="auth-link" onClick={(e) => e.preventDefault()}>
                {role === "caretaker" ? "Register as Caretaker" : "Create one free"}
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
