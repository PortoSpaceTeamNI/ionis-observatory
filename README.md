# IONIS — Ionosphere Observatory

A complete responsive CubeSat mission frontend built with React, TypeScript, Vinext and Three.js.

## Features
- Interactive textured 3D Earth, measurement inspection, orbit tracks and layer controls.
- Shared mission/date/orbit/density filters, coordinate-radius searches and great-circle path corridors.
- Paginated searchable catalog, CSV and JSON exports with explicit synthetic-data provenance.
- Contributor preview with CSV template, local validation and clear submission limitations.
- Responsive desktop/mobile layout, accessible controls and optional WebMCP filtering.

## Data and production scope
The 2,160 records, spacecraft names, orbit IDs and quality flags are synthetic demonstrations. Geographic selection uses a spherical Earth with a 6,371 km radius. Orbit trajectories illustrate sample geometry; they do not propagate mission TLEs. No production authentication, persistent measurement database, contributor certification or remote upload service is included. CSV files are validated locally and never submitted.

## Development
Install dependencies with `npm ci`, then `npm run dev`. Run `npm run build` for the Cloudflare-compatible production output. Type-check with `npx tsc --noEmit`.

The main interface is in `app/page.tsx`, the globe in `components/globe.tsx`, shared data and geodesic helpers in `lib/mission.ts`, and styling in `app/globals.css`.

Earth imagery is sourced from the Three.js Earth examples: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg

## Next integration stage
Replace the synthetic data module with paginated mission API queries. Add a persistent measurements database, server-side filtering and exports, certified contributor identity, provenance, review queues, and dataset licensing before opening real submissions.
