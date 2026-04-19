import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* ── Global scroll-reveal via IntersectionObserver ── */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  // Observe all current .reveal elements
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // Also observe dynamically added elements (React renders after mount)
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => obs.observe(el));
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}

// Run after first paint
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveal);
} else {
  initReveal();
}
