
# Cryptocurrency Trading Dashboard

A professional cryptocurrency trading simulator built with **React + Vite** that demonstrates real-world trading dashboard functionality such as live prices, wallet management, profit & loss tracking, and interactive charts.

---

## Features

- Login with Email & Password
- PIN-protected Buy & Sell actions
- Live cryptocurrency prices using CoinGecko API
- Supported coins:
  - Bitcoin (BTC)
  - Ethereum (ETH)
  - Solana (SOL)
  - Cardano (ADA)
  - Ripple (XRP)
  - Dogecoin (DOGE)
- USDT-based wallet system
- Real-time wallet valuation
- Per-coin Profit / Loss calculation
- Total portfolio Profit / Loss
- Portfolio performance chart (real-time updates)
- Dark / Light mode
- Secure logout with wallet & PIN reset

---

## Dashboard

- Displays logged-in user
- Shows total portfolio value
- Live Profit / Loss calculation
- Portfolio performance chart that updates on:
  - Buy
  - Sell
  - Price updates
- Holdings breakdown with per-coin P/L

---

## Market

- Buy & Sell crypto using live prices
- Independent input for each coin
- Buy disabled when USDT balance is insufficient
- PIN verification before every transaction
- Wallet updates instantly after trades

---

## Wallet

- Displays only owned assets
- Shows coin amount and current USD value
- Updates in real time with market prices

---

## Tech Stack

- React
- Vite
- Context API
- React Router
- Chart.js
- CoinGecko API
- Custom CSS

---

## Notes

- This is a **trading simulator**, not a real blockchain wallet
- No real funds are involved
- CoinGecko API is used for educational purposes only
- API failures are handled gracefully

---

## Run Locally

bash
npm install
npm run dev

---

Open http://localhost:5173

---

Author
Shreyas
Fullstack Developer and crypo enthusiast

---


