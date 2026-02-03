# Marwin's Portfolio - Modern React Portfolio with Convex Database

<div align="center">
  <br />
  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/-Convex-FF6B00?style=for-the-badge&logo=convex&logoColor=white" alt="Convex" />
    <img src="https://img.shields.io/badge/-Radix UI-9D4EDD?style=for-the-badge" alt="Radix UI" />
  </div>
  <h3 align="center">Stunning Developer Portfolio with Database-Driven Content, Animations, and Cross-Device Sync</h3>
  <br />
</div>

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Convex Database Integration](#-convex-database-integration)
5. [Quick Start](#-quick-start)
6. [Seeding the Database](#-seeding-the-database)
7. [Deployment](#-deployment)

---

## 🚀 Introduction

A modern, fully-featured developer portfolio built with React and powered by Convex for real-time database synchronization. This portfolio features stunning animations, smooth theme transitions, and a database-driven content management system that syncs across all your devices.

**Key Highlights:**
- 🎨 Over-the-top animations and visual effects
- 🌓 Smooth light/dark mode theme transitions
- 💾 **Database-driven content** with Convex
- 📱 **Cross-device synchronization** for Hero, About, and Social sections
- ⚡ Optimized performance with GPU acceleration
- 🎯 Normalized database schema for easy content management

---

## ⚙️ Tech Stack

### Frontend
* **React** – Component-based UI development
* **Vite** – Lightning-fast build tool
* **TailwindCSS** – Utility-first CSS for styling
* **Lucide Icons** – Clean and beautiful icon pack
* **Radix UI** – Accessible component primitives
* **GSAP & Anime.js** – Advanced animations
* **tsparticles** – Dynamic particle effects

### Backend & Database
* **Convex** – Real-time database with automatic synchronization
* **TypeScript** – Type safety for database schema

### Deployment
* **Vercel** – Frontend hosting
* **Convex Cloud** – Database hosting

---

## ⚡️ Features

### 🎨 Visual & Interactive

* 🌑 **Advanced Theme Toggle**
  - Smooth View Transitions API implementation
  - Aggressive performance optimization during theme switch
  - GPU-accelerated animations
  - Persistent theme preference

* 💫 **Next-Level Animations**
  - Floating orbs with blur effects
  - Particle systems and explosions
  - Glitch text effects
  - Magnetic buttons
  - 3D card animations
  - Morphing shapes
  - Scroll-reveal animations

* 📱 **Fully Responsive**
  - Desktop and mobile optimized
  - Glassmorphism navigation
  - Touch-friendly interactions

### 💾 Database-Driven Content

* 🗄️ **Convex Integration**
  - Real-time content synchronization
  - Normalized database schema
  - Separate tables for better organization
  - Cross-device content management

* 📝 **Manageable Sections**
  - **Hero Section**: Title, subtitle, description, roles
  - **About Section**: Bio, stats, achievements
  - **Social Links**: Individual rows for each platform
  - **Projects**: Categorized portfolio items
  - **Skills**: Grouped by category
  - **Experiences**: Auto-sorted chronologically
  - **Hackathons**: Showcase competitions
  - **Certifications**: Professional credentials

### 🚀 Performance

* ⚡ **Optimized Rendering**
  - Lazy loading
  - Code splitting
  - GPU acceleration
  - Debounced animations

---

## 💾 Convex Database Integration

### Database Architecture

The portfolio uses **three separate, normalized tables** for site content:

#### 1. **`heroContent`** (Single Row)
```typescript
{
  title: string,           // "MARWIN"
  subtitle: string,        // "System Online • Welcome User"
  description: string,     // Hero paragraph
  roles: string[],         // ["Full Stack Developer", ...]
  lastUpdated: number      // Timestamp
}
```

#### 2. **`aboutContent`** (Single Row)
```typescript
{
  title: string,           // Section title
  subtitle: string,        // Section subtitle
  bio: string[],           // Array of paragraphs
  stats: {
    projects: string,
    technologies: string,
    curiosity: string
  },
  lastUpdated: number
}
```

#### 3. **`socialLinks`** (Multiple Rows - One Per Platform)
```typescript
{
  platform: string,        // "linkedin", "github", etc.
  url: string,             // Link URL
  label: string,           // Display name
  color: string,           // Hex color for icon
  order: number,           // Display order (indexed)
  isActive: boolean        // Show/hide toggle
}
```

#### 4. **`experiences`** (Auto-Sorted by Date)
```typescript
{
  title: string,
  organization: string,
  type: "employment" | "internship" | "ojt" | "student-org" | "freelance" | "volunteer",
  location: string,
  startDate: string,       // ISO format, auto-sorted newest first
  endDate?: string,
  isCurrent: boolean,
  description: string,
  responsibilities: string[],
  achievements: string[],
  logo?: string,
  color?: string,
  technologies: string[]
}
```

### Why This Architecture?

✅ **Social Links Are Individual Rows**
- Add new platform → Insert one row
- Remove link → Delete one row
- Reorder → Update `order` field
- Hide/show → Toggle `isActive`
- No nested JSON arrays to manage!

✅ **Experiences Auto-Sort**
- No manual ordering needed
- Always displays newest → oldest
- Just set `startDate` and it's automatically positioned

✅ **Single Source of Truth**
- Update once in Convex dashboard
- Changes sync to all devices instantly
- No code deployment needed for content updates

---

## 👌 Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* [Git](https://git-scm.com/)
* [Convex Account](https://convex.dev) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up Convex (first time only)
npx convex dev

# Start development server
npm run dev
```

Your app will be available at: [http://localhost:5173](http://localhost:5173)

### Environment Setup

The Convex CLI will guide you through:
1. Creating a Convex account (if needed)
2. Creating a new project
3. Linking your local code to Convex

---

## 🌱 Seeding the Database

### Initial Setup

After setting up Convex, seed your database with initial content:

```bash
# Seed site content (Hero, About, Social Links)
npx convex run seed:seedSiteContent

# Seed skills
npx convex run seed:seedSkills

# Seed experiences (optional sample data)
npx convex run experiences:seed
```

### Managing Content

#### Using Convex Dashboard (Recommended)

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Select your project
3. Navigate to **Data** tab
4. Edit any table:
   - **`heroContent`** - Edit your hero section
   - **`aboutContent`** - Update your bio
   - **`socialLinks`** - Add/remove/reorder social platforms
   - **`experiences`** - Add new jobs/internships
5. Changes sync **instantly** to your live site!

#### Adding a New Social Link

In Convex dashboard → `socialLinks` table → Click "Insert":

```javascript
{
  platform: "twitter",
  url: "https://twitter.com/yourhandle",
  label: "Twitter",
  color: "#1DA1F2",
  order: 6,
  isActive: true
}
```

No code changes needed! 🎉

#### Clearing and Reseeding

```bash
# Clear site content
npx convex run seed:clearSiteContent

# Clear experiences
npx convex run experiences:clear

# Reseed everything
npx convex run seed:seedSiteContent
npx convex run experiences:seed
```

### CLI Commands

```bash
# Development
npm run dev              # Start dev server
npx convex dev          # Start Convex in watch mode

# Database
npx convex run [function]        # Run a mutation/query
npx convex deploy               # Deploy schema changes

# Production
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## ☁️ Deployment

### Deploy Frontend on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   ```
   VITE_CONVEX_URL=your_convex_deployment_url
   ```
5. Click **Deploy**

### Deploy Database (Convex)

```bash
# Deploy to production
npx convex deploy

# Copy the production URL and add to Vercel env vars
```

Your portfolio will be live with real-time database synchronization! 🚀

---

## 📁 Project Structure

```
portfolio/
├── convex/               # Convex database functions
│   ├── schema.ts        # Database schema definitions
│   ├── siteContent.ts   # Queries for hero/about/social
│   ├── experiences.ts   # Experience queries & seed
│   ├── projects.ts      # Projects queries
│   ├── skills.ts        # Skills queries
│   ├── hackathons.ts    # Hackathon queries
│   ├── certifications.ts # Certification queries
│   └── seed.ts          # Seed functions
├── src/
│   ├── components/       # React components
│   │   ├── UltimateHeroSection.jsx
│   │   ├── EpicAboutSection.jsx
│   │   ├── EpicContactSection.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── AnimeComponents.jsx
│   │   └── BeyondComponents.jsx
│   ├── lib/             # Utilities
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
└── README.md            # This file
```

---

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize your color palette:

```css
:root {
  --primary: YOUR_COLOR;
  --secondary: YOUR_COLOR;
  --accent: YOUR_COLOR;
}
```

### Content

All content is managed through Convex:
- **Text content**: Edit in Convex dashboard
- **Projects/Skills**: Seed through mutations or dashboard
- **Images**: Use CDN URLs (e.g., Simple Icons, your hosting)

---

## 🔗 Useful Links

* [React Documentation](https://reactjs.org/)
* [Tailwind CSS Docs](https://tailwindcss.com/)
* [Convex Documentation](https://docs.convex.dev/)
* [GSAP Documentation](https://greensock.com/docs/)
* [Lucide Icons](https://lucide.dev/)
* [Radix UI](https://www.radix-ui.com/)
* [Vite](https://vitejs.dev/)
* [Vercel](https://vercel.com/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- GSAP for amazing animation capabilities
- Convex for real-time database magic
- Radix UI for accessible components
- Tailwind CSS for utility-first styling

---

Made with ❤️ by Marwin
