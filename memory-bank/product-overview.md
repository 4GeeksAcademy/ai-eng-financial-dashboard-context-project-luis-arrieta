# Product Overview

Actualizado: 2026-09-16.

## Que hace el producto

El producto es un dashboard de metricas financieras. La interfaz presenta un encabezado de periodo, cuatro indicadores de rendimiento y dos graficos mensuales: ingresos frente a gastos y margen de beneficio.

La evidencia esta en `frontend/src/App.tsx`, que compone `DashboardHeader`, `KPIRow`, `IncomeOutcomeChart` y `ProfitPercentChart`.

## Flujo visible y de datos

1. La aplicacion solicita `GET /api/metrics` desde `frontend/src/App.tsx`.
2. En desarrollo, `frontend/vite.config.ts` envia `/api` al servicio backend.
3. `backend/app/routes.py` entrega movimientos financieros mock validados por Pydantic.
4. `frontend/src/lib/financial-utils.ts` calcula totales, beneficio, margen y datos mensuales.
5. La interfaz muestra estados de carga, error y ausencia de datos en los componentes del dashboard.

## Limites comprobados

- Los movimientos proceden de generacion mock; no hay cliente de base de datos ni servicio financiero externo en `backend/requirements.txt` o `backend/app/`.
- La interfaz actual solo hace fetch de `/api/metrics`; los otros endpoints publicados no estan conectados a la UI actual.
- Este repositorio no define requisitos para funcionalidades adicionales ni un roadmap de producto.