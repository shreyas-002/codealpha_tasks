import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import "./send.css";

export default function Send() {
  const { wallet } = useWallet();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("BTC");

  const handleSend = () => {
    if (!address || !amount) return alert("Fill all fields");
    alert("This is a UI simulation only");
    setAddress("");
    setAmount("");
  };

  return (
    <div className="send-card">
      <h3>Send</h3>

      <select value={coin} onChange={(e) => setCoin(e.target.value)}>
        {Object.keys(wallet)
          .filter((c) => c !== "USDT" && wallet[c] > 0)
          .map((c) => (
            <option key={c}>{c}</option>
          ))}
      </select>

      <input
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>

      <p className="warning">Transactions are irreversible</p>
    </div>
  );
}
