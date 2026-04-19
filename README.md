# 💙 Heart2Help — Caretaker Booking Platform

A modern, premium SaaS-level UI for a caregiving platform that connects families with verified caretakers for elderly care, childcare, and pet care.

Built as a frontend portfolio project with a focus on clean UI/UX, responsive design, and polished micro-interactions.

---

## 🌐 Live Demo

> [View Live Demo](#) ← _Replace with your deployed URL (Vercel / Netlify)_

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|---|---|
| ![Light Mode](./screenshots/light.png) | ![Dark Mode](./screenshots/dark.png) |

> _Add screenshots to a `/screenshots` folder in the project root_

---

## ✨ Features

- 🌙 **Dark / Light Mode** — System preference detection + manual toggle with smooth transitions
- 🔍 **Smart Search System** — Multi-field search bar (location + service type) with focus states and animations
- 👤 **Caretaker Cards** — Rich profile cards with ratings, skills, availability badges, and hover interactions
- 📋 **Caretaker Listings Page** — Filter sidebar (category, availability, rating slider) + sort dropdown
- 👤 **Caretaker Profile Page** — Detailed profile with trust signals, reviews, schedule, and booking actions
- 🔐 **Auth Modal** — Segmented role toggle (User / Caretaker), inline validation, loading state
- 📱 **Fully Responsive** — Mobile-first layout, stacked navigation, touch-friendly inputs
- ⚡ **Micro-interactions** — Hover lifts, shimmer buttons, scroll reveal animations, skeleton loaders
- 🎨 **Premium Design System** — Consistent spacing scale, CSS custom properties, soft shadows

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI |
| **React Router v7** | Client-side routing |
| **Bootstrap 5** | Grid system and layout utilities |
| **Lucide React** | Icon library |
| **Custom CSS** | Design system, dark mode, animations |
| **JavaScript (ES6+)** | Logic, state management, hooks |

---

## 📁 Folder Structure

```
heart2help/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation + dark mode toggle + auth modal trigger
│   │   ├── AuthModal.jsx       # Login / register modal with role switcher
│   │   ├── CaretakerCard.jsx   # Reusable caretaker card component
│   │   ├── HeroSearch.jsx      # Multi-field hero search bar
│   │   └── Footer.jsx          # Footer with newsletter signup
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/light mode state + localStorage persistence
│   ├── data/
│   │   └── caretakers.js       # Mock caretaker data
│   ├── pages/
│   │   ├── Home.jsx            # Landing page (hero, stats, services, CTA)
│   │   ├── Listings.jsx        # Browse + filter caretakers
│   │   └── Profile.jsx         # Individual caretaker profile
│   ├── App.jsx                 # Root component + routes
│   ├── index.js                # Entry point + scroll reveal observer
│   └── index.css               # Global styles + design tokens + dark mode
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v16+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/heart2help.git

# 2. Navigate into the project
cd heart2help

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Highlights

- **Color System** — CSS custom properties (`--blue`, `--bg`, `--surface`, `--text`) that swap automatically in dark mode
- **Spacing Scale** — Consistent 8px base unit (`--sp-1` through `--sp-7`)
- **Animations** — `fadeUp`, `shimmer`, `pulse`, `heartBeat` keyframes for premium feel
- **Dark Mode** — `[data-theme="dark"]` on `<html>` with `localStorage` persistence and `prefers-color-scheme` auto-detection

---

## 👨‍💻 Author

**Aman Sharma**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Portfolio: [your-portfolio.com](#)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ as a frontend portfolio project
