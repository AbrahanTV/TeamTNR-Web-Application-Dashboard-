# TeamTNR — Adoption Application Dashboard

> **Showcase version.** This repository is a portfolio demo of the admin dashboard built for TeamTNR, a cat rescue and adoption organization. All data displayed is fictional dummy data — no real applicant information is used or exposed.

The original project is maintained privately and connected to a live database. This public version has had all API calls removed and replaced with static dummy data so the UI can be explored freely.

---

## What It Does

TeamTNR receives adoption applications through a public-facing multi-step form. This dashboard is the internal admin tool used to manage and review those applications.

**Key features:**

- Admin dashboard with a summary of recent submissions
- Applicants table with search functionality
- Full applicant detail view covering all sections of the application:
  - Personal information
  - Household details and members
  - Pet history and preferences
  - Lifestyle and commitment
  - References
  - Signed agreement

---

## Tech Stack

**Frontend**

- React 19
- React Router 7
- Vite
- SCSS / CSS Modules

**Backend** _(not included in this repo)_

- Python / Flask
- MySQL
- Deployed on Digital Ocean

---

## Running Locally

```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173` and lands directly on the admin dashboard.

No environment variables or backend connection required — all data is served from `src/data/dummyData.js`.

---

## Project Structure

```
src/
├── components/         # Shared UI components (layout, pagination, form steps)
├── data/
│   └── dummyData.js    # All dummy data used in this showcase version
├── pages/
│   ├── AdminDashboard.jsx
│   └── Admin Pages/
│       ├── ApplicantsTable.jsx
│       ├── ApplicantDetail.jsx
│       └── ...         # Other admin table views
└── styles/             # CSS stylesheets
```

---

## Note on the Original Project

The production version of this dashboard is connected to a live MySQL database and a Flask REST API, with Google OAuth for admin authentication. This showcase version strips all of that out to allow the UI to be viewed without any backend dependency.
