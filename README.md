# Crowd Funding & Social Awareness Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> **Live NGO Platform designed to showcase social initiatives, manage public crowdfunding programs, and streamline volunteer & child adoption participation.**

---

## 🌟 Key Highlights & Capabilities

- **Responsive NGO Platform**: Built to showcase vital social initiatives, ongoing welfare programs, and direct public participation workflows.
- **Multi-Page Navigation (Home, About, Programs, Education, Gallery, Join Us)**: Clean, intuitive navigation structure with responsive design, dynamic active states, and mobile drawers improving content accessibility and UX.
- **Integrated REST APIs**: Engineered scalable RESTful services using **Node.js** and **Express.js** with robust controllers and route modularization.
- **PostgreSQL Database Management**: Structured data persistence for active campaigns, donation transactions, volunteer signups, adoption inquiries, and newsletter subscribers (with automatic resilient fallback for testing).
- **Interactive Crowdfunding Flow**: Modal-based donation experience featuring preset/custom amounts, program selection, encrypted transactions, and live progress bars comparing amounts raised against targets.

---

## 🛠️ Tech Stack & Architecture

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Vite, Lucide Icons, Modern Responsive CSS |
| **Backend** | Node.js, Express.js, CORS, Morgan |
| **Database** | PostgreSQL, `pg` (node-postgres connection pooling), `schema.sql` |
| **Containerization** | Docker Compose (automated PostgreSQL container & seed execution) |

---

## 📁 Repository Structure

```
Crowd Funding/
├── client/                     # React.js frontend application (Vite)
│   ├── public/                 # Static assets (images, video, logo)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, DonationModal, etc.
│   │   ├── pages/              # Home, About, Programs, Education, Gallery, JoinUs
│   │   ├── services/           # api.js (REST API integration layer)
│   │   ├── App.jsx             # Router definition
│   │   ├── index.css           # Modern design system & components
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js + Express.js backend REST API
│   ├── config/                 # db.js (PostgreSQL pool & resilient fallback)
│   ├── db/                     # schema.sql (PostgreSQL tables and seed data)
│   ├── controllers/            # Business logic (programs, donations, volunteers)
│   ├── routes/                 # Express API route endpoints
│   ├── index.js                # Server entrypoint & middleware
│   └── package.json
├── docker-compose.yml          # PostgreSQL container definition
├── package.json                # Root automation scripts (concurrent execution)
└── README.md
```

---

## 🚀 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/programs` | Retrieve all initiatives (supports `?category=` and `?featured=`) |
| `GET` | `/api/programs/stats` | Fetch aggregate platform metrics (funds raised, donors count, etc.) |
| `GET` | `/api/programs/:id` | Fetch specific program details |
| `POST` | `/api/donations` | Record a new contribution and update program progress |
| `GET` | `/api/donations/recent` | Retrieve latest public contributions feed |
| `POST` | `/api/volunteers/register` | Submit volunteer application with area of interest |
| `POST` | `/api/volunteers/adopt` | Submit confidential child adoption inquiry |
| `POST` | `/api/feedback/newsletter` | Register user email for quarterly impact reports |
| `GET` | `/api/health` | Service uptime and health monitoring |

---

## 💻 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18+)
- **NPM** (v9+)
- *(Optional)* **Docker** or **PostgreSQL** (if running local database)

### 2. Install Dependencies
Install packages for both the server and the client:
```bash
# From the repository root
npm run install:all
```
*Or individually:*
```bash
cd server && npm install
cd ../client && npm install
```

### 3. (Optional) Run PostgreSQL via Docker
```bash
docker-compose up -d
```
The database will automatically initialize using `server/db/schema.sql`.

### 4. Start the Full-Stack Application
Run both the backend API and frontend development server concurrently:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5001`

---

## 👥 Contributors & Academic Credits

- **Vaibhav Kumar** (Full-Stack Engineer - React, Node.js, Express, PostgreSQL)
- **Khushi** (Portfolio Documentation & Research)
- **Ishanth** (UX & User Flow Testing)
