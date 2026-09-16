# Project State

Actualizado: 2026-09-16.

## Funcionalidades comprobadas

- El backend publica `GET /health` y ocho endpoints bajo `/api/metrics` mediante el router de `backend/app/routes.py`.
- `frontend/src/App.tsx` consulta `GET /api/metrics` y presenta KPIs y graficos derivados de los movimientos recibidos.
- La UI contempla carga, error y ausencia de datos.
- Los movimientos mock se generan con `seed=42` en las rutas; los filtros de fecha usan limites inclusivos.
- Las pruebas actuales cubren rutas backend y utilidades financieras frontend.

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

## Gaps y limites conocidos

- `generate_mock_movements` usa `date.today()` ademas de `seed=42`; los valores aleatorios son repetibles, pero los anos de los datos cambian con el calendario.
- La UI solo consume `/api/metrics`, aunque el backend publica endpoints para facets, summary, categorias, comparacion, alertas y segmentos B2B/B2C.
- CORS permite cualquier origen con credenciales en `backend/app/main.py`; esta configuracion debe tratarse como local hasta que existan requisitos de despliegue.
- Las pruebas existentes no incluyen archivos de pruebas de componentes o fetch de la interfaz; no se debe inferir cobertura de integracion frontend.

No hay prioridades futuras registradas porque el repositorio no justifica un roadmap.