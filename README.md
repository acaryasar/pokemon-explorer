# Pokemon Explorer

A Pokemon-themed exploration game built with React, TypeScript, TailwindCSS, and Supabase.

## Features

- **Authentication**: Google and Anonymous login
- **Game**: Explore a map and catch Pokemon
- **Pokedex**: View your caught Pokemon collection
- **Bag**: Manage your items and Pokeballs
- **Friends**: Connect with other trainers and trade Pokemon
- **Profile**: Customize your avatar and track your progress

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS
- **Routing**: React Router
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `docs/database-schema.sql` in the Supabase SQL Editor
   - Enable Google OAuth in Supabase Authentication settings
   - Copy your project URL and anon key

4. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
pokemon-explorer/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI components (Button, Card, Modal, etc.)
│   │   ├── layout/     # Layout components (Header, Footer, Navigation)
│   │   ├── game/       # Game-specific components
│   │   ├── pokedex/    # Pokedex components
│   │   ├── inventory/  # Inventory components
│   │   ├── social/     # Social features
│   │   └── profile/    # Profile components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and configurations
│   │   ├── supabase/   # Supabase client and functions
│   │   ├── constants/  # Game constants
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   ├── store/          # Zustand stores
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── docs/               # Documentation
├── package.json
└── vite.config.ts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Phase 1 Status

- [x] Project setup (Vite + React + TypeScript + TailwindCSS)
- [x] Supabase project creation and configuration
- [x] Database schema setup
- [x] Authentication (Google + Anonymous)
- [x] Basic routing structure
- [x] UI component library (Button, Card, Modal, ProgressBar)

## License

MIT
