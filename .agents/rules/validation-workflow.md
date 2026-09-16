# Validation Workflow Rule

## Scope
Use this rule to select, run, and report checks after changing source code, API contracts, tests, or build configuration.

## Repository evidence
- `frontend/package.json` defines `test`, `build`, and `lint` scripts.
- `backend/tests/test_routes.py` is the backend test suite and `backend/requirements.txt` declares pytest.
- `docker-compose.yml` defines the frontend and backend services used for local integration.
- `frontend/src/App.tsx` depends on `/api/metrics`, so API contract changes can affect both layers.

## Required checks
For this project, validation must be reproducible and match the real stack:

### Backend
- `cd backend && pytest -q`

### Frontend
- `cd frontend && npm test -- --run`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`

### Full local stack
- `docker compose up --build`

## Before claiming success
- Confirm the repo is clean and the branch is the expected one.
- Read the impacted file(s) and associated tests.
- Run only the relevant test set for the change.
- If a bug is found, reproduce it and fix the root cause rather than patching symptoms.

## Acceptance bar
A change is not ready if:
- tests are missing for the modified logic,
- the API contract changed without documentation,
- the financial formulas are inconsistent with domain rules,
- the frontend/ backend do not agree on the shape of the data.

## Agent workflow
1. Start with `git status`, the affected files, and the nearest tests.
2. Run the narrowest relevant test before broader checks.
3. Run frontend test, build, and lint for frontend, shared-contract, or build changes; run backend pytest for backend or API changes.
4. Use Docker Compose for cross-service changes and verify the service endpoints configured by the repository.
5. Run `git diff --check`, inspect the final status, and report every executed or blocked validation.
