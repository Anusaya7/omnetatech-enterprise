# OmNetaTech – Digital Futures
### World-Class Enterprise Technology Platform

OmNetaTech is a premium enterprise-grade web application built to communicate trust, scalable engineering, and AI leadership. This project showcases localized Indian market parameters (pricing, contact vectors, currency) and is inspired by the design languages of Accenture, Deloitte, IBM, and Microsoft.

---

## 🛠️ Technology Stack
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (Client Environment)
- **Styling**: Vanilla CSS (Custom Design System with responsive grid models)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 📈 Key Custom Modules & Indian Localization

1. **Architecture & Pricing Estimator**:
   - Integrated a dynamic sprint and dedicated resource calculator based on project scope, target timeline, and budget.
   - Localized pricing selectors to:
     - **Under ₹25 Lakhs**
     - **₹25 Lakhs - ₹75 Lakhs**
     - **₹75 Lakhs+**
   - Clickable contact cards displaying direct corporate lines (📞 **+91 8237140776** / 📧 **omnetatech@gmail.com**).

2. **Metrics & Financial Localization**:
   - Timelines, portfolios, and service cards use Indian Rupee (₹), Lakhs, and Crores values.
   - Case studies document operational savings in INR (e.g. `₹35 Crore saved in labor costs`).

3. **Multi-View State Routing**:
   - Features fully developed tabs for **About Us** (timeline and leadership), **Careers** (open positions and online application portal), and **Insights** (whitepapers with email gates).

---

## 🚀 Local Setup & Installation

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **NPM** installed.

### 1. Clone the repository
```bash
git clone https://github.com/Anusaya7/omnetatech-enterprise.git
cd omnetatech-enterprise
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
The server will boot locally at: `http://localhost:5173/`

### 4. Build for production
```bash
npm run build
```
This minifies files and generates static assets inside the `/dist` directory.

---

## 🌐 Vercel Production Deployment

To host this website on Vercel:

1. Go to [Vercel](https://vercel.com/) and login using your GitHub account.
2. Click **Add New** > **Project**.
3. Import the repository: `omnetatech-enterprise`.
4. Configure Project Settings:
   - **Framework Preset**: Vite (detected automatically).
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and assign a production URL in less than 60 seconds.

---

## 📁 Directory Structure
```
omnetatech-enterprise/
├── dist/                  # Compiled production files
├── public/                # Favicon and static SVGs
├── src/
│   ├── assets/            # Branding logos
│   ├── components/        # Modular UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── IndustriesSection.jsx
│   │   ├── PortfolioSection.jsx
│   │   ├── WhyChoose.jsx
│   │   ├── Testimonials.jsx
│   │   ├── BookConsultationModal.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CareersPage.jsx
│   │   └── InsightsPage.jsx
│   ├── App.jsx            # Dynamic state router
│   ├── main.jsx           # React DOM root entry
│   └── index.css          # Design System tokens & global styles
├── eslint.config.js       # ESLint rules
├── package.json
└── vite.config.js         # Build configuration
```
