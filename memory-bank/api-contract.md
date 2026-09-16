# API Contract

Actualizado: 2026-09-16. Trazado desde `backend/app/routes.py` y el esquema OpenAPI generado por `backend/app/main.py`.

## Valores validados

- `operation_type`: `income` | `outcome`.
- `category`: `suppliers` | `sales` | `operational` | `administrative` | `others`.
- `business_type`: `B2B` | `B2C`.
- `group_by`: `day` | `week` | `month`.

## Endpoints

- `GET /health`: devuelve `{"status":"ok"}`.
- `GET /api/metrics`: `FinancialMovement[]`; filtros `start_date`, `end_date`, `category`, `operation_type`.
- `GET /api/metrics/facets`: `MetricsFacets`.
- `GET /api/metrics/summary`: `MetricsSummaryItem[]`; filtros `group_by`, `start_date`, `end_date`, `category`, `operation_type`, `business_type`.
- `GET /api/metrics/categories/top`: `TopCategoryItem[]`; filtros `operation_type`, `limit` (1 a 20), `start_date`, `end_date`, `business_type`.
- `GET /api/metrics/comparison`: `MetricsComparison`; requiere `start_date` y `end_date`; acepta `business_type`.
- `GET /api/metrics/alerts`: `MetricsAlert[]`; filtros `threshold` (minimo 0), `group_by`, `start_date`, `end_date`, `business_type`.
- `GET /api/metrics/b2b` y `GET /api/metrics/b2c`: `FinancialMovement[]`; filtros `start_date`, `end_date`, `category`, `operation_type`.

## Modelos publicados

- `FinancialMovement`: `create_date`, `amount`, `operation_type`, `category`, `business_type`.
- `MetricsFacets`: `operation_types`, `business_types`, `categories`, `min_date`, `max_date`.
- `MetricsSummaryItem`: `period`, `income`, `outcome`, `net`.
- `TopCategoryItem`: `category`, `operation_type`, `total_amount`.
- `MetricsComparison`: `current_period`, `previous_period`, `delta_abs`, `delta_pct`; `delta_pct` puede ser `null` si el periodo previo vale cero.
- `MetricsAlert`: `period`, `outcome_total`, `baseline_average`, `increase_ratio`.

## Reglas financieras

- Total Income = suma de `amount` para `income`.
- Total Outcome = suma de `amount` para `outcome`.
- Profit/Net = Total Income - Total Outcome.
- Profit Margin = Profit / Total Income * 100; con ingreso cero, el margen es `0`.
- La interfaz no debe mostrar `NaN` ni `Infinity`.