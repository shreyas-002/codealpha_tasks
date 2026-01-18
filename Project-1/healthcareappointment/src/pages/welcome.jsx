import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Welcome to DocCare</h1>
      <p>Your digital healthcare appointment platform.</p>

      <Link to="/login">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default Welcome;
