# IONIS — Ionosphere Observatory

A complete responsive CubeSat mission frontend built with Next.js, React, TypeScript and Three.js. Prepared for GitHub-backed deployments on Vercel.

**Project owner:** [Porto Space Team](https://github.com/PortoSpaceTeamNI)
**Credits:** BOBDINHO, EduardoSilva

See [AUTHORS.md](AUTHORS.md) for attribution.

**Live website:** https://ionis-observatory.vercel.app

**Source repository:** https://github.com/PortoSpaceTeamNI/ionis-observatory

## Features
- Interactive textured 3D Earth, measurement inspection, orbit tracks and layer controls.
- Shared mission/date/orbit/density filters, coordinate-radius searches and great-circle path corridors.
- Paginated searchable catalog, CSV and JSON exports with explicit synthetic-data provenance.
- Contributor preview with CSV template, local validation and clear submission limitations.
- Responsive desktop/mobile layout, accessible controls and optional WebMCP filtering.

## Data and production scope
The 2,160 records, spacecraft names, orbit IDs and quality flags are synthetic demonstrations. Geographic selection uses a spherical Earth with a 6,371 km radius. Orbit trajectories illustrate sample geometry; they do not propagate mission TLEs. No production authentication, persistent measurement database, contributor certification or remote upload service is included. CSV files are validated locally and never submitted.

## Development
Use Node.js 22 LTS. Install dependencies with `npm ci`, then run `npm run dev` and open http://localhost:3000.

Run `npm run typecheck` to check TypeScript. Run `npm run build` for a production build, then `npm start` to serve that build locally.

The frontend does not require API keys, environment variables, a database, or a paid external data service.

The main interface is in `app/page.tsx`, the globe in `components/globe.tsx`, shared data and geodesic helpers in `lib/mission.ts`, and styling in `app/globals.css`.

Earth imagery is sourced from the Three.js Earth examples: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg

## Publish and update

Push this repository to GitHub, then import that repository into Vercel. Use the Next.js framework preset, repository root as the root directory, Node.js 22.x, and `main` as the production branch. The included `vercel.json` supplies the install and build commands. Leave the output directory at its Next.js default.

Once Vercel is linked to GitHub, pushes to `main` automatically deploy production updates. Feature branches and pull requests receive preview deployments. No separate deploy command or Vercel token in GitHub Actions is needed.

See [DEPLOYMENT.md](DEPLOYMENT.md) for setup, update, and rollback instructions.

## Original Sites deployment

The original hosting configuration is retained for reference. The optional `sites:dev`, `sites:build`, and `sites:start` commands target the previous Vinext/Cloudflare runtime. Standard `dev`, `build`, and `start` commands target Next.js/Vercel. Do not use `dist` as Vercel's output directory.

## Next integration stage
Replace the synthetic data module with paginated mission API queries. Add a persistent measurements database, server-side filtering and exports, certified contributor identity, provenance, review queues, and dataset licensing before opening real submissions.

