import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingForm.css";
import { BaseURL } from "../BaseURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingConfirmationModal = ({ isOpen, onClose, Success, roomType, roomPrice }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    rooms: 1,
    guestName: "",
    guestEmail: "",
    guestMobile: "",
    paymentMethod: "",
    paymentOption: "",
    couponCode: "",
  });

  const [walletBalance, setWalletBalance] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [applyWallet, setApplyWallet] = useState(false);
  const [applyPoints, setApplyPoints] = useState(false);
  const [totalNights, setTotalNights] = useState(1);
  const [finalPrice, setFinalPrice] = useState(roomPrice);

    useEffect(() => {
    if (isOpen) {
      fetchWallet(); // Always fetch wallet data when modal opens
    }
  }, [isOpen]);


  useEffect(() => {
    if (formData.paymentMethod === "Wallet") {
      fetchWallet();
    } else {
      setWalletBalance(0);
      setLoyaltyPoints(0);
      setApplyWallet(false);
      setApplyPoints(false);
    }
  }, [formData.paymentMethod]);

  useEffect(() => {
    const inDate = new Date(formData.checkInDate);
    const outDate = new Date(formData.checkOutDate);
    const nights = inDate && outDate && outDate > inDate
      ? Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24))
      : 1;

    const basePrice = nights * roomPrice * formData.rooms;
    let discount = 0;

    if (applyWallet) discount += walletBalance;
    if (applyPoints) discount += loyaltyPoints;

    const priceAfterDiscount = Math.max(0, basePrice - discount);
    setTotalNights(nights);
    setFinalPrice(priceAfterDiscount);
  }, [formData.checkInDate, formData.checkOutDate, formData.rooms, applyWallet, applyPoints, walletBalance, loyaltyPoints]);

  const fetchWallet = async () => {
    try {
      const res = await axios.get(`${BaseURL}/wallet`, { withCredentials: true });
      if (res.data.success) {
        setWalletBalance(res.data.balance || 0);
        setLoyaltyPoints(res.data.points || 0);
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethod = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
      paymentOption: "",
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const normalizedMethod =
    formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1).toLowerCase();

  const baseDiscount =
    (applyWallet ? walletBalance : 0) + (applyPoints ? loyaltyPoints : 0);

  const discount = Math.min(baseDiscount, finalPrice);

  const payload = {
    guest_name: formData.guestName,
    guest_email: formData.guestEmail,
    guest_mobile: formData.guestMobile,
    room_type: roomType,
    checkin_date: formData.checkInDate,
    checkout_date: formData.checkOutDate,
    adults: formData.adults,
    children: formData.children,
    rooms: formData.rooms,
    coupon_code: formData.couponCode || null,
    discount: discount,
    payment_method: normalizedMethod,
    payment_option:
      formData.paymentOption ||
      (normalizedMethod === "Cash" ? "cash" : ""),
    loyaltyPointsUsed: applyPoints,
    walletUsed: applyWallet,
    confirmation_code: null,
    price: finalPrice,
  };

  try {
    const res = await axios.post(`${BaseURL}/booking`, payload, {
      withCredentials: true,
    });

    console.log("✅ Booking response:", res.data); // debug

    if (res.status === 200 && res.data.success) {
      const msg = res.data.message || "Booking saved successfully!";

      toast.success("✅ " + msg, {
        position: "top-right",
        autoClose: 3000,
      });

      // Slight delay to allow user to read the toast
      setTimeout(() => {
        Success();
        onClose();
      }, 3000);
    } else {
      toast.error(res.data.message || "Booking failed.");
    }
  } catch (err) {
    console.error("❌ Booking error:", err.response?.data || err.message);
    toast.error(
      err.response?.data?.message || "Server error while booking."
    );
  }
};


  const renderSubPaymentOptions = () => {
    const options = {
      UPI: ["paytm", "gpay", "phonepe"],
      Card: ["visa", "mastercard"],
      Netbanking: ["sbi", "hdfc", "icici"],
    };

    if (formData.paymentMethod === "Wallet") {
      return (
        <div className="wallet-section">
          <img src="/payment/coin.gif" alt="Coin" className="coin-animation" />
          <p>Wallet Balance: ₹{walletBalance}</p>
          <button type="button" onClick={() => setApplyWallet(!applyWallet)} className="gold-btn">
            {applyWallet ? "Remove Wallet Balance" : "Apply Wallet Balance"}
          </button>
          <hr style={{ margin: "10px 0" }} />
          <p>Loyalty Points: {loyaltyPoints}</p>
          <button type="button" onClick={() => setApplyPoints(!applyPoints)} className="gold-btn">
            {applyPoints ? "Remove Loyalty Discount" : "Apply Loyalty Discount"}
          </button>
        </div>
      );
    }

    const method = formData.paymentMethod;
    if (options[method]) {
      return (
        <div className="sub-options">
          {options[method].map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                name="paymentOption"
                value={opt}
                checked={formData.paymentOption === opt}
                onChange={handleInputChange}
                required
              />
              <img src={`/payment/${opt}.png`} alt={opt} />
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "650px" }}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 style={{ marginBottom: "20px", color: "#b39242" }}>Confirm Your Booking</h2>

        <p style={{ fontWeight: "600", fontSize: "18px" }}>{roomType}</p>
        <p style={{ marginTop: "-8px", color: "#555", marginBottom: "20px" }}>
          ₹{roomPrice} per night
        </p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label>From</label>
              <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleInputChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>To</label>
              <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="stepper-group">
            {["adults", "children", "rooms"].map((field) => (
              <div className="stepper" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className="stepper-controls">
                  <button type="button" onClick={() => setFormData((prev) => ({
                    ...prev, [field]: prev[field] > (field === "adults" || field === "rooms" ? 1 : 0) ? prev[field] - 1 : prev[field]
                  }))}>-</button>
                  <input type="number" value={formData[field]} readOnly />
                  <button type="button" onClick={() => setFormData((prev) => ({
                    ...prev, [field]: prev[field] + 1
                  }))}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: "#f6f6f6", padding: "15px", borderRadius: "8px", marginTop: "20px" }}>
            <label>Guest Details</label>
            <input type="text" name="guestName" placeholder="Full Name" value={formData.guestName} onChange={handleInputChange} required />
            <input type="email" name="guestEmail" placeholder="Email" value={formData.guestEmail} onChange={handleInputChange} required style={{ marginTop: "10px" }} />
            <input type="tel" name="guestMobile" placeholder="Mobile" value={formData.guestMobile} onChange={handleInputChange} required style={{ marginTop: "10px" }} />
          </div>

          <div className="coupon-group">
            <label>Have a coupon?</label>
            <input type="text" name="couponCode" placeholder="Enter coupon code" value={formData.couponCode} onChange={handleInputChange} />
            <button type="button" className="gold-btn">Apply</button>
          </div>

          <label style={{ marginTop: "20px" }}>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={(e) => handlePaymentMethod(e.target.value)} required>
            <option value="">Select Payment Method</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Netbanking">Netbanking</option>
            <option value="Wallet">Wallet</option>
            <option value="Cash">Cash (Pay at Check-in)</option>
          </select>

          {renderSubPaymentOptions()}

          <div style={{ marginTop: "25px", marginBottom: "10px", fontWeight: "700", fontSize: "18px", textAlign: "right" }}>
            Total Price: ₹{finalPrice}
          </div>

          <button type="submit" className="submit-btn gold-btn" style={{ marginTop: "5px" }}>
            Confirm Booking
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
