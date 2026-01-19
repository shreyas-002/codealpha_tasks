import { useWallet } from "../context/WalletContext";
import TxList from "../components/txlist";
import "./wallet.css";

export default function Wallet() {
  const { wallet, prices, totalValueUSD, avgPrice, transactions } = useWallet();

  const coinMap = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",
    ADA: "cardano",
    XRP: "ripple",
    DOGE: "dogecoin",
  };

  return (
    <div className="page">
      <h2>Wallet</h2>

      <div className="wallet-summary">
        <span>Total Value</span>
        <h1>${totalValueUSD.toFixed(2)}</h1>
      </div>

      <div className="wallet-list">
        {Object.entries(wallet)
          .filter(([_, v]) => v > 0)
          .map(([coin, amount]) => {
            if (coin === "USDT") {
              return (
                <div key={coin} className="wallet-item">
                  <strong>USDT</strong>
                  <span>${amount.toFixed(2)}</span>
                </div>
              );
            }

            const price = prices[coinMap[coin]]?.usd || 0;
            const value = amount * price;
            const invested = (avgPrice[coin] || 0) * amount;
            const pnl = value - invested;

            return (
              <div key={coin} className="wallet-item">
                <div>
                  <strong>{coin}</strong>
                  <span className="wallet-amount">
                    {amount}
                  </span>
                </div>
                <div className={pnl >= 0 ? "profit" : "loss"}>
                  ${pnl.toFixed(2)}
                </div>
              </div>
            );
          })}
      </div>

      <TxList transactions={transactions} />
    </div>
  );
}
