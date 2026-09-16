# Project State

Actualizado: 2026-09-16.

## Arquitectura actual

- Frontend: React, TypeScript, Vite, Tailwind CSS y Recharts.
- Backend: FastAPI y Pydantic.
- Fuente de datos: movimientos mock generados en backend con `seed=42`.
- Ejecucion integrada: Docker Compose, frontend en `5173` y backend en `8000`.

## Flujo de datos

1. `frontend/src/App.tsx` solicita `GET /api/metrics`.
2. `backend/app/routes.py` genera, filtra y ordena movimientos financieros.
3. `frontend/src/lib/financial-utils.ts` calcula KPIs, datos mensuales y etiqueta de periodo.
4. Los componentes de `frontend/src/components/dashboard/` presentan KPIs y graficos.

## Responsabilidades

- Contratos, modelos Pydantic, mock data, filtros y agregaciones: `backend/app/routes.py`.
- Arranque de FastAPI y CORS: `backend/app/main.py`.
- Tipos del frontend: `frontend/src/lib/financial-types.ts`.
- Calculos reutilizables del frontend: `frontend/src/lib/financial-utils.ts`.
- Orquestacion de fetch, loading y error: `frontend/src/App.tsx`.
- Tests backend: `backend/tests/test_routes.py`.
- Tests de calculos frontend: `frontend/src/lib/financial-utils.test.ts`.

## Decisiones vigentes

- No rehacer el dashboard ni anadir servicios financieros reales sin requisito explicito.
- Importes de movimientos son positivos; `operation_type` define si aportan a ingreso o gasto.
- Fechas de filtros son inclusivas.
- El codigo real, tests y OpenAPI son la referencia funcional. No inventar campos desde documentacion.
- No almacenar secretos, archivos `.env` reales ni artefactos generados.