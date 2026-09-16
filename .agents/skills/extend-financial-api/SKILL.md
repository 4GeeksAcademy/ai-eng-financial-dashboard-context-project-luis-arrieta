# Extend Financial API

## When to use
Use this skill when adding or changing a FastAPI endpoint, query filter, aggregation, response model, comparison, alert, or business-type view in the financial metrics API.

## Inspect first
- Read `AGENTS.md`, `.agents/rules/project-architecture.md`, `.agents/rules/financial-domain.md`, and `.agents/rules/validation-workflow.md`.
- Inspect `backend/app/routes.py` for existing `Literal` types, Pydantic models, filtering helpers, aggregation helpers, and route patterns.
- Inspect `backend/tests/test_routes.py` for endpoint and helper test conventions.
- Inspect `backend/app/main.py` before changing middleware, router inclusion, or CORS.
- Inspect the frontend callers and `CONTEXTO_PROYECTO_DASHBOARD_FINANCIERO.md` before changing a response contract.

## Implementation steps
1. Identify the owning helper, model, and route before editing.
2. Preserve existing endpoints and response shapes unless the task explicitly requires a contract change.
3. Reuse `FinancialMovement` and the existing `OperationType`, `Category`, `BusinessType`, and `GroupBy` types.
4. Apply date filters inclusively through the existing filtering helpers.
5. Keep business-type filtering consistent with `B2B` and `B2C` routes and query parameters.
6. Keep mock data reproducible by calling `generate_mock_movements(seed=42)` unless deterministic behavior is intentionally changed and documented.
7. Add tests for valid parameters, combined filters, empty results where relevant, invalid enum values, and response fields.
8. Update API documentation and project rules when a contract or financial rule changes.

## Contract constraints
The current API includes:

- `GET /health`
- `GET /api/metrics`
- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`

Financial rules remain authoritative:

- amounts are positive;
- income contributes positively and outcome contributes negatively to net/profit;
- margin is `profit / total income * 100`, or `0` when income is zero;
- `delta_pct` may be `null` when the comparison baseline is zero;
- percentage values must not become `NaN` or `Infinity`.

## Validation
Run backend tests first:

```bash
cd backend && pytest -q
```

When the API response is consumed by the frontend, also run:

```bash
cd frontend && npm test -- --run
cd frontend && npm run build
cd frontend && npm run lint
```

For an integration check, start the stack and verify `/health`, `/api/metrics`, and the frontend proxy:

```bash
docker compose up --build
```

## Common mistakes
- Adding a second filtering implementation instead of reusing `filter_movements`.
- Making date boundaries exclusive.
- Accepting arbitrary strings instead of the existing literal/Pydantic validation.
- Returning a different field name or numeric meaning than the frontend expects.
- Computing a percentage without defining zero-baseline behavior.
- Removing deterministic mock generation or introducing real services and secrets without an explicit requirement.
