# 🏋️‍♂️ FitLife Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5.0_beta-purple?style=for-the-badge&logo=next.js)](https://authjs.dev/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-tmp0.averi.me-brightgreen?style=for-the-badge&logo=vercel)](https://tmp0.averi.me/)

**FitLife Tracker** is a modern, full-stack web application designed to help users monitor their daily fitness journey, track calories & macronutrients across weekly meals, calculate BMI with an interactive HTML5 canvas dial visualizer, and explore healthy meal recipes. Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and **Zustand**, featuring a glassmorphic aesthetic.

🔗 **Live Application:** [https://tmp0.averi.me/](https://tmp0.averi.me/)

---

## ✨ Key Features

- 📊 **Interactive BMI Gauge Visualizer**:
  - Dynamic HTML5 Canvas-powered dial gauge with smooth animated indicator needle.
  - Interactive range sliders for weight and height adjustments.
  - Real-time BMI score calculation with color-coded classification categories (*Underweight, Normal Weight, Overweight, Obesity Classes*).
  - Visual feedback for extreme BMI values.

- 🥗 **Weekly Calorie & Macronutrient Tracker**:
  - Comprehensive daily tracker covering Monday through Sunday.
  - Categorized meal breakdowns: *Breakfast*, *Second Breakfast*, *Lunch*, *Afternoon Snack*, and *Dinner*.
  - Detailed product logging: weight (g), calories (kcal), protein (g), carbohydrates (g), and fat (g).
  - Client-side state persistence and instant updates using **Zustand**.

- 🍲 **Recipe & Meal Ideas**:
  - Dedicated section featuring meal recipes and dietary suggestions.

- 👤 **User Profile & Stats Overview**:
  - Personal health stats dashboard displaying current metrics and recent meal records.
  - Secure authentication flow using **Auth.js (NextAuth v5)** with Resend magic links and Prisma database sessions.

- 🎨 **Glassmorphism Design System**:
  - Elegant dark theme featuring frosted glass panels (`backdrop-blur`), subtle borders, gradient controls, and responsive UI layout.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) + `tailwindcss-animate`
- **State Management:** [Zustand 5](https://zustand-demo.pmnd.rs/)
- **Forms & Validation:** [TanStack React Form](https://tanstack.com/form), [Zod 3](https://zod.dev/)
- **Icons & Graphics:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), HTML5 Canvas API

### **Backend & Database**
- **Database:** PostgreSQL
- **ORM:** [Prisma 6](https://www.prisma.io/) (`@prisma/client`, `@prisma/adapter-pg`)
- **Authentication:** [Auth.js (NextAuth.js v5)](https://authjs.dev/) with `@auth/prisma-adapter` & Resend Provider

---

## 📁 Project Structure

```text
FitLife-Tracker/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/auth/         # NextAuth authentication endpoints
│   ├── bmi/              # BMI Calculator page & Canvas visualizer
│   ├── calories/         # Weekly Calorie & Macro tracking page
│   ├── meals/            # Recipe discovery & meal ideas page
│   ├── profile/[id]/     # User profile & stats view
│   ├── globals.css       # Global styles & Tailwind imports
│   ├── layout.tsx        # Root layout with navigation & theme wrapper
│   └── page.tsx          # Dashboard overview homepage
├── components/           # Reusable UI components
│   ├── averi-ui/         # Styled custom primitives (Buttons, Controls)
│   ├── AddProductForm.tsx          # Product creation component
│   ├── AddProductToMealForm.tsx    # Add product to meal modal/form
│   ├── AddedMealsList.tsx          # Summary list of added meals
│   ├── DrawBMICanvas.tsx           # Custom HTML5 Canvas BMI gauge meter
│   └── Nav.tsx                     # Top navbar component
├── lib/                  # Utilities, configuration, & Prisma client
│   ├── env.ts            # Type-safe environment validation via Zod
│   ├── prisma.ts         # Singleton Prisma client instance
│   └── utils.ts          # Classname utilities (cn)
├── stores/               # Client-side Zustand stores
│   └── calories.ts       # Global state for days, meals, and products
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Prisma data models (User, Account, Session, etc.)
└── public/               # Static assets & media
```

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

Create a `.env` file in the root directory and specify your environment variables:

```env
# Database Connection URL (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/fitlife_db?schema=public"

# NextAuth Configuration
AUTH_SECRET="your-super-secret-key-change-me"

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
