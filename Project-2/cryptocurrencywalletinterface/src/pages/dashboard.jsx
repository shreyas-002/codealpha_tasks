import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import PnLChart from "../components/pnlchart";
import "./dashboard.css";

export default function Dashboard() {
  const { wallet, prices, avgPrice, totalValueUSD } = useWallet();
  const user = JSON.parse(localStorage.getItem("user"));

  const coins = [
    { id: "bitcoin", sym: "BTC" },
    { id: "ethereum", sym: "ETH" },
    { id: "solana", sym: "SOL" },
    { id: "cardano", sym: "ADA" },
    { id: "ripple", sym: "XRP" },
    { id: "dogecoin", sym: "DOGE" },
  ];

  const [portfolioHistory, setPortfolioHistory] = useState([10000, 10000]);

  useEffect(() => {
    setPortfolioHistory(h => {
      const last = h[h.length - 1];
      if (Math.abs(last - totalValueUSD) < 0.5) return h;
      return [...h.slice(-30), totalValueUSD];
    });
  }, [totalValueUSD]);

  let totalProfit = 0;

  const holdings = coins
    .filter(c => wallet[c.sym] > 0)
    .map(c => {
      const amount = wallet[c.sym];
      const current = prices[c.id]?.usd || 0;
      const avg = avgPrice[c.sym] || 0;
      const profit = (current - avg) * amount;
      totalProfit += profit;

      return {
        ...c,
        amount,
        value: amount * current,
        profit,
      };
    });

  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <span className="user-status">
            {user ? `Logged in as ${user.email}` : "Not logged in"}
          </span>
        </div>

        <div className="balance-card">
          <span className="balance-label">Total Portfolio Value</span>
          <span className="balance-value">
            ${totalValueUSD.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="pnl-card">
        <span>Total Profit / Loss</span>
        <strong className={totalProfit >= 0 ? "profit" : "loss"}>
          {totalProfit >= 0 ? "+" : "-"}${Math.abs(totalProfit).toFixed(2)}
        </strong>
      </div>

      <PnLChart history={portfolioHistory} />

      <h3 className="section-title">Your Holdings</h3>

      <div className="dashboard-grid">
        {holdings.length === 0 && (
          <p className="muted">No assets purchased yet</p>
        )}

        {holdings.map(h => (
          <div key={h.sym} className="coin-card">
            <strong>{h.sym}</strong>
            <span>Amount: {h.amount}</span>
            <span>Value: ${h.value.toFixed(2)}</span>
            <span className={h.profit >= 0 ? "profit" : "loss"}>
              P/L: {h.profit >= 0 ? "+" : "-"}$
              {Math.abs(h.profit).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
