# IONIS · ICARUS Ionosphere Observatory

A free ionospheric data observatory for the **ICARUS project by Porto Space Team**. Explore plasma density around a 3D Earth, select regions and orbits, and download readings for research and education.

**[Open the observatory](https://ionis-observatory.vercel.app)** · [Architecture and data handling](ARCHITECTURE.md) · [Publishing and updates](DEPLOYMENT.md)

Public exploration and downloads require no account. The current archive contains **2,160 synthetic demonstration readings**, not ICARUS mission observations.

**Project owner:** [Porto Space Team](https://github.com/PortoSpaceTeamNI)
**Credits:** BOBDINHO, EduardoSilva

See [AUTHORS.md](AUTHORS.md) for attribution.

**Live website:** https://ionis-observatory.vercel.app

**Source repository:** https://github.com/PortoSpaceTeamNI/ionis-observatory

## Features

- Interactive textured 3D Earth, measurement inspection, orbit tracks and layer controls.
- Shared mission/date/orbit/density filters, coordinate-radius searches and great-circle path corridors.
- Server-paged catalog, bounded spatial density aggregation and streaming CSV/JSON exports with explicit synthetic-data provenance.
- Restricted contributor eligibility information outlining the planned team evaluation, two-factor sign-in and independent dataset review. Uploads are closed; authentication and approvals are not yet connected.
- Responsive desktop/mobile layout, accessible controls and optional WebMCP filtering.

## Data and production scope

The 2,160 records, spacecraft names, orbit IDs and quality flags are synthetic demonstrations. Geographic selection uses a spherical Earth with a 6,371 km radius. Orbit trajectories illustrate sample geometry; they do not propagate mission TLEs. No production authentication, persistent measurement database, contributor certification or remote upload service is included. No files can be submitted. See [ARCHITECTURE.md](ARCHITECTURE.md) for the large-data query contract, million-record aggregation test and requirements for connecting a production database and approved-contributor authentication.

## Large datasets

The browser receives summaries and ten catalog rows per page rather than the entire archive. Selections above 2,000 readings automatically use density cells; each cell retains its count, mean and density range. Choose a 10° overview or a finer 5° grid, then explore nearby to inspect individual readings. CSV and JSON downloads stream from the server.

Aggregation tests passed with **one million synthetic readings**, preserving the total count with a bounded map response. This validates the aggregation logic, not production database capacity. The current server uses a demonstration fixture; a persistent, indexed mission database is the next integration step.

## Contributor access

Reading is free; publishing requires scientific accountability. The planned process is:

1. Porto Space Team evaluates the researcher's identity, instrument documentation and data provenance.
2. Approved contributors receive an invitation and use two-factor sign-in.
3. Each dataset undergoes independent quality and provenance review before publication.

**Submissions are currently closed.** The website has no public upload form or working contributor account service. Please do not post private identity documents or unpublished mission data in public issues.

## Development

Built with Next.js, React, TypeScript and Three.js, and hosted on Vercel.
Use Node.js 22 LTS. Install dependencies with `npm ci`, then run `npm run dev` and open http://localhost:3000.

Run `npm run typecheck` to check TypeScript. Run `npm run build` for a production build, then `npm start` to serve that build locally.

The frontend does not require API keys, environment variables, a database, or a paid external data service.

The main interface is in `app/page.tsx`, the globe in `components/globe.tsx`, the read API in `app/api/readings/route.ts`, aggregation in `lib/archive.ts`, the synthetic fixture in `lib/demo-readings.ts`, geodesic helpers in `lib/mission.ts`, and styling in `app/globals.css`.

Earth imagery is sourced from the Three.js Earth examples: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg

## Publish and update

This repository is connected to Vercel, with `main` as the production branch. The configuration uses Next.js, the repository root and Node.js 22.x. The included `vercel.json` supplies the install and build commands.

Pushes to `main` automatically deploy production updates. Feature branches and pull requests receive preview deployments. No separate deploy command or Vercel token in GitHub Actions is needed.

See [DEPLOYMENT.md](DEPLOYMENT.md) for setup, update, and rollback instructions.

## Original Sites deployment

The original hosting configuration is retained for reference. The optional `sites:dev`, `sites:build`, and `sites:start` commands target the previous Vinext/Cloudflare runtime. Standard `dev`, `build`, and `start` commands target Next.js/Vercel. Do not use `dist` as Vercel's output directory.

## Next integration stage
Connect the existing read API to a persistent, indexed measurements database. Add certified contributor identity, two-factor authentication, private submission storage, provenance, review queues and dataset licensing before opening real submissions. Public availability does not by itself grant a reuse license; future datasets must state their permissions explicitly.
