# Coding Conventions Rule

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
