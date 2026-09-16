# Verification Log

## Phase 1: Handover Understanding

Date: 2026-09-16.

### Verified project summary

| Status | Claim | Evidence |
| --- | --- | --- |
| ✅ | The repository contains a React + TypeScript frontend and a FastAPI backend. | `frontend/package.json`; `backend/app/main.py` |
| ✅ | Docker Compose defines `frontend` and `backend` services. | `docker-compose.yml` |
| ✅ | The frontend is exposed on port 5173 and the backend on ports 8000 and 5678. | `docker-compose.yml`; `frontend/Dockerfile`; `backend/Dockerfile` |
| ✅ | The frontend entry point orchestrates a request to `GET /api/metrics`, loading, error, KPIs, and charts. | `frontend/src/App.tsx` |
| ✅ | The Vite development server proxies `/api` to the backend service on port 8000. | `frontend/vite.config.ts` |
| ✅ | FastAPI is created in `backend/app/main.py`, which includes the router from `backend/app/routes.py`. | `backend/app/main.py` |
| ✅ | The backend uses deterministic mock movements when routes call `generate_mock_movements(seed=42)`. | `backend/app/routes.py` |
| ✅ | The published API has 9 GET endpoints: `/health` and 8 endpoints under `/api/metrics`. | `backend/app/routes.py`; FastAPI OpenAPI generated from `backend/app/main.py` |
| ✅ | The repository provides frontend test, build, and lint scripts. | `frontend/package.json` |
| ✅ | The documented local startup command is `docker compose up --build`. | `README.md`; `README.es.md` |
| ❌ | “The backend has 8 endpoints.” | Corrected after checking route decorators and OpenAPI: it has 9 endpoints. |
| ❓ | This checkout is a fork owned by the current contributor. | Remote ownership cannot be established from tracked source files alone. |
| ❓ | Services are currently running. | Docker configuration and commands are verified; runtime state must be checked when a task requires it. |

### Confirmed data flow

1. `frontend/src/App.tsx` requests `/api/metrics`.
2. `frontend/vite.config.ts` forwards `/api` to `http://backend:8000` during local development.
3. `backend/app/main.py` includes the API router.
4. `backend/app/routes.py` generates mock movements, filters and aggregates them, then returns Pydantic response models.
5. `frontend/src/lib/financial-utils.ts` transforms returned movements into KPI and monthly chart data.

### Discovered execution commands

```bash
docker compose up --build
cd frontend && npm test -- --run
cd frontend && npm run build
cd frontend && npm run lint
cd backend && pytest -q
```

### Handover limitations

- The README describes the stack and local startup but does not describe every endpoint or financial calculation.
- API field names must be derived from Pydantic models and FastAPI OpenAPI, not inferred from UI labels.
- Frontend calculations and backend aggregates both encode financial semantics; future changes must inspect both layers.
- Runtime health is not claimed by this document until the relevant command is executed and recorded.

## Phase 2: Engineering Findings

Date: 2026-09-16.

| Category | Repository fact | Risk for future work | Proposed rule |
| --- | --- | --- | --- |
| Architecture | `backend/app/routes.py` defines Pydantic models, helpers, and all API routes; `backend/app/main.py` only creates the application and includes the router. | Route, model, or calculation changes can be made in the wrong layer. | Treat `routes.py` as the owner of API contracts and financial server calculations; keep application wiring in `main.py`. |
| API contract | Route decorators declare `response_model` values using `FinancialMovement`, `MetricsFacets`, `MetricsSummaryItem`, `TopCategoryItem`, `MetricsComparison`, and `MetricsAlert`. | UI labels or untyped assumptions can introduce response fields not published by FastAPI. | Derive API field names and allowed values from Pydantic models and OpenAPI; update frontend types and tests with every contract change. |
| Financial domain | `filter_movements_by_date` uses `>=` and `<=`; backend and frontend calculate income, outcome, and profit separately. | A duplicate or altered formula can make KPIs disagree with API aggregates or make date boundaries exclusive. | Reuse filtering helpers and preserve positive movement amounts, inclusive dates, and zero-income margin behavior. |
| Determinism | API routes call `generate_mock_movements(seed=42)`, while the generator also uses `date.today()`. | Random values are repeatable, but calendar years shift as time passes. | Preserve `seed=42` for route behavior and avoid date-dependent assertions unless the test supplies or controls the current date. |
| Frontend | `frontend/src/App.tsx` owns data fetching, loading, and error state; `frontend/src/lib/financial-utils.ts` owns KPI and monthly transformations. | Moving calculations into chart or card components would duplicate business logic and make unit testing harder. | Keep presentation in `components/dashboard/`, data orchestration in `App.tsx`, and reusable calculations in `financial-utils.ts`. |
| Testing | `backend/tests/test_routes.py` exercises route behavior and inclusive dates; `frontend/src/lib/financial-utils.test.ts` exercises financial utility behavior. | API changes can pass one layer while breaking the other, especially when names or formulas drift. | For API or shared financial changes, update focused tests in both affected layers and run frontend test/build/lint plus backend pytest. |
| Security | `backend/app/main.py` configures `allow_origins=["*"]` and `allow_credentials=True`. | The open development CORS policy should not be assumed safe for a production deployment. | Treat CORS as development configuration unless deployment requirements explicitly define restricted origins; do not add secrets or real environment files. |
| Developer experience | The repository has no root, frontend, or backend `.dockerignore` file. | Docker builds may send generated dependencies and build artifacts in the context. | Before changing Docker setup, inspect build context exclusions and add a scoped `.dockerignore` only when verified as needed by the build. |

### Findings deliberately excluded

- No product roadmap or requested feature was inferred from the currently unused API endpoints.
- No code-style preference was proposed unless it maps to an existing source, test, or configuration file.
- No production deployment design was inferred from the local Docker Compose configuration.

## Phase 3: Rule Implementation and Trial

Date: 2026-09-16.

### Rule refinements

- `.agents/rules/project-architecture.md` identifies the ownership boundary between FastAPI wiring, routes, frontend orchestration, transformations, and presentation.
- `.agents/rules/financial-domain.md` ties formulas, inclusive dates, allowed values, and zero-income behavior to their backend and frontend implementations.
- `.agents/rules/coding-conventions.md` ties type reuse, test location, generated-file hygiene, and documentation updates to existing repository patterns.
- `.agents/rules/validation-workflow.md` maps validation choices to scripts, tests, Docker Compose, and cross-layer API dependencies.

Each rule now includes scope, repository evidence, actionable workflow, restrictions, and validation guidance.

### Small rule-guided task

| Rule applied | Task | Evidence | Result |
| --- | --- | --- | --- |
| Developer-experience finding in `coding-conventions.md` and `validation-workflow.md` | Add scoped Docker build exclusions without changing application code. | `docker-compose.yml` uses `./frontend` and `./backend` as build contexts; no `.dockerignore` existed in either context. | Added `frontend/.dockerignore` and `backend/.dockerignore`; `docker compose build` completed successfully for both services. |

### Observed validation

- Docker reported a frontend build context of `2.00 kB` and a backend context of `1.24 kB` after the exclusions.
- Both `COPY . .` Dockerfile steps completed and both images were built.
- The trial did not add product features, change API contracts, or alter dashboard presentation.

## Phase 4: Project Memory Bank

Date: 2026-09-16.

- Rebuilt `memory-bank/` around a product overview, technical stack, verified project state, API contract, and validation record.
- Verified every cited repository path and confirmed the API route count remains 9.
- Recorded observed limitations only: mock data, calendar-dependent mock years, UI consumption limited to `/api/metrics`, open development CORS, and missing frontend component/fetch tests.
- Excluded product roadmaps and unverified feature plans because the repository provides no evidence for them.