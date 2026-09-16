# Project Architecture Rule

## Scope
This project is a financial metrics dashboard with a React + TypeScript frontend and a FastAPI backend. The main goal is to keep the UI, the data transformation layer, and the API contracts aligned.

## Repository evidence
- `frontend/src/App.tsx` fetches `/api/metrics`, maintains loading and error state, and composes the dashboard.
- `frontend/vite.config.ts` proxies `/api` to `http://backend:8000` for local development.
- `backend/app/main.py` creates the FastAPI application and includes the router defined in `backend/app/routes.py`.
- `backend/app/routes.py` owns Pydantic response models, mock generation, filters, aggregates, and route decorators.

## Repository structure
- `backend/app/`: API application code
  - `main.py`: FastAPI app bootstrap and middleware configuration
  - `routes.py`: models, mock data generation, filtering, summaries, comparisons, alerts, and endpoints
- `backend/tests/`: backend validation tests
- `frontend/src/`: React application entry and UI
  - `App.tsx`: orchestration of fetching and rendering the dashboard
  - `components/dashboard/`: dashboard-specific visual components
  - `lib/financial-types.ts`: domain types reused across the app
  - `lib/financial-utils.ts`: calculations and transformations used by the UI
  - `lib/mock-data.ts`: static mock dataset kept for legacy reference; verify usage before changing it
- `docker-compose.yml`: local environment startup for both services

## Data flow
1. The frontend calls `GET /api/metrics`.
2. The backend generates deterministic mock movements with `seed=42`.
3. The response is a list of `FinancialMovement` items.
4. The frontend computes KPIs and monthly summaries from this list.
5. Charts and cards render the aggregated data.

## Where to modify functionality
- API changes: `backend/app/routes.py`
- Business rules and calculations: `backend/app/routes.py` and `frontend/src/lib/financial-utils.ts`
- Shared domain types: `frontend/src/lib/financial-types.ts`
- Dashboard composition: `frontend/src/App.tsx`
- Visual presentation: `frontend/src/components/dashboard/`

## Guardrails
- Do not duplicate financial logic inside UI components.
- Reuse the existing domain types and validation models.
- Keep date filtering inclusive.
- Preserve API contracts unless the task explicitly changes them.
- Validate any change against tests before calling it complete.

## Agent workflow
1. Locate the owner using the responsibilities above before editing.
2. For API changes, inspect the Pydantic model, route decorator, relevant frontend type, and tests together.
3. For UI changes, keep fetch orchestration in `App.tsx`, calculations in `lib/financial-utils.ts`, and presentation in `components/dashboard/`.
4. Check the OpenAPI schema when changing an endpoint response or query parameter.
