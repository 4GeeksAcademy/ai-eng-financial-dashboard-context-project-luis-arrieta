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
- Project rules: `.agents/rules/`
- Available skills: `.agents/skills/`
- Working memory, if present: `memory-bank/`
- Backend routes: `backend/app/routes.py`
- Frontend entry: `frontend/src/App.tsx`
- Shared domain types: `frontend/src/lib/financial-types.ts`
- Calculations: `frontend/src/lib/financial-utils.ts`
- Backend tests: `backend/tests/test_routes.py`

## Choose a specialized skill
Use this overview skill to route the task, then follow the most specific workflow:

- Adding a KPI, aggregate, derived value, or chart metric: `.agents/skills/add-financial-metric/SKILL.md`
- Adding or changing an endpoint, filter, aggregation, or API response: `.agents/skills/extend-financial-api/SKILL.md`
- Running the final test, build, lint, and integration checks: `.agents/skills/validate-financial-dashboard/SKILL.md`

If a change crosses these areas, apply the relevant implementation skill first and finish with `validate-financial-dashboard`.

## Typical tasks
- Add or adjust a KPI or summary calculation
- Add a new endpoint or filter
- Align frontend and backend contracts
- Validate behavior with tests or local execution

## Workflow for an agent
1. Read `AGENTS.md`, applicable rules, skills, and `memory-bank/` if present before acting.
2. Check `git status`, inspect the repository structure, and identify the owning backend route, frontend utility, or component.
3. Verify the current code and related tests before trusting documentation or changing a contract.
4. Update tests and documentation alongside any behavior or API change.
5. Run the relevant validation commands and report exact results, blockers, and final Git status.
6. Check that the financial semantics remain consistent: income, outcome, net, profit, and profit margin.

## Do not do
- Do not rebuild the dashboard from scratch.
- Do not remove mock data or change seeded behavior without checking tests.
- Do not change the API contract without updating the documentation and validation.
- Do not add secrets or environment variables to the repo without explicit need.
