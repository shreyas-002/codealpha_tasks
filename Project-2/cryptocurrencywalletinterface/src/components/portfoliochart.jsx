import PriceChart from "./priceChart";

export default function PortfolioChart({ history }) {
  if (!history || history.length < 2) return null;

  return (
    <div className="portfolio-chart-wrapper">
      <PriceChart
        history={history}
        label="Portfolio Value (USD)"
      />
    </div>
  );
}
