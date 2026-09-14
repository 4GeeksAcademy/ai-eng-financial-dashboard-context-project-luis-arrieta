# Financial Domain Rule

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
