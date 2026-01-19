import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

const COINS = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  cardano: "ADA",
  ripple: "XRP",
  dogecoin: "DOGE",
};

const INITIAL_WALLET = {
  BTC: 0,
  ETH: 0,
  SOL: 0,
  ADA: 0,
  XRP: 0,
  DOGE: 0,
  USDT: 10000,
};

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState({ ...INITIAL_WALLET });
  const [prices, setPrices] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [avgPrice, setAvgPrice] = useState({});

  useEffect(() => {
    fetchPrices();
    const i = setInterval(fetchPrices, 15000);
    return () => clearInterval(i);
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin,tether&vs_currencies=usd"
      );

      if (!res.ok) return;

      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.warn("Price fetch failed. Using cached prices.");
    }
  };

  const requestPin = () => {
    if (!localStorage.getItem("user")) {
      alert("Please login first");
      return false;
    }

    let pin = localStorage.getItem("pin");

    if (!pin) {
      const newPin = prompt("Set a 4-digit PIN");
      if (!/^\d{4}$/.test(newPin)) {
        alert("PIN must be exactly 4 digits");
        return false;
      }
      localStorage.setItem("pin", newPin);
      pin = newPin;
    }

    const entered = prompt("Enter your PIN");
    if (entered !== pin) {
      alert("Wrong PIN");
      return false;
    }

    return true;
  };

  const buy = (coinId, amount) => {
    if (amount <= 0 || isNaN(amount)) return;
    if (!requestPin()) return;

    const sym = COINS[coinId];
    const price = prices[coinId]?.usd || 0;
    const cost = price * amount;

    setWallet(w => {
      if (w.USDT < cost) {
        alert("Insufficient USDT");
        return w;
      }

      return {
        ...w,
        USDT: +(w.USDT - cost).toFixed(2),
        [sym]: +(w[sym] + amount).toFixed(6),
      };
    });

    setAvgPrice(p => {
      const prevQty = wallet[sym];
      const prevCost = (p[sym] || 0) * prevQty;
      const newAvg = (prevCost + cost) / (prevQty + amount);
      return { ...p, [sym]: newAvg };
    });

    setTransactions(t => [
      {
        type: "BUY",
        coin: sym,
        amount,
        price,
        date: new Date().toLocaleString(),
      },
      ...t,
    ]);
  };

  const sell = (coinId, amount) => {
    if (amount <= 0 || isNaN(amount)) return;
    if (!requestPin()) return;

    const sym = COINS[coinId];
    const price = prices[coinId]?.usd || 0;

    setWallet(w => {
      if (w[sym] < amount) {
        alert("Not enough coins");
        return w;
      }

      return {
        ...w,
        USDT: +(w.USDT + price * amount).toFixed(2),
        [sym]: +(w[sym] - amount).toFixed(6),
      };
    });

    setTransactions(t => [
      {
        type: "SELL",
        coin: sym,
        amount,
        price,
        date: new Date().toLocaleString(),
      },
      ...t,
    ]);
  };

  const resetWallet = () => {
    setWallet({ ...INITIAL_WALLET });
    setTransactions([]);
    setAvgPrice({});
    localStorage.removeItem("pin");
  };

  const totalValueUSD =
    wallet.USDT +
    wallet.BTC * (prices.bitcoin?.usd || 0) +
    wallet.ETH * (prices.ethereum?.usd || 0) +
    wallet.SOL * (prices.solana?.usd || 0) +
    wallet.ADA * (prices.cardano?.usd || 0) +
    wallet.XRP * (prices.ripple?.usd || 0) +
    wallet.DOGE * (prices.dogecoin?.usd || 0);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        prices,
        buy,
        sell,
        resetWallet,
        totalValueUSD,
        transactions,
        avgPrice,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
