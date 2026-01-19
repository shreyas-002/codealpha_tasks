import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWallet } from "../context/WalletContext";
import "./navbar.css";

export default function Navbar() {
  const { toggleTheme, theme } = useTheme();
  const { resetWallet } = useWallet();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    resetWallet();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/market" className="nav-link">Market</Link>
        <Link to="/wallet" className="nav-link">Wallet</Link>
        {!user && <Link to="/login" className="nav-link">Login</Link>}
      </div>

      <div className="navbar-right">
        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
