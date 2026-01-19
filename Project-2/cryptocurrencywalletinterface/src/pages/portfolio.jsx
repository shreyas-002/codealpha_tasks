import { useWallet } from "../context/WalletContext";

export default function Portfolio() {
  const { wallet, prices } = useWallet();

  return (
    <div className="page">
      <h2>Portfolio</h2>
      {Object.entries(wallet)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => (
          <p key={k}>
            {k}: {v} (${k !== "USDT" ? (v * prices[k === "BTC" ? "bitcoin" : "ethereum"]?.usd).toFixed(2) : v})
          </p>
        ))}
    </div>
  );
}
