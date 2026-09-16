# Coding Conventions Rule

## Scope
Use this rule for frontend, backend, tests, and configuration changes in the dashboard repository.

## Repository evidence
- `frontend/src/App.tsx` delegates derived values to `frontend/src/lib/financial-utils.ts` and visual rendering to `frontend/src/components/dashboard/`.
- `backend/app/routes.py` uses Pydantic models and typed `Literal` aliases for API contracts.
- `backend/tests/test_routes.py` and `frontend/src/lib/financial-utils.test.ts` keep tests close to their respective backend and frontend behavior.
- `.gitignore` excludes real environment files and generated frontend and backend artifacts.

## General principles
- Prefer existing patterns over creating new abstractions.
- Reuse current types and models before introducing new ones.
- Keep UI components focused on rendering and presentation.
- Keep data extraction, filtering, and calculations in reusable utilities or backend routes.

## Frontend
- Use the existing domain types from `frontend/src/lib/financial-types.ts`.
- Keep calculations in utility functions such as `computeKPIs` and `computeMonthlyData`.
- Maintain accessible labels and understandable loading/error states.
- Do not hardcode periods if they can be derived from data or an explicit user selection.

## Backend
- Reuse the existing Pydantic models in `backend/app/routes.py`.
- Preserve current endpoint contracts and response shapes unless the task explicitly requires a change.
- Keep mock data deterministic while the project still uses seeded mock-generated values.
- Add or update tests whenever a filter, endpoint, or calculation changes.

## Validation
- Before calling work complete, run the relevant validation commands.
- If a new financial rule is introduced, document it and update tests.
- Avoid adding dependencies or external services without explicit requirement and documentation.

## Agent workflow
1. Inspect the target module and its closest test before changing code.
2. Reuse current names, types, Pydantic models, and utility boundaries before adding an abstraction or dependency.
3. Keep generated files, credentials, and real `.env` files out of commits.
4. Document a behavioral or contract change in the affected rule or memory note.
