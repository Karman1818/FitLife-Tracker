# 🏋️‍♂️ FitLife Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-FCC72B?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions)](.github/workflows/ci-cd.yml)
[![Prisma](https://img.shields.io/badge/Prisma-6.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5.0_beta-purple?style=for-the-badge&logo=next.js)](https://authjs.dev/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-tmp0.averi.me-brightgreen?style=for-the-badge&logo=vercel)](https://tmp0.averi.me/)

**FitLife Tracker** is a modern, full-stack fitness and nutrition tracking web application. It empowers users to manage their daily diet, track caloric and macronutrient intake through an interactive weekly calendar, calculate BMI with an animated HTML5 canvas dial gauge, and discover balanced recipes with step-by-step cooking instructions. Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and **Zustand**, featuring a sleek glassmorphic aesthetic.

🔗 **Live Application:** [https://tmp0.averi.me/](https://tmp0.averi.me/)

---

## 📸 Application Showcase

### 🏠 Dashboard & Daily Goals Tracking
| Main Dashboard (Goals & Water) | Food & Macro Logger |
| :---: | :---: |
| ![Dashboard Goals](docs/screenshots/fitlifetracker1.png) | ![Food Logger](docs/screenshots/fitlifetracker2.png) |
| *Day selector, calorie & water progress dials with quick water logging (+250ml, +500ml)* | *Direct macro entry (Calories, Protein, Carbs, Fat) with portion scaling* |

### 📅 Weekly Meals & Interactive Calendar Planner
| Meals Breakdown & Health Metrics | Interactive Calendar Planner (`/calories`) |
| :---: | :---: |
| ![Meals & Metrics](docs/screenshots/fitlifetracker3.png) | ![Calendar Planner](docs/screenshots/fitlifetracker4.png) |
| *Daily meals breakdown, macro totals, and personal BMI metrics* | *Interactive 7-day calendar strip, date picker popover, and daily nutrition budget* |

### ⚖️ BMI Calculator & Recipe Discovery
| Interactive BMI Calculator (`/bmi`) | Recipe Discovery Catalog (`/meals`) |
| :---: | :---: |
| ![BMI Calculator](docs/screenshots/fitlifetracker5.png) | ![Recipe Catalog](docs/screenshots/fitlifetracker6.png) |
| *Dual sliders & numeric inputs synced with animated Canvas needle gauge* | *Curated global recipes with cuisine tags and dynamic shuffle* |

### 👨‍🍳 Recipe Details & Preparation Steps
<p align="center">
  <img src="docs/screenshots/fitlifetracker7.png" alt="Recipe Details" width="90%" style="border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);" />
  <br />
  <em>Step-by-step cooking steps with ingredient checklist and YouTube video links (<code>/meals/recipes</code>)</em>
</p>

---

## ✨ Key Features

- 📅 **Interactive Calendar & Weekly Diet Planner (`/calories`)**:
  - Interactive 7-day calendar strip with date numbers, weekday abbreviations, and total kcal badges.
  - Native **Date Picker popover** to jump to any date across past or future periods.
  - One-click **"Today"** quick jump button and week navigation arrows.
  - Real-time aggregated macro meters: 🥩 **Protein**, 🌾 **Carbohydrates**, and 🥑 **Fat**.
  - Focused single-day view and full weekly view toggle (`Day` vs `All Days`).

- 📊 **Interactive BMI Gauge Visualizer (`/bmi`)**:
  - Dynamic HTML5 Canvas-powered dial gauge with smooth animated indicator needle.
  - **Two-way synchronized controls**: interactive range sliders and manual numeric keyboard inputs.
  - Real-time BMI score calculation with color-coded classification categories (*Underweight, Normal Weight, Overweight, Obesity Classes*).
  - Metric persistence in local storage with automatic dashboard synchronization.

- 🥗 **Centralized Daily Dashboard (`/`)**:
  - Day selector tab bar covering Monday through Sunday with current day indicator.
  - **Daily Calorie Goal** circular progress dial with remaining budget calculations.
  - **Daily Water Goal** with quick logging actions (`+250ml`, `+500ml`, `-250ml`, `Reset`).
  - Integrated **Food Logger** with OpenFoodFacts database search and direct macro overrides.
  - Cards for 5 daily meals (*Breakfast*, *Second Breakfast*, *Lunch*, *Afternoon Snack*, *Dinner*).

- 🍲 **Recipe Catalog & Step-by-Step Cooking (`/meals`, `/meals/recipes`)**:
  - Global meal ideas with cuisine filters, category badges, and instant random recipe shuffling.
  - Detailed recipe inspector featuring hero cards, preparation time, and direct YouTube video tutorials.
  - Interactive ingredients checklist and structured step-by-step cooking cards.

- 👤 **User Profile & Authentication**:
  - Personal health stats overview and account settings.
  - Secure authentication flow using **Auth.js (NextAuth v5)** with Resend magic links and Prisma database sessions.

- 🎨 **Glassmorphism Design System**:
  - Frosted glass panels (`backdrop-blur-md`), subtle borders, gradient controls, and responsive UI layout.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + `tailwindcss-animate`
- **State Management:** [Zustand 5](https://zustand-demo.pmnd.rs/) with `persist` localStorage middleware
- **Forms & Validation:** [TanStack React Form](https://tanstack.com/form), [Zod 3](https://zod.dev/)
- **Icons & Graphics:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), HTML5 Canvas API

### **Backend & Database**
- **Database:** PostgreSQL
- **ORM:** [Prisma 6](https://www.prisma.io/) (`@prisma/client`, `@prisma/adapter-pg`)
- **Authentication:** [Auth.js (NextAuth.js v5)](https://authjs.dev/) with `@auth/prisma-adapter` & Resend Provider

### **Testing & CI/CD**
- **Test Framework:** [Vitest](https://vitest.dev/) with [JSDOM](https://github.com/jsdom/jsdom)
- **Component Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **CI/CD Automation:** [GitHub Actions](https://github.com/features/actions) (Lint, Typecheck, Unit/Integration Tests, Production Build)

---

## 📁 Project Structure

```text
FitLife-Tracker/
├── .github/workflows/    # GitHub Actions CI/CD pipelines
├── app/                  # Next.js App Router pages and API routes
│   ├── api/auth/         # NextAuth authentication endpoints
│   ├── bmi/              # BMI Calculator page & Canvas visualizer
│   ├── calories/         # Interactive Calendar & Calorie tracking page
│   ├── meals/            # Recipe discovery catalog
│   │   └── recipes/      # Detailed recipe instructions & ingredients view
│   ├── profile/[id]/     # User profile & stats view
│   ├── layout.tsx        # Root layout with navigation & theme wrapper
│   └── page.tsx          # Main dashboard overview homepage
├── components/           # Reusable UI components
│   ├── AddedMealsList.tsx          # Dashboard nutrition & food logger
│   ├── AddProductToMealForm.tsx    # OpenFoodFacts product search & logging
│   ├── DrawBMICanvas.tsx           # Custom HTML5 Canvas BMI gauge meter
│   ├── GoalCard.tsx                # Calorie & Water circular progress cards
│   ├── PieChartOutline.tsx         # Circular SVG/Canvas gauge component
│   ├── RecipesComponent.tsx        # Meal discovery catalog components
│   └── Nav.tsx                     # Top glassmorphic navbar component
├── docs/screenshots/     # Application screenshots & showcase assets
├── lib/                  # Utilities, configuration, & Prisma client
│   ├── bmi.ts            # BMI calculation and category helpers
│   ├── prisma.ts         # Singleton Prisma client instance
│   └── utils.ts          # Classname utilities (cn)
├── stores/               # Client-side Zustand stores
│   └── calories.ts       # Global state for days, meals, products, and goals
├── tests/                # Automated Vitest test suites
├── prisma/               # Database schema & migrations
└── public/               # Static assets & media
```

---

## 👨‍💻 Karman1818 Role & Key Contributions

FitLife Tracker was developed as a collaborative team project. As the repository creator and Core Full-Stack Developer (**Karman1818**), my primary contributions spanned client-side state architecture, nutritional computation, and meal management flows:

* **Global State Management (Zustand Store)**:
  * Architected and refactored the centralized reactive store (`stores/calories.ts`), adding state persistence (`persist`), daily goal tracking (calories and water), and seamless UI synchronization.
* **Calorie & Macro Computation Engine (CaloriesManager & Meal Logs)**:
  * Implemented the calculation logic for real-time daily caloric intake, macro breakdowns (protein, carbohydrates, fats), and target tracking across daily meal categories.
* **Interactive Calendar & Date Navigation (`/calories`)**:
  * Designed the modern calendar strip and single-day focused view, enabling date picking, macro aggregation, and daily budget comparisons.
* **Recipe Catalog & Meal Discovery**:
  * Developed the dynamic meal and recipe browsing pages (`/meals`, `/meals/recipes`, `RecipesComponent`), allowing users to inspect ingredients, macros, and incorporate recipes into their daily schedules.
* **Navigation Architecture & Routing**:
  * Structured application routing, layout hierarchy, page transitions, and dashboard widget integrations to ensure a cohesive user journey.
* **Interactive Calendar & Weekly Diet Planner Overhaul (`/calories`)**:
  * Replaced the overwhelming all-day scroll with an intuitive single-day focused planner featuring a dynamic 7-day week calendar strip and native date picker popover.
  * Implemented real-time daily macro breakdown counters (Protein, Carbohydrates, Fat) and visual progress bars against daily caloric goals.
* **Unified Dashboard & Food Logger Redesign (`/`)**:
  * Engineered the centralized daily dashboard with day switching, circular calorie & water goal gauges, and quick water hydration buttons (`+250ml`, `+500ml`, `-250ml`, `Reset`).
  * Built a dual-mode Food Logger (Manual custom macro entry & OpenFoodFacts search) with zero-tolerant numeric inputs, fixing input locking issues and synchronizing live with the weekly diet store.
* **Interactive BMI Calculator Modernization (`/bmi`)**:
  * Implemented two-way synchronized numeric keyboard inputs alongside the range sliders for precise height and weight entry, with automated state persistence.
  * Optimized HTML5 Canvas dial meter animation loop with `requestAnimationFrame`, eliminating re-render leaks and correcting needle orientation.
* **Recipe Details & Cooking Guide UX (`/meals/recipes`)**:
  * Redesigned the recipe inspection page with hero cards, categorized tags, interactive ingredient checklists, and structured step-by-step cooking cards with YouTube tutorials.
* **Automated Testing & CI/CD Pipeline**:
  * Established a comprehensive Vitest test suite (`tests/bmi.test.ts`, `tests/caloriesStore.test.ts`, `tests/utils.test.ts`) validating BMI logic, Zustand state reducers, and goal calculations (15/15 passed).
  * Modernized GitHub Actions CI pipeline covering automated linting, strict TypeScript verification, test execution, and production Next.js builds.

---

## 👥 Contributors & Special Thanks

FitLife Tracker was brought to life thanks to close collaboration, shared vision, and teamwork. Huge appreciation to the team members who worked with me on building this application:

* **[Karman1818](https://github.com/Karman1818)** (Marceli Karman) — Project owner, Zustand state architecture, nutrition & macro computation engine, meal and recipe discovery flows, routing & integration.
* **[Averi](https://github.com/averi)** — Next.js architecture & Vite migration, Auth.js (NextAuth v5) & Prisma configuration, glassmorphic design system styling, CI/CD pipeline, and build optimization.
* **[justPoosai](https://github.com/justPoosay)** (Oscar / Mike) — Interactive HTML5 Canvas BMI gauge visualizer, local metric persistence (LocalStorage), logo design (`components/icons/logo`), and initial frontend UI prototypes.

Thank you to everyone for the great teamwork, brainstorming sessions, and shared dedication to making this project a reality! 🚀

---

## 🚀 Getting Started

Follow these instructions to set up and run FitLife Tracker on your local machine.

### Prerequisites

Ensure you have installed:
- **Node.js**: v20.x or higher
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`
- **PostgreSQL**: A running PostgreSQL instance (local or cloud-hosted via Supabase, Neon, etc.)

### 1. Clone the Repository

```bash
git clone https://github.com/Karman1818/FitLife-Tracker.git
cd FitLife-Tracker
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Copy the example environment template and adjust variables as needed:

```bash
cp .env.example .env
```

```env
# Database Connection URL (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/fitlife_db?schema=public"

# NextAuth Configuration
AUTH_SECRET="your-super-secret-key-change-me"
NEXTAUTH_URL="http://localhost:3000"

# Resend Email Provider (Magic Link Auth)
EMAIL_FROM="noreply@yourdomain.com"
AUTH_RESEND_KEY="re_123456789"
```

### 4. Initialize Database with Prisma

Push the Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

*(Optional) Generate Prisma Client:*
```bash
npx prisma generate
```

### 5. Start Development Server

Run the development server using Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Compiles and builds the production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint analysis across the codebase |
| `npm run tsc` | Executes TypeScript type checking |
| `npm run test` | Runs automated unit and integration tests via Vitest |
| `npm run test:watch` | Runs Vitest in interactive watch mode |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.
