# Validation Workflow Rule

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
