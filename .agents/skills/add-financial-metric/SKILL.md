# Add Financial Metric

## When to use
Use this skill when adding a KPI, aggregate, derived financial value, or chart metric to the dashboard. This includes totals, net/profit values, margins, monthly values, and other calculations based on financial movements.

## Inspect first
- Read `AGENTS.md`, applicable files in `.agents/rules/`, available skills, and `memory-bank/` if present.
- Run `git status` and inspect the current code before relying on documentation.
- Inspect `frontend/src/lib/financial-types.ts` for existing domain and result types.
- Inspect `frontend/src/lib/financial-utils.ts` and `frontend/src/lib/financial-utils.test.ts` for frontend calculations and test patterns.
- Inspect `backend/app/routes.py` and `backend/tests/test_routes.py` when the metric must be computed or exposed by the API.
- Inspect `frontend/src/App.tsx` and the affected dashboard component when the metric is displayed.

## Implementation steps
1. Define the metric's business meaning and formula before editing code.
2. Decide whether the metric belongs in backend aggregation, frontend transformation, or both. Keep API aggregation in `backend/app/routes.py`, reusable UI calculations in `frontend/src/lib/financial-utils.ts`, and rendering in dashboard components.
3. Reuse existing `FinancialMovement`, Pydantic models, TypeScript types, and endpoint response shapes where possible.
4. Add focused tests for normal values, empty data, zero income, and any date or business-type filters involved.
5. Update the relevant rule or project documentation when the metric introduces a new concept, formula, or response field.
6. Keep rounding at the presentation or response boundary and avoid rounding intermediate values repeatedly.

## Financial constraints
- Movement amounts are positive. `operation_type` determines whether an amount is income or outcome.
- `Total Income` sums `income` movements; `Total Outcome` sums `outcome` movements.
- `Profit` or `net` is income minus outcome.
- `Profit Margin` is profit divided by income times 100. It must be `0` when income is zero.
- Never expose or render `NaN` or `Infinity`.
- Preserve valid categories (`sales`, `suppliers`, `operational`, `administrative`, `others`) and business types (`B2B`, `B2C`).
- Preserve inclusive date filters and deterministic mock generation with `seed=42`.

## Validation
Run the smallest relevant checks first:

```bash
cd frontend && npm test -- --run
cd backend && pytest -q
```

Run both layers when the metric crosses the API/UI boundary, then run the frontend build and lint:

```bash
cd frontend && npm run build
cd frontend && npm run lint
```

## Common mistakes
- Duplicating the formula inside a visual component.
- Treating outcome amounts as already negative.
- Dividing by zero for margin calculations.
- Hardcoding a period instead of deriving it from movement dates or an explicit selection.
- Changing an API response shape without updating tests and documentation.
- Using the legacy `frontend/src/lib/mock-data.ts` without confirming that it is the intended data source.
