import React, { useState, useEffect } from "react";
import "./Wallet.css";
import { FaWallet, FaStar, FaDownload } from "react-icons/fa";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsRedeemed, setPointsRedeemed] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [pointsHistory, setPointsHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchWalletData = async () => {
    if (!token) {
      setSuccessMessage("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/v1/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const txRes = await fetch("/api/v1/wallet/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const txData = await txRes.json();

      if (data.success) {
        setWalletBalance(Number(data.balance) || 0);
        setLoyaltyPoints(Number(data.points) || 0);
      }

      if (txData.success && Array.isArray(txData.transactions)) {
        setPointsHistory(txData.transactions);

        let earned = 0,
          redeemed = 0;

        txData.transactions.forEach((tx) => {
          const amt = Number(tx.amount);
          if (tx.type === "credit") earned += amt;
          else if (tx.type === "debit") redeemed += amt;
        });

        setPointsEarned(earned);
        setPointsRedeemed(redeemed);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
      setSuccessMessage("Error loading wallet data.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handleAddMoney = async () => {
    const amount = parseFloat(amountToAdd);
    if (isNaN(amount) || amount <= 0) {
      setSuccessMessage("Enter a valid amount");
      return;
    }

    try {
      const res = await fetch("/api/v1/wallet/add-money", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.success) {
        setWalletBalance(Number(data.balance));
        setLoyaltyPoints(Number(data.points));
        setSuccessMessage(data.message || "Money added successfully");
        fetchWalletData();
      } else {
        setSuccessMessage(data.message || "Failed to add money");
      }
    } catch (error) {
      console.error("Add money error:", error);
      setSuccessMessage("Server error");
    }

    setAmountToAdd("");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleConvertPoints = async () => {
  try {
    const res = await fetch("/api/v1/wallet/convert-points", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setWalletBalance(Number(data.balance));
      setLoyaltyPoints(Number(data.points));
      setPointsRedeemed((prev) => prev + Number(data.converted));
      setSuccessMessage(data.message || `Converted ${data.converted} points to wallet`);
    } else {
      // ✅ Handle the “You need at least 50 points…” message here
      setSuccessMessage(data.message || "Failed to convert points");
    }

    fetchWalletData();
  } catch (error) {
    console.error("Convert points error:", error);
    setSuccessMessage("Error converting points");
  }

  setTimeout(() => setSuccessMessage(""), 4000);
};




  const handleDownloadCSV = () => {
    const rows = [
      ["Transaction ID", "Action", "Amount", "Date"],
      ...pointsHistory.map((tx) => [
        `TXN${tx.id}`,
        tx.source,
        `${tx.type === "debit" ? "-" : "+"}${Number(tx.amount).toFixed(2)}`,
        new Date(tx.created_at).toLocaleDateString(),
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "wallet_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <h2>My Wallet</h2>

        {successMessage && <div className="success-message">{successMessage}</div>}

        {loading ? (
          <p>Loading wallet data...</p>
        ) : (
          <>
            <div className="wallet-grid">
              <div className="wallet-box green">
                <p><FaWallet className="wallet-icon pulse" /> Wallet Balance</p>
                <h3>₹{walletBalance.toFixed(2)}</h3>
              </div>
              <div className="wallet-box yellow">
                <p>Loyalty Points</p>
                <h3>{loyaltyPoints} pts</h3>
                <button className="convert-btn" onClick={handleConvertPoints}>
                      Convert to Wallet
                    </button>

              </div>
              <div className="wallet-box blue">
                <p><FaStar className="star-icon rotate" /> Points Earned</p>
                <h3>{pointsEarned.toFixed(0)} pts</h3>
              </div>
              <div className="wallet-box red">
                <p>Points Redeemed</p>
                <h3>{pointsRedeemed.toFixed(0)} pts</h3>
              </div>
            </div>

            <div className="wallet-add-section">
              <input
                type="number"
                placeholder="Enter amount to add"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
              />
              <button className="add-money-button" onClick={handleAddMoney}>
                Add Money
              </button>
            </div>

            <div className="wallet-history">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Loyalty Points History</h3>
                <button onClick={handleDownloadCSV} className="add-money-button" style={{ fontSize: "0.9rem", padding: "8px 15px" }}>
                  <FaDownload style={{ marginRight: 6 }} /> Export CSV
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsHistory.length === 0 ? (
                    <tr>
                      <td colSpan="4">No history found.</td>
                    </tr>
                  ) : (
                    pointsHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>TXN{entry.id}</td>
                        <td>
                          {entry.type === "credit" ? (
                            <span style={{ color: "green" }}><BsArrowUpCircle /> {entry.source}</span>
                          ) : (
                            <span style={{ color: "red" }}><BsArrowDownCircle /> {entry.source}</span>
                          )}
                        </td>
                        <td>{entry.type === "debit" ? "-" : "+"}₹{Number(entry.amount).toFixed(2)}</td>
                        <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
