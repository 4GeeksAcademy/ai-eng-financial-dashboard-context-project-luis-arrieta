# Project Architecture Rule

## Scope
This project is a financial metrics dashboard with a React + TypeScript frontend and a FastAPI backend. The main goal is to keep the UI, the data transformation layer, and the API contracts aligned.

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
