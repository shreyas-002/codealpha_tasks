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

export default function PriceChart({ history, label }) {
  if (!history || history.length < 2) return null;

  return (
    <Line
      data={{
        labels: history.map((_, i) => i),
        datasets: [
          {
            label,
            data: history,
            borderColor: "#6c63ff",
            backgroundColor: "rgba(108,99,255,0.18)",
            tension: 0.4,
            fill: true,
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
  );
}
