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

   ## � Data Architecture

   ### Data Storage Strategy

   | Data Type | Storage | Why |
   |-----------|---------|-----|
   | **Static Portfolio Content** | JSON files (`src/data/`) | Version controlled, faster loads, easier editing |
   | **Dynamic User Content** | Convex Database | Real-time updates, CRUD operations, moderation |

   ### JSON Data Files (Static Content)

   | File | Content | Structure |
   |------|---------|-----------|
   | `experiences.json` | Work history, internships, OJT | Array of 10 LinkedIn experiences |
   | `certifications.json` | Professional certificates | Array of 23 LinkedIn Learning certs |
   | `skills.json` | Technical skills by category | Array grouped by category |
   | `projects.json` | Portfolio projects | Array (ready for future projects) |
   | `hackathons.json` | Hackathon participations | Array (ready for hackathon projects) |
   | `siteContent.json` | Hero, About, Social links | Object with sections |

   **Editing JSON Data:**
   ```bash
   # Simply edit the JSON files directly
   code src/data/experiences.json
   code src/data/skills.json
   # Changes reflect immediately on save (Vite HMR)
   ```

   **JSON Import Pattern:**
   ```jsx
   import experiencesData from "@/data/experiences.json";
   import skillsData from "@/data/skills.json";
   import siteContent from "@/data/siteContent.json";

   const experiences = experiencesData.experiences;
   const heroContent = siteContent.hero;
   ```

   ### Convex Database (Dynamic Content)

   **Current Tables:**

   | Table | Purpose | Operations |
   |-------|---------|------------|
   | `comments` | Guestbook/comment system | CRUD with moderation |

   **Schema** (`convex/schema.ts`):
   ```javascript
   comments: defineTable({
     name: v.string(),
     email: v.optional(v.string()),
     website: v.optional(v.string()),
     message: v.string(),
     isApproved: v.boolean(),
     createdAt: v.number(),
   })
   ```

   **Convex Import Pattern:**
   ```jsx
   import { useQuery, useMutation } from "convex/react";
   import { api } from "../../convex/_generated/api";

   // Read data
   const comments = useQuery(api.comments.list);
   
   // Write data
   const createComment = useMutation(api.comments.create);
   const updateComment = useMutation(api.comments.update);
   const deleteComment = useMutation(api.comments.remove);
   ```

   > ⚠️ **Important**: Use relative path `../../convex/_generated/api`, NOT `@/convex/...`
   > The `@/` alias points to `src/`, but `convex/` is at project root.

   ### Data Flow Diagram

   ```
   ┌─────────────────────────────────────────────────────────┐
   │                     PORTFOLIO APP                        │
   ├─────────────────────────────────────────────────────────┤
   │                                                           │
   │  ┌──────────────────┐         ┌──────────────────┐     │
   │  │  Static Content  │         │ Dynamic Content  │     │
   │  │  (JSON Files)    │         │  (Convex DB)     │     │
   │  └──────────────────┘         └──────────────────┘     │
   │           │                            │                │
   │           ├─ Experiences               ├─ Comments      │
   │           ├─ Certifications            └─ Guestbook     │
   │           ├─ Skills                                      │
   │           ├─ Projects (future)                          │
   │           ├─ Hackathons (future)                        │
   │           └─ Site Content (hero, about, social)         │
   │                                                           │
   │  ┌─────────────────────────────────────────────────┐   │
   │  │              React Components                    │   │
   │  │  ┌─────────────┐  ┌──────────────────────────┐ │   │
   │  │  │ Hero        │  │ Guestbook                 │ │   │
   │  │  │ About       │  │ (Convex mutations)        │ │   │
   │  │  │ Skills      │  └──────────────────────────┘ │   │
   │  │  │ Experience  │                                │   │
   │  │  │ Certs       │                                │   │
   │  │  │ (JSON)      │                                │   │
   │  │  └─────────────┘                                │   │
   │  └─────────────────────────────────────────────────┘   │
   └─────────────────────────────────────────────────────────┘
   ```

   ---

   ## 🎨 UI/UX Design System

   ### Color Palette

   | Element | Light Mode | Dark Mode |
   |---------|------------|-----------|
   | **Background** | `hsl(0, 0%, 98%)` | `hsl(0, 0%, 4%)` |
   | **Foreground** | `hsl(0, 0%, 10%)` | `hsl(0, 0%, 91%)` |
   | **Card** | `hsl(0, 0%, 100%)` | `hsl(0, 0%, 8%)` |
   | **Primary** | `hsl(0, 85%, 50%)` | `hsl(0, 85%, 55%)` |
   | **Border** | `hsl(0, 0%, 88%)` | `hsl(0, 0%, 18%)` |

   **Primary Color:** Red (`#dc2626`, `#ef4444`) - Used for accents, glows, and interactive elements.

   ### Typography
   - **Font Smoothing:** `-webkit-font-smoothing: antialiased`
   - **Text Rendering:** `optimizeLegibility`
   - **Feature Settings:** `"rlig" 1, "calt" 1` (ligatures enabled)

   ### Component Library

   #### UI Components (Shadcn-style)
   - **Toast Notifications** (`src/components/ui/toast.jsx`)
     - Built on Radix UI Toast
     - Variants: `default`, `destructive`
     - Features: swipe to dismiss, auto-dismiss timing
     - Hook: `useToast()` from `src/hooks/use-toast.js`

   #### Reusable Animation Components

   **AnimeComponents.jsx**
   - `<Anime3DCard>` - 3D tilt card with cursor-following glow
     - Props: `glowColor`, `intensity`, `className`
     - Features: Mouse-move tilt, shine effect, spring animations
   
   - `<AnimatedButton>` - Button with ripple and scale effects
   
   - `<FloatingOrb>` - Animated floating sphere
   
   - `<ScrollReveal>` - Intersection Observer-based reveal animations

   **BeyondComponents.jsx**
   - `<ParticleExplosion>` - Click-triggered particle burst
     - 30 particles per click
     - Random colors: red spectrum + white
   
   - `<GlitchText>` - Text with periodic glitch effect
   
   - `<HolographicCard>` - Card with holographic shimmer
   
   - `<MagneticButton>` - Button that follows cursor when nearby

   #### Section Components
   - **Hero:** `UltimateHeroSection.jsx` (DB-driven, premium animations)
   - **About:** `EpicAboutSection.jsx` (DB-driven, stat counters)
   - **Skills:** `EpicSkillsSection.jsx` (DB-driven, category grid)
   - **Projects:** `ProjectsSection.jsx` (DB-driven, carousel)
   - **Hackathons:** `HackathonSection.jsx` (DB-driven, spotlight)
   - **Experience:** `ExperienceSection.jsx` (JSON-driven, timeline)
   - **Certifications:** `CertificationsSection.jsx` (JSON-driven, grid)
   - **Guestbook:** `GuestbookSection.jsx` (DB-driven, CRUD operations)
   - **Contact:** `EpicContactSection.jsx` (DB-driven social links)

   #### Specialized Components

   **Hackathon Components** (`src/components/hackathon/`)
   - `HackathonCard.jsx` - Individual hackathon card
   - `HackathonCarousel.jsx` - Swipeable carousel
   - `HackathonArchive.jsx` - Full archive with filtering
   - `ProjectSpotlight.jsx` - Featured project showcase

   **Project Components** (`src/components/projects/`)
   - `ProjectCard.jsx` - Individual project card
   - `ProjectCarousel.jsx` - Project slider
   - `ProjectShowcase.jsx` - Enhanced project display

   **Background & Effects**
   - `UltimateBackground.jsx` - tsparticles + gradient orbs
   - `CustomCursor.jsx` - Custom cursor with trail effect
   - `BeyondLoadingScreen.jsx` - Premium loading animation
   - `Navbar.jsx` - Scroll-responsive nav with glassmorphism

   ### CSS Utility Classes

   #### Layout & Containers
   ```css
   .container       /* Responsive max-width container (640px → 1400px) */
   ```

   #### Glassmorphism Effects
   ```css
   .glass           /* Frosted glass: bg-white/5 + backdrop-blur-10px */
   .glass-panel     /* Common pattern in components */
   backdrop-blur-sm /* Tailwind: 4px blur */
   backdrop-blur-md /* Tailwind: 12px blur */
   backdrop-blur-xl /* Tailwind: 24px blur */
   ```

   #### Buttons & Interactive
   ```css
   .cosmic-button   /* Primary button: rounded-full, red glow, scale on hover */
   .press-effect    /* Scale down to 0.96 on active */
   .hover-lift      /* Lift up 4px on hover with elastic easing */
   .hover-elastic   /* Scale 1.05 on hover, 0.95 on active (elastic) */
   ```

   #### Text Effects
   ```css
   .text-glow       /* Red text shadow glow */
   .glow-text       /* Multi-layer red glow (10px → 80px) */
   .hover-glow      /* Apply glow on hover */
   .animated-underline /* Animated red underline on hover */
   ```

   #### Card Effects
   ```css
   .gradient-border /* Animated gradient border (via ::before pseudo) */
   .tilt-card       /* 3D perspective tilt on hover */
   .card-hover      /* Scale 1.02 + shadow on hover */
   .hover-lift      /* Lift 5px + red shadow on hover */
   ```

   #### Animations
   ```css
   /* Keyframe Animations */
   .float-3d        /* 3D floating with Y + Z translation */
   .neon-border     /* Pulsing red neon border (2s loop) */
   .pulse-glow      /* Pulsing box-shadow + scale */
   .shimmer         /* Sliding shine effect */
   .glitch          /* Glitch shake on hover */
   .pulse-dot       /* Pulsing dot with scale + shadow */
   .skeleton-loading /* Loading shimmer effect */
   .selected-glow   /* Pulsing glow for selected cards */

   /* Reveal Animations */
   .reveal-up       /* Fade in from bottom (0.8s) */
   .stagger-children /* Auto-stagger child reveals (0.1s increments) */
   .accent-line-animated /* Line grow from 0 → 100% width */

   /* Page Transitions */
   .page-transition-enter       /* Fade in from bottom */
   .page-transition-enter-active
   .page-transition-exit        /* Fade out to top */
   .page-transition-exit-active
   ```

   #### Performance & Optimization
   ```css
   .gpu-accelerated /* translateZ(0) + will-change + backface-visibility */
   .grain::after    /* Subtle noise overlay (3% opacity) */
   ```

   #### Theme Transition Optimization
   ```css
   .theme-transitioning           /* Applied to <body> during theme switch */
   .theme-transitioning #tsparticles { opacity: 0 } /* Hide particles */
   .theme-transitioning *         /* Pause all animations */
   .theme-transitioning [blur]    /* Disable blur effects */
   .theme-transitioning [box-shadow] /* Remove shadows */
   ```

   ### Animation Philosophy
   - **Premium, over-the-top animations** are desired
   - **GSAP** for complex timeline animations (hero, sections)
   - **Anime.js** for specific effects (cards, particles)
   - **Framer Motion** for React component animations
   - **Lenis** for ultra-smooth scrolling
   - **tsparticles** for background particle effects
   - Smooth theme transitions are critical (60fps target)

   ### Theme Transition Optimization
   The theme toggle implements aggressive optimization:
   1. Pauses all GSAP animations globally during switch
   2. Adds `.theme-transitioning` class to disable heavy effects
   3. Hides particles, removes blurs/shadows temporarily
   4. Resumes after 50ms delay
   5. Uses View Transitions API when available

   ### Component Naming Convention
   - `Ultimate*` - Most enhanced version (e.g., `UltimateHeroSection`)
   - `Epic*` - Enhanced version with animations (e.g., `EpicAboutSection`)
   - `Beyond*` - Advanced effects components (e.g., `BeyondLoadingScreen`)
   - Regular names - Base components

   ### Interaction Patterns

   #### Hover States
   - **Cards:** Scale 1.02 + border glow + shadow
   - **Buttons:** Scale 1.05 + glow + elastic bounce
   - **Links:** Animated underline + glow
   - **Images:** Subtle scale + brightness increase

   #### Active/Press States
   - **All Interactive:** Scale 0.95-0.96 on click
   - **Buttons:** Immediate feedback with `active:scale-95`

   #### Focus States
   - **Global:** Red outline glow (`0 0 0 3px rgba(220, 38, 38, 0.3)`)
   - **Inputs:** Red ring on focus-within

   ### Responsive Design

   #### Breakpoints (Tailwind)
   ```
   sm:  640px  (Small tablets)
   md:  768px  (Tablets)
   lg:  1024px (Small laptops)
   xl:  1280px (Desktops)
   2xl: 1536px (Large screens)
   ```

   #### Mobile-First Approach
   - Navbar: Glassy when at top, solid when scrolled
   - Mobile menu: Full-screen overlay with backdrop-blur
   - Cards: Stack vertically on mobile, grid on desktop
   - Hero: Larger padding on desktop, compact on mobile

   ### Accessibility

   - **Semantic HTML:** Proper heading hierarchy, landmarks
   - **Keyboard Navigation:** All interactive elements focusable
   - **Focus Visible:** Custom red ring on focus
   - **Color Contrast:** WCAG AA compliant (light/dark modes)
   - **Reduced Motion:** Respects `prefers-reduced-motion` (to implement)
   - **Screen Reader:** Aria labels on icons (e.g., ThemeToggle)

   ### Custom Scrollbar

   ```css
   ::-webkit-scrollbar       { width: 8px }
   ::-webkit-scrollbar-track { background: var(--background) }
   ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #dc2626, #b91c1c) }
   ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #ef4444, #dc2626) }
   ```

   ### CSS Approach
   - **TailwindCSS v4** with `@theme` directive
   - **Custom CSS variables** for theming (`:root` and `.dark`)
   - **Glassmorphism** effects with `backdrop-blur`
   - **GPU acceleration** with `will-change` and `transform: translateZ(0)`
   - **Custom utility classes** via `@utility` directive
   - **Layered approach:** `@layer base` for resets

   ---

   ## � UI Component Usage Guide

   ### Using Animation Components

   #### 1. **Anime3DCard** - 3D Tilt Effect
   ```jsx
   import { Anime3DCard } from "@/components/AnimeComponents";

   <Anime3DCard 
     className="p-6 rounded-xl"
     glowColor="rgba(220, 38, 38, 0.4)"
     intensity={15}  // Tilt intensity (default: 15)
   >
     <h3>Card Content</h3>
   </Anime3DCard>
   ```

   #### 2. **ParticleExplosion** - Click Effects
   ```jsx
   import { ParticleExplosion } from "@/components/BeyondComponents";

   // Add to layout component (triggers on any click)
   <ParticleExplosion />
   ```

   #### 3. **ScrollReveal** - Reveal on Scroll
   ```jsx
   import { ScrollReveal } from "@/components/AnimeComponents";

   <ScrollReveal delay={0.2} direction="up">
     <div>Content to reveal</div>
   </ScrollReveal>
   ```

   ### Using CSS Utility Classes

   #### Creating a Premium Card
   ```jsx
   <div className="gradient-border hover-lift glass p-6 rounded-xl">
     <h3 className="glow-text">Premium Card</h3>
     <p>With gradient border, glass effect, and hover lift</p>
   </div>
   ```

   #### Creating an Animated Button
   ```jsx
   <button className="cosmic-button press-effect">
     Click Me
   </button>
   ```

   #### Glassmorphism Effect
   ```jsx
   <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
     Glass panel content
   </div>
   ```

   #### Staggered Reveal Animation
   ```jsx
   <div className="stagger-children animate">
     <div>Item 1 (reveals first)</div>
     <div>Item 2 (reveals 0.1s later)</div>
     <div>Item 3 (reveals 0.2s later)</div>
   </div>
   ```

   ### Using Toast Notifications

   ```jsx
   import { useToast } from "@/hooks/use-toast";

   function MyComponent() {
     const { toast } = useToast();

     const handleAction = () => {
       toast({
         title: "Success!",
         description: "Your action was completed.",
         variant: "default", // or "destructive"
       });
     };

     return <button onClick={handleAction}>Show Toast</button>;
   }
   ```

   ### Reading JSON Data

   ```jsx
   import experiencesData from "@/data/experiences.json";
   import skillsData from "@/data/skills.json";

   function MyComponent() {
     const experiences = experiencesData.experiences;
     const skills = skillsData.skills;

     return (
       <div>
         {experiences.map(exp => (
           <div key={exp.id}>{exp.title}</div>
         ))}
       </div>
     );
   }
   ```

   ### Using Convex for Dynamic Data (Guestbook)

   ```jsx
   import { useQuery, useMutation } from "convex/react";
   import { api } from "../../convex/_generated/api";

   function GuestbookComponent() {
     // Read data
     const comments = useQuery(api.comments.list);
     
     // Write data
     const addComment = useMutation(api.comments.create);

     const handleSubmit = async (formData) => {
       await addComment({
         name: formData.name,
         message: formData.message,
         email: formData.email || undefined,
       });
     };

     return (
       <div>
         {comments?.map(comment => (
           <div key={comment._id}>{comment.message}</div>
         ))}
       </div>
     );
   }
   ```

   ### Adding GSAP Animations

   ```jsx
   import { useEffect, useRef } from "react";
   import { gsap } from "gsap";

   function AnimatedComponent() {
     const elementRef = useRef(null);

     useEffect(() => {
       gsap.from(elementRef.current, {
         opacity: 0,
         y: 50,
         duration: 1,
         ease: "power3.out",
       });
     }, []);

     return <div ref={elementRef}>Animated content</div>;
   }
   ```

   ### Best Practices

   #### Performance
   - ✅ Add `.gpu-accelerated` class to animated elements
   - ✅ Use `will-change: transform, opacity` sparingly
   - ✅ Prefer `transform` over `top/left` for animations
   - ✅ Use `backdrop-blur` sparingly (expensive)
   - ✅ Cleanup GSAP animations in `useEffect` return

   #### Accessibility
   - ✅ Include `aria-label` on icon-only buttons
   - ✅ Ensure keyboard navigation works
   - ✅ Test focus states (should have red ring)
   - ✅ Maintain color contrast in both themes

   #### Consistency
   - ✅ Use existing utility classes before writing custom CSS
   - ✅ Follow naming convention (Ultimate/Epic/Beyond)
   - ✅ Match animation timing (0.3s standard, 0.5-1s reveals)
   - ✅ Use brand colors (red primary: #dc2626, #ef4444)

   #### Theme Transitions
   - ✅ Test theme toggle after adding heavy animations
   - ✅ Avoid adding blur effects without optimization
   - ✅ Consider adding `.theme-transitioning` exemptions

   ---

   ## �🔧 Important Commands

   ### Development
   ```bash
   # Start frontend dev server (Vite)
   npm run dev                    # → http://localhost:5173

   # Start Convex backend (for guestbook development)
   npx convex dev                 # Runs alongside dev server

   # Start both (in separate terminals)
   # Terminal 1: npm run dev
   # Terminal 2: npx convex dev
   ```

   ### Database Operations
   ```bash
   # Deploy schema changes (one-time push)
   npx convex dev --once

   # View Convex dashboard
   # Open: https://dashboard.convex.dev

   # Clear comments table (if needed for reset)
   npx convex run comments:clear

   # Note: Seed commands removed - static content now in JSON files
   # Edit src/data/*.json files directly instead
   ```

   ### Production
   ```bash
   # Build for production
   npm run build                  # Output: dist/

   # Preview production build locally
   npm run preview               # → http://localhost:4173

   # Deploy Convex to production
   npx convex deploy
   ```

   ### Content Management

   ```bash
   # Edit static content (JSON files)
   code src/data/experiences.json
   code src/data/certifications.json
   code src/data/skills.json
   code src/data/projects.json
   code src/data/hackathons.json
   code src/data/siteContent.json

   # Edit dynamic content (Convex database)
   # → Use Convex Dashboard: https://dashboard.convex.dev
   ```

   ### Package Management

   ```bash
   # Install dependencies
   npm install

   # Add new package
   npm install <package-name>

   # Remove package
   npm uninstall <package-name>

   # Update dependencies
   npm update
   ```

   ### Git Workflow

   ```bash
   # Check status
   git status

   # Stage changes
   git add .

   # Commit changes
   git commit -m "Description of changes"

   # Push to remote
   git push origin version2       # Current branch

   # Pull latest changes
   git pull origin version2
   ```

   ### Troubleshooting

   ```bash
   # Clear node_modules and reinstall
   Remove-Item -Recurse -Force node_modules
   npm install

   # Clear build cache
   Remove-Item -Recurse -Force dist
   npm run build

   # Reset Convex
   npx convex dev --clear        # Clears local state
   ```

   ---

   ## 🔄 Typical Development Workflow

   ### 1. **Start Dev Environment**
   ```bash
   # Terminal 1 - Frontend dev server
   npm run dev

   # Terminal 2 - Convex backend (only if working on guestbook/comments)
   npx convex dev
   ```

   The app runs at `http://localhost:5173`

   ### 2. **Editing Static Content** (Experiences, Skills, etc.)
   ```bash
   # Edit JSON files directly
   code src/data/experiences.json
   code src/data/skills.json
   code src/data/certifications.json
   code src/data/siteContent.json

   # Save file → Vite HMR updates instantly
   ```

   **JSON File Structure Examples:**
   ```json
   // experiences.json
   {
     "experiences": [
       {
         "id": "exp-1",
         "title": "Software Engineer",
         "company": "Tech Corp",
         "startDate": "2024-01",
         "endDate": "Present",
         "description": "Built amazing things..."
       }
     ]
   }

   // skills.json
   {
     "skills": [
       {
         "id": "skill-1",
         "name": "React",
         "category": "Frontend",
         "icon": "⚛️",
         "proficiency": 90
       }
     ]
   }
   ```

   ### 3. **Editing Dynamic Content** (Guestbook/Comments)
   - Go to [Convex Dashboard](https://dashboard.convex.dev)
   - Select your project
   - Navigate to `comments` table
   - Edit, approve, or delete comments directly
   - Changes sync instantly to live site

   ### 4. **Schema Changes** (If modifying Convex)
   ```bash
   # Edit schema
   code convex/schema.ts

   # Push schema changes
   npx convex dev --once

   # If data conflicts, clear table first
   npx convex run comments:clear
   ```

   ### 5. **Adding New Features**

   #### Adding a New Section Component
   ```bash
   # 1. Create component
   code src/components/MyNewSection.jsx

   # 2. Import data (if needed)
   import myData from "@/data/myData.json";

   # 3. Add to Home page
   code src/pages/Home.jsx

   # 4. Add animations/effects
   # - Use existing utility classes
   # - Import from AnimeComponents/BeyondComponents
   # - Add GSAP timeline if complex
   ```

   #### Adding a New Page
   ```bash
   # 1. Create page component
   code src/pages/MyNewPage.jsx

   # 2. Add route in App.jsx
   code src/App.jsx

   # 3. Add to navigation
   code src/components/Navbar.jsx
   ```

   #### Adding New Static Data
   ```bash
   # 1. Create JSON file
   code src/data/myNewData.json

   # 2. Structure data (use existing files as templates)
   {
     "items": [
       { "id": "1", "name": "Item 1" }
     ]
   }

   # 3. Import in component
   import myData from "@/data/myNewData.json";
   ```

   ### 6. **Styling Workflow**

   #### Using Existing Utilities (Preferred)
   ```jsx
   <div className="gradient-border hover-lift glass p-6 rounded-xl">
     Content
   </div>
   ```

   #### Adding Custom Utility Classes
   ```css
   /* src/index.css */
   @utility my-custom-class {
     @apply px-6 py-3 rounded-full;
     background: linear-gradient(135deg, red, blue);
   }
   ```

   #### Adding Custom Animations
   ```css
   /* src/index.css */
   @keyframes my-animation {
     0% { transform: scale(1); }
     50% { transform: scale(1.1); }
     100% { transform: scale(1); }
   }

   .my-animated-class {
     animation: my-animation 2s ease-in-out infinite;
   }
   ```

   ### 7. **Testing Checklist**

   Before committing changes:
   - ✅ Test in both light and dark themes
   - ✅ Test theme toggle performance (should be instant)
   - ✅ Test on mobile viewport (responsive)
   - ✅ Check keyboard navigation
   - ✅ Verify no console errors
   - ✅ Test smooth scrolling
   - ✅ Verify animations don't cause jank

   ### 8. **Deployment**

   ```bash
   # Build production bundle
   npm run build

   # Preview production build locally
   npm run preview

   # Deploy Convex to production (if schema changed)
   npx convex deploy
   ```

   ---

   ## ⚠️ Known Gotchas & Solutions

   ### 1. Convex Import Path
   **Wrong**: `import { api } from "@/convex/_generated/api"`
   **Right**: `import { api } from "../../convex/_generated/api"`
   
   **Reason**: The `@/` alias points to `src/`, but `convex/` is at project root.

   ### 2. JSON Import Path
   **Correct**: `import data from "@/data/experiences.json"`
   
   The `@/` alias correctly resolves to `src/`, so `@/data/` works for JSON files.

   ### 3. Theme Transition Lag
   If theme toggle is laggy, check that:
   - `ThemeToggle.jsx` pauses GSAP animations
   - `.theme-transitioning` CSS rules are in `index.css`
   - Heavy blur effects are disabled during transition
   - Particles are hidden during transition

   ### 4. Schema Validation Failed
   If `npx convex dev --once` fails with schema validation:
   - Clear the affected table first: `npx convex run comments:clear`
   - Then retry the schema push
   - Note: Only `comments` table exists now (static data moved to JSON)

   ### 5. TailwindCSS v4 Linter Warnings
   Warnings about `@theme`, `@apply`, `@utility` are expected - these are v4 syntax that ESLint doesn't recognize. They still work.

   ### 6. JSON File Edits Not Reflecting
   If JSON file changes don't appear:
   - Check Vite dev server is running (`npm run dev`)
   - Hard refresh browser (Ctrl+Shift+R)
   - Check file syntax is valid JSON (no trailing commas, proper quotes)
   - Check console for import errors

   ### 7. Missing Data After Edit
   If data disappears after editing JSON:
   - Validate JSON syntax (use JSONLint or VS Code validation)
   - Check file path is correct
   - Ensure array structure matches expected format
   - Look for typos in property names (e.g., `title` vs `name`)

   ---

   ## 📍 Key Files Quick Reference

   | For... | Look at... |
   |--------|------------|
   | Database schema | `convex/schema.ts` |
   | Comments/Guestbook queries | `convex/comments.ts` |
   | Hero section | `src/components/UltimateHeroSection.jsx` |
   | About section | `src/components/EpicAboutSection.jsx` |
   | Contact/Social | `src/components/EpicContactSection.jsx` |
   | Guestbook | `src/components/GuestbookSection.jsx` |
   | Skills section | `src/components/EpicSkillsSection.jsx` |
   | Experience section | `src/components/ExperienceSection.jsx` |
   | Projects section | `src/components/ProjectsSection.jsx` |
   | Certifications section | `src/components/CertificationsSection.jsx` |
   | Theme toggle | `src/components/ThemeToggle.jsx` |
   | Navigation | `src/components/Navbar.jsx` |
   | Custom cursor | `src/components/CustomCursor.jsx` |
   | Background effects | `src/components/UltimateBackground.jsx` |
   | Loading screen | `src/components/BeyondLoadingScreen.jsx` |
   | Reusable animations | `src/components/AnimeComponents.jsx` |
   | Advanced effects | `src/components/BeyondComponents.jsx` |
   | Toast notifications | `src/components/ui/toast.jsx` |
   | Toast hook | `src/hooks/use-toast.js` |
   | Utility functions | `src/lib/utils.js` |
   | Global styles & CSS utilities | `src/index.css` |
   | Routes | `src/App.jsx` |
   | Home page layout | `src/pages/Home.jsx` |
   | All projects page | `src/pages/AllProjects.jsx` |
   | All experiences page | `src/pages/AllExperiences.jsx` |
   | All certifications page | `src/pages/AllCertifications.jsx` |
   | Static data - Experiences | `src/data/experiences.json` |
   | Static data - Certifications | `src/data/certifications.json` |
   | Static data - Skills | `src/data/skills.json` |
   | Static data - Projects | `src/data/projects.json` |
   | Static data - Hackathons | `src/data/hackathons.json` |
   | Static data - Site content | `src/data/siteContent.json` |

   ---

   ## 🎯 User Preferences

   1. **Aesthetics**: Premium, visually stunning, over-the-top animations
   2. **Performance**: Smooth 60fps, no lag on theme transitions
   3. **Content Management**: 
      - Static content in JSON files (easy git tracking, quick edits)
      - Dynamic content in Convex (real-time updates, moderation)
   4. **Data Architecture**: Clear separation of static vs dynamic data
   5. **Cross-device**: Convex-based features sync between PC and mobile
   6. **Documentation**: Comprehensive guidelines in single file
   7. **Code Quality**: Clean, readable, well-commented code
   8. **Accessibility**: keyboard navigation, focus states, semantic HTML

   ---

   ## 🤖 AI Assistant Notes

   When working on this project:

   1. **Check guidelines.md first** for comprehensive context
   2. **Use correct import paths:**
      - JSON files: `import data from "@/data/file.json"`
      - Convex API: `import { api } from "../../convex/_generated/api"`
   3. **Static vs Dynamic data:**
      - Static (experiences, skills, certs): Edit JSON files
      - Dynamic (comments): Use Convex queries/mutations
   4. **Premium animations** are expected and appreciated
   5. **Performance matters** - always consider animation impact
   6. **Test theme toggle** after making animation changes
   7. **UI consistency** - use existing utility classes and components
   8. **User runs Windows** - PowerShell commands
   9. **Current branch**: `version2` (default: `main`)
   10. **Real data**: All experiences and certifications are authentic from LinkedIn

   ---

   ## 🔄 Recent Changes (February 17, 2026)

   ### Major Refactoring: JSON Migration + Guestbook Feature

   **What Changed:**
   - **Data Storage Migration:** All static portfolio data (experiences, certifications, skills, projects, hackathons, site content) migrated from Convex to JSON files in `src/data/`
   - **Convex Simplification:** Convex now only handles dynamic comments/guestbook feature
   - **New Feature:** Added full-featured guestbook/comment section with CRUD operations

   **File Structure:**
   ```
   src/data/
   ├── experiences.json       (10 actual experiences from LinkedIn)
   ├── certifications.json    (23 LinkedIn Learning certificates)
   ├── skills.json           (30+ technical skills)
   ├── projects.json         (empty, ready for future projects)
   ├── hackathons.json       (empty, ready for hackathon projects)
   └── siteContent.json      (hero, about, social links)

   convex/
   ├── schema.ts             (simplified - only comments table)
   ├── comments.ts           (CRUD operations for guestbook)
   └── _generated/           (auto-generated Convex files)
   ```

   **Benefits:**
   - ✅ **Easier Content Updates:** Edit JSON files directly instead of using Convex dashboard
   - ✅ **Version Control:** All content changes tracked in Git
   - ✅ **Better Performance:** No database queries for static content
   - ✅ **Cleaner Architecture:** Clear separation of static vs dynamic data
   - ✅ **Real LinkedIn Data:** Authentic work experiences and certifications

   **Guestbook Feature:**
   - Location: `src/components/GuestbookSection.jsx`
   - Integrated into Home page (before Contact section)
   - Features: Create, Read, Update, Delete comments
   - Validation: Name (2+ chars), Message (5-500 chars), Optional email/website
   - Moderation: Comments can be approved/unapproved
   - UI: Matches portfolio theme with glass-morphism design

   **Migration Details:**
   - All components updated to import JSON instead of using Convex `useQuery`
   - Removed unused Convex files: experiences.ts, certifications.ts, skills.ts, etc.
   - No breaking changes to UI - components work exactly the same
   - All animations and interactions preserved

   **To Add Content:**
   - **Experiences/Certifications/Skills:** Edit JSON files in `src/data/`
   - **Comments/Guestbook:** Users add via UI, stored in Convex
   - **Projects/Hackathons:** Add to respective JSON files when ready

   ---

   *Last Updated: 2026-02-17*
