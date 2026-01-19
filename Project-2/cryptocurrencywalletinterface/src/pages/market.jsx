import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import PriceChart from "../components/priceChart";
import "./market.css";

export default function Market() {
  const { prices, buy, sell, wallet } = useWallet();
  const [amounts, setAmounts] = useState({});
  const [activeChart, setActiveChart] = useState(null);
  const [history, setHistory] = useState({});
  const [loadingChart, setLoadingChart] = useState(null);
  const [feedback, setFeedback] = useState({});

  const coins = [
    { id: "bitcoin", sym: "BTC", name: "Bitcoin" },
    { id: "ethereum", sym: "ETH", name: "Ethereum" },
    { id: "solana", sym: "SOL", name: "Solana" },
    { id: "cardano", sym: "ADA", name: "Cardano" },
    { id: "ripple", sym: "XRP", name: "Ripple" },
    { id: "dogecoin", sym: "DOGE", name: "Dogecoin" },
  ];

  const setAmount = (sym, value) => {
    setAmounts(a => ({ ...a, [sym]: value }));
  };

  const showFeedback = (sym, text) => {
    setFeedback(f => ({ ...f, [sym]: text }));
    setTimeout(() => {
      setFeedback(f => ({ ...f, [sym]: null }));
    }, 3000);
  };

  const handleBuy = (id, sym, amount) => {
    buy(id, amount);
    if (amount > 0) {
      showFeedback(
        sym,
        `Bought ${amount} ${sym} @ $${prices[id]?.usd?.toFixed(2)}`
      );
    }
  };

  const handleSell = (id, sym, amount) => {
    sell(id, amount);
    if (amount > 0) {
      showFeedback(
        sym,
        `Sold ${amount} ${sym} @ $${prices[id]?.usd?.toFixed(2)}`
      );
    }
  };

  const loadHistory = async id => {
    setActiveChart(id);
    if (history[id]) return;

    setLoadingChart(id);
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
    );
    const data = await res.json();

    setHistory(h => ({
      ...h,
      [id]: data.prices.map(p => p[1]),
    }));

    setLoadingChart(null);
  };

  return (
    <div className="page">
      <h2>Market</h2>

      <div className="usdt-balance">
        Available USDT: <strong>${wallet.USDT.toFixed(2)}</strong>
      </div>

      <div className="market-grid">
        {coins.map(c => {
          const price = prices[c.id]?.usd || 0;
          const amount = amounts[c.sym] || "";
          const total =
            amount && price ? amount * price : 0;

          const insufficientUSDT = total > wallet.USDT;

          return (
            <div key={c.sym} className="market-card">
              <div className="market-top">
                <div>
                  <strong>{c.name}</strong>
                  <span className="symbol">{c.sym}</span>
                </div>
                <div className="price">
                  ${price ? price.toFixed(2) : "--"}
                </div>
              </div>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(c.sym, e.target.value)}
              />

              <div className="total-cost">
                Total: <strong>${total.toFixed(2)}</strong>
              </div>

              <div className="market-actions">
                <button
                  className="buy-btn"
                  disabled={insufficientUSDT || !amount}
                  onClick={() =>
                    handleBuy(c.id, c.sym, Number(amount))
                  }
                >
                  Buy
                </button>

                <button
                  className="sell-btn"
                  disabled={!amount}
                  onClick={() =>
                    handleSell(c.id, c.sym, Number(amount))
                  }
                >
                  Sell
                </button>
              </div>

              {insufficientUSDT && (
                <div className="insufficient">
                  Insufficient USDT balance
                </div>
              )}

              {feedback[c.sym] && (
                <div className="trade-feedback">
                  {feedback[c.sym]}
                </div>
              )}

              <div
                className="view-chart"
                onClick={() => loadHistory(c.id)}
              >
                View Historical Performance
              </div>

              <div className="owned">
                Owned: {wallet[c.sym]}
              </div>

              {activeChart === c.id && (
                <div className="chart-wrapper">
                  {loadingChart === c.id && (
                    <div className="chart-loading">
                      Loading chart…
                    </div>
                  )}

                  {history[c.id] && (
                    <PriceChart
                      history={history[c.id]}
                      label={`${c.sym} Price (USD)`}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
