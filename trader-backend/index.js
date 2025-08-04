// index.js
const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();
const { KiteConnect } = require("kiteconnect");

const app = express();
app.use(express.json());

// ----------------------
// Initialize Firebase Admin
// ----------------------
admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: "https://traderapp-7e61b-default-rtdb.firebaseio.com/"
});
const db = admin.database();

// ----------------------
// Zerodha Kite Connect
// ----------------------
const kc = new KiteConnect({ api_key: process.env.API_KEY });
kc.setAccessToken(process.env.ACCESS_TOKEN);

// ----------------------
// Fetch account profile
// ----------------------
const fetchProfile = async () => {
  try {
    const profile = await kc.getProfile();
    console.log("✅ Profile fetched:", profile.user_name);

    // Save profile to Firebase
    db.ref("account").set({
      name: profile.user_name || "",
      user_id: profile.user_id || "",
      email: profile.email || "",
      broker: profile.broker || "",
      timestamp: Date.now()
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
  }
};

// ----------------------
// Fetch wallet / funds
// ----------------------
const fetchWallet = async () => {
  try {
    const margins = await kc.getMargins();
    const equity = margins?.equity || {};

    // Always push values, even if they are 0
    const walletData = {
      net: equity.net ?? 0,
      cash: equity.available?.cash ?? 0,
      invested: equity.used?.margin ?? 0,
      pnl: equity.pnl ?? 0,
      timestamp: Date.now()
    };

    db.ref("wallet").set(walletData);
    console.log("💰 Wallet updated:", walletData);
  } catch (error) {
    console.error("❌ Error fetching wallet:", error.message);
  }
};

// ----------------------
// Push trades to Firebase
// ----------------------
const pushTradeToFirebase = (trade) => {
  const tradeRef = db.ref("trades").push();
  tradeRef.set({
    symbol: trade.tradingsymbol || "",
    qty: trade.quantity ?? 0,
    price: trade.average_price ?? 0,
    pnl: trade.pnl ?? 0,
    timestamp: Date.now()
  });
  console.log("✅ Trade pushed to Firebase:", trade.tradingsymbol);
};

// ----------------------
// Fetch orders periodically
// ----------------------
const fetchOrders = async () => {
  try {
    const orders = await kc.getOrders();
    orders.forEach(order => {
      if (order.status === "COMPLETE") {
        pushTradeToFirebase(order);
      }
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
  }
};

// ----------------------
// Schedule periodic tasks
// ----------------------
setInterval(fetchOrders, 5000); // Every 5 sec
setInterval(fetchWallet, 10000); // Every 10 sec

// Call at startup
fetchProfile();
fetchWallet();
fetchOrders();

// ----------------------
// Test API
// ----------------------
app.get("/", (req, res) => {
  res.send("🚀 Zerodha trade tracker running");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
