# Financial Domain Rule

## Scope
Use this rule for movement amounts, filters, aggregates, percentages, comparisons, alerts, and displayed KPIs.

## Repository evidence
- `backend/app/routes.py` defines the allowed operation, category, business, and grouping values with `Literal` types.
- `filter_movements_by_date` uses inclusive `>=` and `<=` boundaries.
- `calculate_net_value`, `summarize_movements`, and `frontend/src/lib/financial-utils.ts` calculate income, outcome, and profit from positive movement amounts.
- `computeKPIs` and `computeMonthlyData` return a zero margin when income is zero.

## Core concepts
- `income`: a positive inflow of money.
- `outcome`: a positive expense or outgoing payment.
- `net`: income minus outcome.
- `profit`: same semantic as net in the dashboard context.
- `profitPercent` or `profit margin`: profit divided by income, expressed as a percentage.

## Valid values
- `operation_type`: `income` | `outcome`
- `category`: `sales` | `suppliers` | `operational` | `administrative` | `others`
- `business_type`: `B2B` | `B2C`

## Formula rules
For a set of movements:
- total income = sum of `amount` where `operation_type == "income"`
- total outcome = sum of `amount` where `operation_type == "outcome"`
- profit/net = total income - total outcome
- profit margin = (profit / total income) * 100

If total income is zero, margin should be `0` instead of `Infinity` or `NaN`.

## Data conventions
- Monetary values use floats in backend mock data, which matches current project conventions.
- Do not change the project to `Decimal` or other precision strategies without a justified reason and updated tests.
- Dates are inclusive in filters.
- Movement amounts are positive; the operation type decides whether they count as income or outcome.

## Alerting and comparison
- `delta_pct` is a percentage, not an absolute delta.
- `delta_pct` may be `null` when the previous period is zero.
- Avoid presenting percentage values that are `NaN`, `Infinity`, or negative unless the business logic explicitly expects them.

## Agent workflow
1. State the formula and zero-value behavior before changing a financial calculation.
2. Reuse the existing filters and literal values instead of accepting arbitrary strings or treating outcomes as negative inputs.
3. Update backend and frontend tests when a shared formula or API aggregate changes.
4. Verify an empty or zero-income dataset cannot surface `NaN` or `Infinity` in the UI.
