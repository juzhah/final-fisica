# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite, hot reload)
npm run build    # Production build → /dist
npm run preview  # Serve the production build locally
```

No test runner or linter is configured.

## Architecture

This is a React + Vite single-page application that simulates uniform acceleration (Movimiento Uniformemente Acelerado — MUA) for physics education. The UI is in Spanish.

**State lives entirely in `App.jsx`**: acceleration values (up to 3) and dark mode toggle. No global state library is used.

**Data flow:**
1. User enters up to 3 acceleration values (m/s²) via `AccelerationInputs.jsx`
2. On submit, `App.jsx` calls `generateSimulationData(accelerations)` from `src/utils/simulation.js`
3. The result (101 data points, t = 0–10 s at 0.1 s intervals) is passed as props to both `SimulationChart.jsx` and `DataTable.jsx`

**Physics core** (`src/utils/simulation.js`): pure function, no side effects. Applies kinematic equations:
- Position: `x = ½·a·t²`
- Velocity: `v = a·t`

**Charting**: Recharts `LineChart` renders position-vs-time and velocity-vs-time graphs side by side. Colors are fixed: blue (#60A5FA), green (#34D399), yellow (#FBBF24) for the three acceleration series.

**Styling**: Tailwind CSS utility classes throughout; dark mode is controlled by a `darkMode` boolean passed as a prop (not via `class="dark"` on `<html>`). Responsive grid switches from 1 column (mobile) to 2 columns (lg+).

## Deployment

Deployed to Railway via `npm run preview -- --host 0.0.0.0 --port $PORT`. Configuration lives in `railway.json` and `nixpacks.toml`. There is no separate backend or API.
