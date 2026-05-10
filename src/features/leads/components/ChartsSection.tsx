import { useEffect, useRef } from "react";
import type { Lead } from "../types";

interface Props {
  leads: Lead[];
}

const STATUS_ORDER = ["new", "contacted", "demo", "proposal", "won", "lost"];

const STATUS_COLORS: Record<string, string> = {
  new: "#534AB7",
  contacted: "#185FA5",
  demo: "#854F0B",
  proposal: "#993556",
  won: "#3B6D11",
  lost: "#A32D2D",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "#E24B4A",
  medium: "#EF9F27",
  low: "#639922",
};

const PRIORITY_ORDER = ["high", "medium", "low"];

// Minimal Chart.js type shim — avoids adding @types/chart.js as a dep
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChartInstance = any;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Chart: any;
  }
}

function loadChartJs(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Chart) return resolve();
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export default function ChartsSection({ leads }: Props) {
  const barRef = useRef<HTMLCanvasElement>(null);
  const donutRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLCanvasElement>(null);

  const barChartRef = useRef<ChartInstance>(null);
  const donutChartRef = useRef<ChartInstance>(null);
  const statusChartRef = useRef<ChartInstance>(null);

  // Derived data
  const valueByStatus: Record<string, number> = {};
  const countByStatus: Record<string, number> = {};
  const countByPriority: Record<string, number> = {};

  for (const lead of leads) {
    valueByStatus[lead.status] = (valueByStatus[lead.status] ?? 0) + lead.value;
    countByStatus[lead.status] = (countByStatus[lead.status] ?? 0) + 1;
    countByPriority[lead.priority] = (countByPriority[lead.priority] ?? 0) + 1;
  }

  const barLabels = STATUS_ORDER.filter((s) => valueByStatus[s]);
  const barData = barLabels.map((s) => valueByStatus[s]);
  const barColors = barLabels.map((s) => STATUS_COLORS[s]);

  const dKeys = PRIORITY_ORDER.filter((p) => countByPriority[p]);
  const dData = dKeys.map((p) => countByPriority[p]);
  const dColors = dKeys.map((p) => PRIORITY_COLORS[p]);
  const totalPriority = dData.reduce((a, b) => a + b, 0) || 1;

  const stLabels = STATUS_ORDER.filter((s) => countByStatus[s]);
  const stData = stLabels.map((s) => countByStatus[s]);
  const stColors = stLabels.map((s) => STATUS_COLORS[s]);

  useEffect(() => {
    let cancelled = false;

    loadChartJs().then(() => {
      if (cancelled) return;
      const C = window.Chart;

      // Destroy previous instances before re-creating
      barChartRef.current?.destroy();
      donutChartRef.current?.destroy();
      statusChartRef.current?.destroy();

      if (barRef.current) {
        barChartRef.current = new C(barRef.current, {
          type: "bar",
          data: {
            labels: barLabels.map((s) => capitalize(s)),
            datasets: [
              {
                data: barData,
                backgroundColor: barColors,
                borderRadius: 4,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx: ChartInstance) =>
                    " $" + ctx.parsed.y.toLocaleString(),
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 11 }, color: "#888" },
              },
              y: {
                grid: { color: "rgba(128,128,128,0.1)" },
                ticks: {
                  font: { size: 11 },
                  color: "#888",
                  callback: (v: number) =>
                    "$" + (v >= 1000 ? Math.round(v / 1000) + "k" : v),
                },
              },
            },
          },
        });
      }

      if (donutRef.current) {
        donutChartRef.current = new C(donutRef.current, {
          type: "doughnut",
          data: {
            labels: dKeys.map((p) => capitalize(p)),
            datasets: [
              {
                data: dData,
                backgroundColor: dColors,
                borderWidth: 0,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx: ChartInstance) => ` ${ctx.label}: ${ctx.parsed}`,
                },
              },
            },
          },
        });
      }

      if (statusRef.current) {
        statusChartRef.current = new C(statusRef.current, {
          type: "bar",
          data: {
            labels: stLabels.map((s) => capitalize(s)),
            datasets: [
              {
                data: stData,
                backgroundColor: stColors,
                borderRadius: 3,
                borderSkipped: false,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx: ChartInstance) => ` ${ctx.parsed.x} leads`,
                },
              },
            },
            scales: {
              x: {
                grid: { color: "rgba(128,128,128,0.1)" },
                ticks: { font: { size: 11 }, color: "#888", stepSize: 1 },
              },
              y: {
                grid: { display: false },
                ticks: { font: { size: 11 }, color: "#888" },
              },
            },
          },
        });
      }
    });

    return () => {
      cancelled = true;
      barChartRef.current?.destroy();
      donutChartRef.current?.destroy();
      statusChartRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads]);

  return (
    <div className="flex flex-col gap-2.5">
      {/* Row 1 — Bar + Donut */}
      <div className="grid gap-2.5 grid-cols-1 lg:grid-cols-[1.7fr_1fr]">
        {/* Pipeline value by status */}
        <div className="rounded-xl border border-gray-100 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">
            Pipeline value by status
          </p>
          <p className="mb-3 mt-0.5 text-xs text-gray-400">
            Deal value distribution across stages
          </p>
          {/* Legend */}
          <div className="mb-3 flex flex-wrap gap-3">
            {barLabels.map((s, i) => (
              <span
                key={s}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ background: barColors[i] }}
                />
                {capitalize(s)}
              </span>
            ))}
          </div>
          <div className="relative h-52 w-full overflow-hidden">
            <canvas
              ref={barRef}
              role="img"
              aria-label="Bar chart showing pipeline value by lead status"
            />
          </div>
        </div>

        {/* Leads by priority */}
        <div className="rounded-xl border border-gray-100 bg-white p-5">
          <p className="text-xs font-medium text-gray-500">Leads by priority</p>
          <p className="mb-3 mt-0.5 text-xs text-gray-400">
            Distribution of lead urgency
          </p>
          <div className="relative h-44 w-full overflow-hidden">
            <canvas
              ref={donutRef}
              role="img"
              aria-label="Donut chart showing leads split by priority: high, medium, low"
            />
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {dKeys.map((p, i) => {
              const pct = Math.round((dData[i] / totalPriority) * 100);
              return (
                <div
                  key={p}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: dColors[i] }}
                    />
                    {capitalize(p)}
                  </span>
                  <span className="font-medium text-gray-700">
                    {dData[i]}{" "}
                    <span className="font-normal text-gray-400">({pct}%)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2 — Horizontal bar (lead count by status) */}
      <div className="rounded-xl border border-gray-100 bg-white p-5">
        <p className="text-xs font-medium text-gray-500">
          Lead count by status
        </p>
        <p className="mb-3 mt-0.5 text-xs text-gray-400">
          How leads are spread across your pipeline stages
        </p>
        <div className="relative h-40 w-full overflow-hidden">
          <canvas
            ref={statusRef}
            role="img"
            aria-label="Horizontal bar chart showing number of leads by pipeline status"
          />
        </div>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
