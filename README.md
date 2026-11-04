<div align="center">

<img src="public/assets/main-logo.jpg" alt="Unitevia Logo" width="72" height="72" style="border-radius: 12px;" />

# Unitevia

### Social Development & Community Events Platform

**Create, discover, and join meaningful community events — from winter clothing distribution to blood donation, education, healthcare, and more.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-green?style=flat-square)](https://www.better-auth.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Pages & Routes](#-pages--routes)
- [Backend API](#-backend-api)
- [Authentication](#-authentication)
- [Scripts](#-scripts)

---

## 🌟 Overview

**Unitevia** is a full-stack community engagement platform built for social development organizations, NGOs, and volunteer groups. It enables organizers to create and manage community events, and allows members to discover, join, and track impactful social initiatives across Bangladesh and beyond.

> **Live Theme:** Dark-first design with an emerald-green accent palette — purpose-built for readability and community warmth.

---

## ✨ Features

### 🏠 Home Page
- Hero section with animated statistics (1,240+ Active Members, 320+ Events Organized, 5,600+ People Helped, 28+ Communities)
- Circular category image composition (Winter Clothing, Blood Donation, Education, Green Initiatives, Community Cleanliness)
- Platform Features showcase
- Past Events Gallery with carousel
- Newsletter subscription section
- Sponsor section

### 📅 Upcoming Events
- Live event listings fetched from MongoDB via Express API
- **Past events automatically hidden** — events are filtered by exact date and time, so a 4:23 PM event disappears at 4:24 PM
- Search by title, location, category, or description
- Filter by category (Winter Relief, Donation, Education, Blood Camp, Cleanliness, Greenery, Food Drive)
- Filter by date range (This Week, This Month, Next Month)
- Sort by Newest First, Oldest First, Most Popular
- Pagination (12 items per page)
- Join event directly from listing or detail page

### 🎟️ Event Detail Page
- Full event information with hero banner image
- Volunteer count display
- Join / Cancel Join functionality with duplicate-join prevention
- Share event button
- Event status badge (Upcoming / Past)
- Initiative Organizer card

### ➕ Create Event
- Form with live validation (title, category, date, time, location, email, thumbnail URL, description)
- Future-only date/time enforcement — cannot create past events
- Creator email auto-filled from session, fully editable
- Category quick-select grid with illustrated icons
- Submits to Express backend via POST `/data-event`

### ⚙️ Manage Events
- Shows **only** events created by the currently logged-in user
- Edit event details via inline modal (PATCH `/event/:id`)
- Delete events with confirmation modal (DELETE `/event/:id`)
- Sort by Earliest / Latest
- Search and category filter
- Pagination (6 items per page)

### 🤝 Joined Events
- Shows all events the user has joined (filtered by `joinedUsers` array in DB)
- Cancel participation — removes user from `joinedUsers` via PATCH
- Download event to calendar (.ics file)
- Sort by Earliest / Latest
- Search and category filter

### 🔐 Authentication
- Email & Password sign up and login
- Google OAuth (Continue with Google)
- JWT session strategy with cookie cache
- Profile dropdown with display name, avatar, and logout
- Update Profile modal — change name and profile picture (supports file upload → base64 OR URL)
- Clicking the avatar in Update Profile modal opens file picker directly
- Protected routes — unauthenticated users are redirected to `/login`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.4.3 (App Router) |
| **Language** | TypeScript 5.x |
| **UI Library** | shadcn/ui (Base UI style "base-nova") |
| **Styling** | Tailwind CSS v4 (CSS-first, no config file) |
| **Icons** | Lucide React |
| **Auth** | Better Auth 1.7 (Email/Password + Google OAuth + JWT plugin) |
| **Database** | MongoDB (Atlas) via `@better-auth/mongo-adapter` |
| **Backend API** | Express.js (separate project, port 5000) |
| **Carousel** | Embla Carousel React |
| **Font** | Poppins (via `next/font/google`) |
| **React Compiler** | Enabled (`reactCompiler: true`) |

---

## 📁 Project Structure

```
unitevia/
├── public/
│   └── assets/              # Static images (logo, banners, event thumbnails)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/auth/        # Better Auth catch-all handler
│   │   ├── create-event/    # Create Event form page
│   │   ├── joined-events/   # User's joined events page
│   │   ├── login/           # Login page
│   │   ├── manage-events/   # Manage (edit/delete) own events
│   │   ├── sign-up/         # Sign Up page
│   │   ├── upcoming-events/ # Event listing + [id] detail page
│   │   ├── globals.css      # Tailwind v4 theme tokens & shadcn variables
│   │   ├── layout.tsx       # Root layout (Poppins font, dark HTML class)
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── ui/              # shadcn/ui generated components
│   │   ├── Navbar.tsx       # Site-wide navigation
│   │   ├── Hero.tsx         # Home hero section
│   │   ├── Features.tsx     # Platform features section
│   │   ├── Past-Events.tsx  # Past events section
│   │   ├── Past-Events-Gallery.tsx
│   │   ├── Recent-Event-Gallery.tsx
│   │   ├── Events-Carousel.tsx
│   │   ├── Profile.tsx      # Profile dropdown + Update Profile modal
│   │   ├── Footer.tsx
│   │   ├── Newsletter.tsx
│   │   ├── Sponsor.tsx
│   │   ├── Why-Choose.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── DeleteEventDetails.tsx
│   │   └── EditEventDetails.tsx
│   ├── data/
│   │   └── events.ts        # Shared event types & fallback data
│   └── lib/
│       ├── auth.ts          # Better Auth server config (MongoDB adapter)
│       ├── auth-client.ts   # Better Auth client
│       ├── getTokenfromClient.ts
│       ├── getTokenfromServer.ts
│       └── utils.ts         # cn utility re-export
├── .env                     # Environment variables (gitignored)
├── next.config.ts           # Next.js config (Turbopack, React Compiler, Tailwind)
├── components.json          # shadcn/ui config
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** (or pnpm)
- A running **MongoDB** instance (local or Atlas)
- The **Express backend** running on port `5000` (separate repo)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/unitevia.git
cd unitevia

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then fill in your values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

> ⚠️ **Backend Required:** The Express API must be running at `http://localhost:5000` for event data to load. Without it, the UI falls back to inline demo data.

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
# MongoDB connection string
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/unitevia

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-32-character-secret-key-here

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> 🔒 Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## 📄 Pages & Routes

| Route | Description | Auth Required |
|---|---|---|
| `/` | Home page | No |
| `/upcoming-events` | Browse all upcoming events | No |
| `/upcoming-events/[id]` | Event detail page | No (Join requires auth) |
| `/create-event` | Create a new community event | ✅ Yes |
| `/manage-events` | Edit / delete your events | ✅ Yes |
| `/joined-events` | View events you've joined | ✅ Yes |
| `/login` | Email & Google login | No |
| `/sign-up` | Email & Google registration | No |

---

## 🔌 Backend API

The Express backend runs at `http://localhost:5000` and connects to MongoDB database `unitevia`, collection `data-events`.

| Endpoint | Method | Description |
|---|---|---|
| `/data-event` | `POST` | Create a new event |
| `/upcoming-events` | `GET` | Fetch all events |
| `/event/:id` | `GET` | Get single event by ID (requires JWT) |
| `/event/:id` | `PATCH` | Update event fields (requires JWT) |
| `/event/:id` | `DELETE` | Delete an event (requires JWT) |
| `/` | `GET` | Health check |

> **Note:** The backend is a separate project and is **not included in this repository**. The frontend gracefully falls back to demo data when the backend is offline.

---

## 🔐 Authentication

Authentication is powered by **Better Auth** with:

- **Email/Password** — standard registration and login with password validation
- **Google OAuth** — one-click social login via Google
- **JWT plugin** — sessions use JWT strategy with cookie cache
- **MongoDB adapter** — user sessions stored in the `unitevia` database

The auth catch-all API handler is at `src/app/api/auth/[...all]/route.ts`.

Client-side session is accessible via `authClient.useSession()` from `@/lib/auth-client`.

---

## 📜 Scripts

```bash
# Start development server (Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# TypeScript type check (no emit)
npx tsc --noEmit
```

---

## 🎨 Design System

- **Font:** Poppins (Google Fonts) — `--font-sans`
- **Primary Color:** `#00d99a` (Emerald Green)
- **Background:** `#031109` (Deep Forest Dark)
- **Theme:** Dark-only (`dark` class hardcoded on `<html>`)
- **Component Library:** shadcn/ui (Base UI / base-nova style) — **not Radix UI**
- **Utility:** `cn` from the `cn` npm package

---

<div align="center">

**Built with ❤️ for community impact**

*Unitevia — Together For A Brighter Tomorrow*

</div>
  