import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { KPIRow } from "@/components/dashboard/kpi-row";
import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "@/lib/financial-types";
import {
  computeKPIs,
  computeMonthlyData,
  formatPeriodLabel,
} from "@/lib/financial-utils";

const IncomeOutcomeChart = lazy(() =>
  import("@/components/dashboard/income-outcome-chart").then((module) => ({
    default: module.IncomeOutcomeChart,
  })),
);

const ProfitPercentChart = lazy(() =>
  import("@/components/dashboard/profit-percent-chart").then((module) => ({
    default: module.ProfitPercentChart,
  })),
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchFinancialData(): Promise<FinancialMovement[]> {
  const response = await fetch(`${API_BASE_URL}/api/metrics`);
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

function App() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [periodLabel, setPeriodLabel] = useState("No data");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinancialData()
      .then((movements) => {
        const nextMetrics = computeKPIs(movements);
        const nextMonthlyData = computeMonthlyData(movements);
        const nextPeriodLabel = formatPeriodLabel(movements);

        startTransition(() => {
          setMetrics(nextMetrics);
          setMonthlyData(nextMonthlyData);
          setPeriodLabel(nextPeriodLabel);
          setLoading(false);
        });
      })
      .catch(() => {
        setError(
          "No se pudo cargar la informacion financiera. Revisa la API de backend.",
        );
        setLoading(false);
      });
  }, []);

  return (
    <main
      className="dark min-h-screen bg-background text-foreground"
      aria-busy={loading}
      aria-live="polite"
    >
      {loading ? (
        <span
          className="sr-only"
          role="status"
          aria-label="Cargando datos financieros"
        >
          Cargando datos financieros
        </span>
      ) : null}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period={periodLabel} />

          {error ? (
            <div
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          ) : null}

          <section aria-label="Indicadores clave de rendimiento" role="region">
            <KPIRow metrics={metrics} loading={loading} />
          </section>

          <section
            aria-label="Gráficos financieros"
            role="region"
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <Suspense
              fallback={
                <div
                  className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground"
                  role="status"
                >
                  Cargando gráficos…
                </div>
              }
            >
              <IncomeOutcomeChart data={monthlyData} loading={loading} />
            </Suspense>
            <Suspense
              fallback={
                <div
                  className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground"
                  role="status"
                >
                  Cargando margen de beneficio…
                </div>
              }
            >
              <ProfitPercentChart data={monthlyData} loading={loading} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
