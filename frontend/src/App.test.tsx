import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("@/components/dashboard/income-outcome-chart", () => ({
  IncomeOutcomeChart: () => <div>Grafico de ingresos y gastos</div>,
}));

vi.mock("@/components/dashboard/profit-percent-chart", () => ({
  ProfitPercentChart: () => <div>Grafico de margen de beneficio</div>,
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App", () => {
  it("announces its loading state", () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));

    render(<App />);

    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("status", { name: "Cargando datos financieros" }),
    ).toBeInTheDocument();
  });

  it("announces an API error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    render(<App />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudo cargar la informacion financiera.",
    );
    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "false");
  });

  it("renders accessible labels with an empty response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => [] }),
    );

    render(<App />);

    expect(
      await screen.findByRole("region", {
        name: "Indicadores clave de rendimiento",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Gráficos financieros" }),
    ).toBeInTheDocument();
    expect(await screen.findByLabelText("Total Income: $0")).toBeInTheDocument();
    expect(screen.getByLabelText("Total Outcome: $0")).toBeInTheDocument();
    expect(screen.getByLabelText("Profit: $0")).toBeInTheDocument();
    expect(screen.getByLabelText("Profit Margin: 0.0%")).toBeInTheDocument();
  });
});