import "./txlist.css";

export default function TxList({ transactions }) {
  if (transactions.length === 0) {
    return <p>No transactions yet</p>;
  }

  return (
    <div className="tx-list">
      <h3>Transaction History</h3>
      {transactions.map((tx, i) => (
        <div key={i} className={`tx-item ${tx.type}`}>
          <strong>{tx.type}</strong>
          <span>{tx.coin}</span>
          <span>{tx.amount}</span>
          <span>${tx.price.toFixed(2)}</span>
          <small>{tx.date}</small>
        </div>
      ))}
    </div>
  );
}
