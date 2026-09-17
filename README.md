# LUMIÈRE — Luxury Real Estate Portal & Reel Catalogue

> **India & Dubai's Next-Gen Architectural Real Estate Experience**  
> Browse exclusive luxury estates with high-fidelity video reels, auto-detected GPS location, massive inventory catalogue, and 1-click WhatsApp sharing.

---

## 🌟 Key Features

### 1. Dual Viewport Experience
- **Desktop (Full-Width Edge-to-Edge Slider)**: Full-height (`calc(100vh - 74px)`) and 100% width with **zero blank space on the left or right**. Navigate sideways using `←` / `→` arrow keys, on-screen chevrons, trackpad horizontal swipe, or the luxury bottom slider dock.
- **Mobile (9:16 Vertical Reel Format)**: Full-screen vertical snap reel (`scroll-snap-type: y mandatory`) with pure white floating bottom sheet card and right-side action column.

### 2. Zero-Login Browsing & Protected Inventory Listing
- **Instant Discovery**: Users can browse properties, watch 4K HDR architectural reels, check EMI estimates, and save favorites to their wishlist without logging in.
- **Mandatory Profile Creation for Listing**: Submitting an exclusive property (`+ List Inventory`) requires user authentication (Property Owner, Verified Broker, or Direct Builder), keeping the catalogue curated and trusted.

### 3. Real-Time GPS Location & Hub Switcher
- **Auto Location Detection**: Automatically locates the user's nearest luxury metro (Mumbai, Delhi NCR, Dubai, Goa, Bangalore, Hyderabad) using browser geolocation and Haversine distance matching.
- **Manual City Switcher**: Filter estates instantly by city from the top bar or Explore Markets dropdown.

### 4. Omnipresent WhatsApp Sharing
- **1-Click Share**: Share property brochures, reel walkthroughs, or your entire saved portfolio on WhatsApp with preformatted luxury messages and direct links.

### 5. Deep Specs & Buyer Tools
- **Estimated EMI Calculator**: Dynamic monthly breakdown based on asking price.
- **360° Virtual Tour Previews**: Interactive room previews (Living Suite, Balcony Deck, Master Suite).
- **Callback Request System**: 1-click lead capture connected directly to designated luxury estate advisors.
- **AI Vibe Search**: Natural language search powered by semantic tagging (e.g., *"penthouse with sea view in Mumbai"*).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide Icons, Vanilla CSS Luxury Design System (Pure White `#ffffff` background, Deep Navy Blue `#0b1c3d` primary actions).
- **Backend**: Node.js, Express, Morgan, CORS.
- **Database / Storage**: Local JSON store with read/write endpoints for properties and leads.

---

## 🚀 Deploy to Render (1-Click Ready)

This repository is pre-configured for seamless deployment on [Render](https://render.com) as a single Web Service.

### Quick Setup on Render:
1. Fork or push this repository to GitHub.
2. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your GitHub repository: `https://github.com/aushthakur/de-concept.git`.
4. Configure the service settings (or let `render.yaml` auto-fill):
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Click **Create Web Service**.

> **How it works on Render**:
> `npm run build` installs both server and client dependencies and builds the React frontend into `client/dist`.  
> `npm start` launches the Express server, which serves API routes on `/api/*` and serves the production React build for all other routes.

---

## 💻 Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/aushthakur/de-concept.git
   cd de-concept
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Start development servers concurrently:
   ```bash
   npm run dev
   ```

   - **Client**: `http://localhost:5174` (or `5175`)
   - **Server**: `http://localhost:5001`

4. Build for production locally:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License
MIT License © 2026 LUMIÈRE Real Estate.
