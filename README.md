# F1 Betting Platform

A race-by-race betting platform where you can invite friends to private wagers and bet on placement of F1 racers.

## Features

- User registration and authentication
- F1 race calendar with upcoming and past races
- Private wager groups with invitation system
- Comprehensive betting interface for race predictions
- Advanced scoring system with bonuses for accurate predictions
- Leaderboards for each wager group
- Responsive design with dark/light mode

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite compatible)
- **Authentication**: JWT-based authentication
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/f1-betting-platform.git
cd f1-betting-platform
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file with the following content:
```
JWT_SECRET=your-secure-jwt-secret-key
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scoring System

The platform uses a comprehensive scoring system:

### Base Scoring
- Correct Position: +25 points
- One Position Off: +15 points
- Two Positions Off: +10 points
- Three Positions Off: +5 points
- Driver in Top 10 but Wrong Spot: +2 points

### Bonus Points
- Perfect Podium (Top 3 in exact order): +30 points
- Perfect Top 5 (Exact Order): +50 points
- Perfect Top 10 (Exact Order): +100 points
- Correct Winner: +20 points
- Fastest Lap Prediction: +10 points
- Correct DNF Prediction: +15 points per driver

### Penalty
- Driver Not in Top 10 at All: -5 points

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
