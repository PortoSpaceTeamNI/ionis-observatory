# ICARUS / IONIS archive

IONIS is Porto Space Team's free ionospheric data exploration website. The current source contains 2,160 explicitly synthetic observations, not ICARUS mission results.

## Reading large selections

The browser queries `GET /api/readings` with the shared mission, UTC date, orbit, density and spatial filters. The server returns totals, density extrema, an altitude histogram, ten catalog rows and a bounded map representation. Catalog search affects the table; spatial and scientific filters affect the map, totals and exports. Layer visibility never changes the export.

- Automatic detail returns individual observations for selections of at most 2,000 readings.
- Larger selections, or an explicit density overview, return latitude/longitude cells with count, arithmetic mean, minimum and maximum density and mean altitude.
- A 10° grid has at most 648 cells; a 5° grid has at most 2,592 cells. Counts include every matching reading; this is aggregation, not a sample.
- Cells combine the selected timestamps and altitudes. They are equal angular cells, not equal area cells, and mean density is not a spatial interpolation or a claim of coverage between readings.
- Selecting a cell opens its statistics. Exploring nearby applies a geographic radius around its center, which may include neighbouring cells; it is not an exact cell-boundary filter.
- Catalog requests return ten records per page. Exports stream all scientifically filtered records directly from the server, avoiding construction of a giant browser download Blob.
- Request cancellation and a short debounce prevent obsolete responses from overwriting new selections. Empty and failed requests have explicit interface states.

`tests/archive.test.ts` checks conservation of counts and weighted means, pagination, filtering, empty selections and a generated 1,000,000-record stream. It verifies a bounded response, not database throughput or multi-user production capacity.

## Connecting the mission database

The current adapter scans an in-memory **demo fixture on the server**. Production ingestion and persistent storage are not implemented. Do not load a real million-record table into this fixture. Replace the adapter with indexed database queries using the same response contract: time/mission/orbit indexes, spatial indexes for radius/corridor selection, grouped density cells and summary statistics, and cursor-based record pagination. Maintain deterministic ordering by timestamp and reading ID. Large exports should use database cursors or queued export jobs to stay within host request-duration limits. Introduce precomputed aggregates for common zoom/time ranges and cache keys that include every scientific filter. Benchmark real workloads before claiming production scale.

## Contributor access

Public reading and export require no account. The prominent contribution button and local CSV picker have been removed. Contributor eligibility is available in the mission page and footer. It explains three separate gates: institutional/provenance evaluation by Porto Space Team, invitation plus two-factor sign-in, and independent dataset review before publication.

**Submissions are closed.** No upload endpoint, applicant collection, authentication provider or review service is connected, and the interface cannot grant itself approval. The read API accepts GET only; POST is rejected. Before enabling submissions, implement server-verified sessions with a second-factor assurance requirement, approved-contributor roles controlled by the team, private upload storage, validation/quarantine, a separate reviewer role and an auditable publication action. Hiding the workspace alone must never authorize uploads.

## Validation

Run `node node_modules/tsx/dist/cli.mjs tests/archive.test.ts`, `npm run typecheck` and `npm run build`. GitHub pushes to `main` trigger Vercel production deployments.
