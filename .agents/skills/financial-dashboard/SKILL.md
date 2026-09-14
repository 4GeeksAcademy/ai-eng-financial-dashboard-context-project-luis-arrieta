# Financial Dashboard Project Skill

## Purpose
This skill helps an agent work efficiently in the Financial Metrics Dashboard project without having to rediscover the app architecture, the data model, or the validation flow each time.

## Project summary
- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Pydantic + pytest
- Data source: deterministic mock financial data generated in the backend
- User-facing goal: deliver a financial dashboard with KPIs, monthly summaries, and charts

## Where to look first
- Architecture and general guidance: `AGENTS.md`
- Project context: `CONTEXTO_PROYECTO_DASHBOARD_FINANCIERO.md`
- Backend routes: `backend/app/routes.py`
- Frontend entry: `frontend/src/App.tsx`
- Shared domain types: `frontend/src/lib/financial-types.ts`
- Calculations: `frontend/src/lib/financial-utils.ts`
- Backend tests: `backend/tests/test_routes.py`

## Typical tasks
- Add or adjust a KPI or summary calculation
- Add a new endpoint or filter
- Align frontend and backend contracts
- Validate behavior with tests or local execution

## Workflow for an agent
1. Read `AGENTS.md` and the relevant rules in `.agents/rules/`.
2. Inspect the backend route or frontend utility that owns the behavior.
3. Update tests before or alongside the fix if behavior changes.
4. Run the minimal validation command for the changed layer.
5. Check that the financial semantics are still consistent: income, outcome, net, profit, and profit margin.

## Do not do
- Do not rebuild the dashboard from scratch.
- Do not remove mock data or change seeded behavior without checking tests.
- Do not change the API contract without updating the documentation and validation.
- Do not add secrets or environment variables to the repo without explicit need.
