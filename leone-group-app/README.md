# Leone Group AI - Real Estate Investment Analyzer

![Leone Group AI Banner](https://via.placeholder.com/1200x600/0f172a/f59e0b?text=Leone+Group+AI)

## 📋 Overview
**Leone Group AI** is a premium Real Estate Analysis Dashboard designed for investors. It instantly analyzes property listings and calculates financial projections (ROI, Net Profit, Total Investment).

Currently running in **Demo Mode**, it features a "Golden Path" simulation that provides instant, verified data for specific demonstration URLs, showcasing the potential of the platform without requiring active anti-bot bypassing infrastructure.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Animations
- **UI Components**: Lucide React Icons
- **Visual Effects**: 
  - HTML5 Canvas Particle System
  - CSS Glassmorphism & Gradients
  - 3D Floating Shapes

### Backend (Serverless)
- **Runtime**: Next.js API Routes (Node.js)
- **Logic**: 
  - Input Validation & Sanitization
  - Financial ROI Calculation Algorithms
  - Simulation/Demo Data Layer

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/leone-group-ai.git
   cd leone-group-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run local development server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## 🏗️ Architecture

### 1. Frontend Layer (`app/page.tsx`)
- **Responsive Design**: Mobile-first approach using Tailwind grid/flex.
- **State Management**: React `useState`/`useEffect` for handling loading states, results, and animations.
- **Visuals**: 
  - `AnimatedBackground`: Custom Canvas component for particle physics.
  - `FloatingShapes`: Pure CSS keyframe animations for background depth.

### 2. API Layer (`app/api/analyze/route.ts`)
The API currently operates in a **Deterministic Demo Mode**.
- **Input**: Accepts a JSON body with a property URL.
- **Validation**: Checks for valid domains (Immobiliare.it, Idealista.it).
- **Processing**:
  - Checks if the URL matches a "Golden Path" (pre-analyzed demo link).
  - If match: Returns verified JSON data + "Verified" source flag.
  - If no match: Returns a specific 422 error guiding the user to use demo links.
- **Response**: JSON containing address, price, surface area, and image URL.

## 💡 Demo Links (Golden Path)
Use these URLs to test the full analysis capability:
- **Luxury**: `https://www.immobiliare.it/annunci/98765432/`
- **Investment**: `https://www.immobiliare.it/annunci/12345678/`
- **Starter**: `https://www.idealista.it/immobile/12345678/`

## 🔮 Roadmap to Production (Real Scraping)
To enable live scraping of any URL, the backend needs to be connected to a residential proxy service to bypass DataDome protections (e.g., ScrapingBee, Bright Data).

1. **Current**: Simulated/Demo Data (Free, Instant, 100% Reliable).
2. **Next Step**: Integrate ScrapingBee API for live HTML extraction.
3. **Future**: Machine Learning model for price prediction based on historical data.

---

## 🔒 Security
- **Input Sanitization**: All inputs are validated before processing.
- **No Database**: Currently stateless, no PII is stored.
- **Error Handling**: Graceful degradation with user-friendly error messages.

---

© 2026 Leone Group Immobiliare
