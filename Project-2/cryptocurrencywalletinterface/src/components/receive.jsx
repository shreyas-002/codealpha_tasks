import "./receive.css";

export default function Receive() {
  const address = "0xA1B2C3D4E5FAKE987654321";

  return (
    <div className="receive-card">
      <h3>Receive</h3>
      <p className="address">{address}</p>
      <button onClick={() => navigator.clipboard.writeText(address)}>
        Copy Address
      </button>
    </div>
  );
}
