import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function PnLChart({ history }) {
  if (!history || history.length < 2) return null;

  return (
    <div className="portfolio-chart-card">
      <h3>Portfolio Performance</h3>

      <Line
        data={{
          labels: history.map((_, i) => i + 1),
          datasets: [
            {
              data: history,
              borderColor: "#6c63ff",
              backgroundColor: "rgba(108,99,255,0.15)",
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        }}
        options={{
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { display: false },
            y: {
              ticks: { color: "#888" },
              grid: { color: "rgba(200,200,255,0.15)" },
            },
          },
        }}
      />
    </div>
  );
}
