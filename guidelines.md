# Project Guidelines - Marwin's Portfolio

> **Purpose**: This file serves as a comprehensive reference for AI assistants to understand the project context, architecture, and preferences for future sessions.

---

## 📋 Project Information

| Field | Value |
|-------|-------|
| **Project Name** | Marwin's Portfolio |
| **Package Name** | `beautiful-portfolio` |
| **Owner** | Marwin John Gonzales |
| **Location** | `c:\Users\Maru\Documents\Portfolios\Main\Portfolio` |
| **Type** | Personal Developer Portfolio Website |
| **Framework** | React + Vite |
| **Database** | Convex (Real-time cloud database) |

---

## 🎯 Project Purpose

This is a **personal developer portfolio website** for showcasing:
- Professional experiences (jobs, internships, OJT, student orgs)
- Projects and hackathon participations
- Skills and certifications
- Personal bio and contact information

The portfolio features **premium, over-the-top animations** and a **database-driven content management system** that syncs across devices (PC and mobile).

---

## ⚙️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.3.1 | UI Framework |
| Vite | ^5.3.4 | Build tool |
| TailwindCSS | ^4.1.4 | Styling (v4 with `@theme` syntax) |
| GSAP | ^3.14.2 | Advanced animations |
| Anime.js | ^3.2.2 | Additional animations |
| Framer Motion | ^12.29.2 | React animations |
| Lenis | ^1.3.17 | Smooth scrolling |
| tsparticles | ^3.9.1 | Particle effects |
| Lucide React | ^0.501.0 | Icons |
| Radix UI | (toast) | Accessible components |
| React Router DOM | ^7.5.1 | Client-side routing |

### Backend/Database
| Technology | Version | Purpose |
|------------|---------|---------|
| Convex | ^1.31.6 | Real-time database |

### Styling Utilities
- `clsx` + `tailwind-merge` via `@/lib/utils` for class name manipulation
- `class-variance-authority` for component variants

---

## 📁 Project Structure

```
Portfolio/
├── convex/                      # Convex database functions
│   ├── _generated/             # Auto-generated types (DO NOT EDIT)
│   ├── schema.ts               # Database schema definitions
│   ├── siteContent.ts          # Hero, About, Social queries
│   ├── experiences.ts          # Experience queries & seed
│   ├── projects.ts             # Projects queries
│   ├── skills.ts               # Skills queries
│   ├── hackathons.ts           # Hackathon queries & seed
│   ├── certifications.ts       # Certification queries
│   └── seed.ts                 # General seed functions
│
├── src/
│   ├── components/              # React components
│   │   ├── UltimateHeroSection.jsx    # Main hero (DB-driven)
│   │   ├── EpicAboutSection.jsx       # About section (DB-driven)
│   │   ├── EpicContactSection.jsx     # Contact form + Social (DB-driven)
│   │   ├── EpicSkillsSection.jsx      # Skills grid (DB-driven)
│   │   ├── ProjectsSection.jsx        # Projects showcase (DB-driven)
│   │   ├── ExperienceSection.jsx      # Experience timeline (DB-driven)
│   │   ├── CertificationsSection.jsx  # Certifications (DB-driven)
│   │   ├── ThemeToggle.jsx            # Light/dark mode toggle
│   │   ├── Navbar.jsx                 # Navigation bar
│   │   ├── CustomCursor.jsx           # Custom cursor effect
│   │   ├── UltimateBackground.jsx     # Animated background + particles
│   │   ├── AnimeComponents.jsx        # Reusable animation components
│   │   ├── BeyondComponents.jsx       # Advanced effects (particles, glitch)
│   │   ├── BeyondLoadingScreen.jsx    # Loading screen
│   │   ├── hackathon/                 # Hackathon-specific components
│   │   ├── projects/                  # Project-specific components
│   │   └── ui/                        # Shadcn-style UI components
│   │
│   ├── pages/
│   │   ├── Home.jsx              # Main landing page
│   │   ├── AllProjects.jsx       # Full projects archive
│   │   ├── AllExperiences.jsx    # Full experience archive
│   │   ├── AllCertifications.jsx # Full certifications archive
│   │   └── NotFound.jsx          # 404 page
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── use-toast.js          # Toast notifications
│   │
│   ├── lib/
│   │   └── utils.js              # cn() utility function
│   │
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point with ConvexProvider
│   └── index.css                 # Global styles + TailwindCSS config
│
├── public/                       # Static assets
├── index.html                    # HTML entry
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

---

## 🗄️ Database Schema (Convex)

### Tables Overview

| Table | Type | Description |
|-------|------|-------------|
| `heroContent` | Single row | Hero section title, subtitle, description, roles |
| `aboutContent` | Single row | About bio, stats |
| `socialLinks` | Multiple rows | Individual social platform links |
| `projects` | Multiple rows | Portfolio projects |
| `skills` | Multiple rows | Technical skills by category |
| `experiences` | Multiple rows | Work experience (auto-sorted by date) |
| `hackathons` | Multiple rows | Hackathon participations |
| `certifications` | Multiple rows | Professional certifications |

### Key Design Decisions

1. **Normalized Social Links**: Each platform is a separate row (not nested array)
   - Easy to add/remove/reorder individual links
   - `isActive` field to show/hide without deleting

2. **Experiences Auto-Sort**: Sorted by `startDate` descending (newest first)
   - No manual `order` field needed
   - Just set `startDate` and it positions automatically

3. **DB-Driven Content**: Hero, About, and Social sections pull from Convex
   - Components have fallback defaults if DB is empty
   - Changes in Convex dashboard reflect instantly

### Import Pattern for Components

```jsx
// Correct way to import Convex API in components
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Usage
const data = useQuery(api.siteContent.getHeroContent);
```

> ⚠️ **Important**: Use relative path `../../convex/_generated/api`, NOT `@/convex/...`
> The `@/` alias points to `src/`, but `convex/` is at project root.

---

## 🎨 Design Patterns & Preferences

### Animation Philosophy
- **Premium, over-the-top animations** are desired
- Use GSAP for complex animations
- Use Anime.js for specific effects
- Particles and floating orbs enhance background
- Smooth theme transitions are critical

### Theme Transition Optimization
The theme toggle implements aggressive optimization:
1. Pauses all GSAP animations globally during switch
2. Adds `.theme-transitioning` class to disable heavy effects
3. Hides particles, removes blurs/shadows temporarily
4. Resumes after 50ms delay

### Component Naming Convention
- `Ultimate*` - Most enhanced version (e.g., `UltimateHeroSection`)
- `Epic*` - Enhanced version with animations
- `Beyond*` - Advanced effects components
- Regular names - Base components

### CSS Approach
- TailwindCSS v4 with `@theme` directive
- Custom CSS variables for theming
- Glassmorphism effects with `backdrop-blur`
- Custom scrollbar styling
- GPU acceleration with `will-change` and `transform: translateZ(0)`

---

## 🔧 Important Commands

### Development
```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
npx convex dev           # Start Convex in watch mode (runs alongside dev)
```

### Database Operations
```bash
# Deploy schema changes
npx convex dev --once

# Seed commands
npx convex run seed:seedSiteContent      # Seed hero, about, social
npx convex run seed:seedSkills           # Seed skills
npx convex run experiences:seed          # Seed experiences
npx convex run hackathons:seed           # Seed hackathons
npx convex run projects:seed             # Seed projects

# Clear commands
npx convex run seed:clearSiteContent
npx convex run experiences:clear
npx convex run skills:clearSkills
```

### Production
```bash
npm run build            # Build for production
npm run preview          # Preview production build
npx convex deploy        # Deploy Convex to production
```

---

## 🔄 Typical Development Workflow

1. **Start Dev Environment**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2 (optional, for schema changes)
   npx convex dev
   ```

2. **Editing Content**
   - Go to [dashboard.convex.dev](https://dashboard.convex.dev)
   - Edit tables directly
   - Changes sync instantly

3. **Schema Changes**
   - Edit `convex/schema.ts`
   - Run `npx convex dev --once` to push
   - If data conflicts, clear table first

4. **Adding New Features**
   - Components go in `src/components/`
   - Pages go in `src/pages/`
   - New routes added in `src/App.jsx`
   - Database queries in `convex/`

---

## ⚠️ Known Gotchas & Solutions

### 1. Convex Import Path
**Wrong**: `import { api } from "@/convex/_generated/api"`
**Right**: `import { api } from "../../convex/_generated/api"`

### 2. Theme Transition Lag
If theme toggle is laggy, check that:
- `ThemeToggle.jsx` pauses GSAP animations
- `.theme-transitioning` CSS rules are in `index.css`
- Heavy blur effects are disabled during transition

### 3. Schema Validation Failed
If `npx convex dev --once` fails with schema validation:
- Clear the affected table first: `npx convex run [table]:clear`
- Then retry the schema push

### 4. TailwindCSS v4 Linter Warnings
Warnings about `@theme`, `@apply`, `@utility` are expected - these are v4 syntax that ESLint doesn't recognize. They still work.

---

## 📍 Key Files Quick Reference

| For... | Look at... |
|--------|------------|
| Database schema | `convex/schema.ts` |
| Site content queries | `convex/siteContent.ts` |
| Hero section | `src/components/UltimateHeroSection.jsx` |
| About section | `src/components/EpicAboutSection.jsx` |
| Contact/Social | `src/components/EpicContactSection.jsx` |
| Theme toggle | `src/components/ThemeToggle.jsx` |
| Global styles | `src/index.css` |
| Routes | `src/App.jsx` |
| Home page layout | `src/pages/Home.jsx` |

---

## 🎯 User Preferences

1. **Aesthetics**: Premium, visually stunning, over-the-top animations
2. **Performance**: Smooth 60fps, no lag on theme transitions
3. **Database Design**: Normalized tables, auto-sorting by date
4. **Content Management**: Real-time sync via Convex dashboard
5. **Cross-device**: Content syncs between PC and mobile
6. **Documentation**: Consolidated in single README.md

---

## 📝 Recent Changes (Session History)

### Theme Transition Optimization
- Implemented View Transitions API
- Added aggressive optimization during theme switch
- Pauses GSAP, hides particles, removes blurs temporarily

### Convex Database Integration
- Added `heroContent`, `aboutContent`, `socialLinks` tables
- Normalized social links (one row per platform)
- Components fetch from DB with fallback defaults

### Experience Table Refactor
- Removed manual `order` field
- Added `by_startDate` index for auto-sorting
- Experiences now display newest → oldest automatically

---

## 🤖 AI Assistant Notes

When working on this project:

1. **Check guidelines.md first** for context
2. **Use relative imports** for Convex API
3. **Premium animations** are expected and appreciated
4. **Convex dashboard** is the primary way user edits content
5. **Performance matters** - always consider animation impact
6. **Test theme toggle** after making animation changes
7. **User runs Windows** - PowerShell commands

---

*Last Updated: 2026-02-03*
