import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Market from "./pages/market";
import Wallet from "./pages/wallet";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </>
  );
}
