# Validate Financial Dashboard

## When to use
Use this skill before considering a dashboard change complete, especially after changing financial calculations, API contracts, filters, loading/error behavior, or chart data.

## Inspect first
- Read `AGENTS.md`, all applicable files in `.agents/rules/`, available skills, and `memory-bank/` if present.
- Check `git status --short --branch` and identify unrelated existing changes.
- Read the changed files and their associated tests before selecting commands.
- For backend changes, inspect `backend/app/routes.py` and `backend/tests/test_routes.py`.
- For frontend changes, inspect `frontend/src/App.tsx`, the affected dashboard component, and `frontend/src/lib/financial-utils.test.ts`.

## Validation sequence
1. Run the narrowest relevant test for the changed behavior.
2. Run the complete frontend test suite when frontend code or shared contracts changed:

```bash
cd frontend && npm test -- --run
```

3. Run frontend static checks:

```bash
cd frontend && npm run build
cd frontend && npm run lint
```

4. Run backend tests when backend code or API contracts changed:

```bash
cd backend && pytest -q
```

5. For cross-layer changes, run both test suites and check the local stack:

```bash
docker compose up --build
```

Verify that `GET /health` returns `{"status":"ok"}`, the frontend loads, `/api/metrics` is reachable through the configured proxy, and there are no visible loading, error, or console failures.

## Acceptance checks
- API response shapes match the documented contracts and frontend types.
- Date filters include both `start_date` and `end_date` boundaries.
- `income`, `outcome`, `net`, `profit`, and margin semantics remain consistent.
- Empty data and zero-income cases do not produce `NaN` or `Infinity`.
- Loading, error, and empty states remain understandable and accessible.
- Mock data remains deterministic with `seed=42` unless intentionally changed.
- No secrets, real `.env` files, generated artifacts, or unrelated changes appear in the diff.

## Reporting
The final report must name files created or modified, list every validation command and its result, identify any blocked checks, and include the final `git status`. Do not claim complete validation when an unavailable dependency or environment issue prevented a check.

## Common mistakes
- Running only a build and assuming behavior is covered.
- Omitting backend tests after changing an endpoint.
- Omitting lint after changing TypeScript or JSX.
- Failing to report a skipped Docker or backend check.
- Treating pre-existing worktree changes as part of the implementation.
