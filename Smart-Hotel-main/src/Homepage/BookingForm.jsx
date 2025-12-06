import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import "./BookingForm.css";


const BookingForm = ({ roomId, roomPrice, onBookingConfirmed }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    checkin: "",
    checkout: "",
    adults: 1,
    children: 0,
    rooms: 1,
    paymentMethod: "",
    subPaymentMethod: "",
    applyWalletPoints: false,
  });

  const [walletPoints, setWalletPoints] = useState(0);
  const [totalNights, setTotalNights] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // ✅ Fetch wallet points when component loads
  useEffect(() => {
    fetchWalletPoints();
  }, []);

  // ✅ Re-fetch points or reset discount on payment method change
  useEffect(() => {
    if (formData.paymentMethod === "wallet") {
      fetchWalletPoints();
    } else {
      setWalletPoints(0);
      setFormData((prev) => ({ ...prev, applyWalletPoints: false }));
    }
  }, [formData.paymentMethod]);

  useEffect(() => {
    calculateNightsAndAmount();
  }, [formData.checkin, formData.checkout, formData.rooms, formData.applyWalletPoints, walletPoints]);

  const fetchWalletPoints = async () => {
    try {
      const res = await axios.get(`${BaseURL}/wallet`, { withCredentials: true });
      if (res.data.success) {
        setWalletPoints(res.data.points || 0);
      }
    } catch (error) {
      console.error("Error fetching wallet points:", error);
    }
  };

  const calculateNightsAndAmount = () => {
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);

    if (!isNaN(checkinDate) && !isNaN(checkoutDate) && checkoutDate > checkinDate) {
      const diffDays = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays);

      let amount = diffDays * roomPrice * formData.rooms;

      if (formData.applyWalletPoints && walletPoints > 0) {
        const discount = Math.min(walletPoints, amount);
        amount -= discount;
      }

      setCalculatedAmount(amount);
    } else {
      setTotalNights(0);
      setCalculatedAmount(0);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const increment = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const decrement = (field, min = 0) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] > min ? prev[field] - 1 : prev[field],
    }));
  };

  const handleWalletToggle = () => {
    setFormData((prev) => ({
      ...prev,
      applyWalletPoints: !prev.applyWalletPoints,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalNights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    const normalizedMethod = formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1).toLowerCase();
    const discount = formData.applyWalletPoints ? Math.min(walletPoints, calculatedAmount) : 0;

    const payload = {
      guest_name: formData.name,
      guest_email: formData.email,
      guest_mobile: formData.mobile,
      coupon_code: null,
      room_type: roomId,
      checkin_date: formData.checkin,
      checkout_date: formData.checkout,
      adults: formData.adults,
      children: formData.children,
      rooms: formData.rooms,
      payment_method: normalizedMethod,
      payment_option: formData.subPaymentMethod || (normalizedMethod === "Cash" ? "cash" : ""),
      loyaltyPointsUsed: formData.applyWalletPoints,
      walletUsed: formData.applyWalletPoints,
      discount: discount,
      price: calculatedAmount,
      confirmation_code: null,
    };

    try {
      const res = await axios.post(`${BaseURL}/booking`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        alert("Booking confirmed!");
        onBookingConfirmed?.(res.data.bookingId);
      } else {
        alert("Booking failed: " + (res.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Error during booking: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Name</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Mobile</label>
        <input type="tel" name="mobile" required onChange={handleChange} />

        <label>Check-in Date</label>
        <input type="date" name="checkin" required value={formData.checkin} onChange={handleChange} />

        <label>Check-out Date</label>
        <input type="date" name="checkout" required value={formData.checkout} onChange={handleChange} />

        <div className="stepper-group">
          <div className="stepper">
            <label>Adults</label>
            <div className="stepper-controls">
              <button type="button" onClick={() => decrement("adults", 1)}>-</button>
              <input type="number" name="adults" value={formData.adults} readOnly />
              <button type="button" onClick={() => increment("adults")}>+</button>
            </div>
          </div>

          <div className="stepper">
            <label>Children</label>
            <div className="stepper-controls">
              <button type="button" onClick={() => decrement("children", 0)}>-</button>
              <input type="number" name="children" value={formData.children} readOnly />
              <button type="button" onClick={() => increment("children")}>+</button>
            </div>
          </div>

          <div className="stepper">
            <label>Rooms</label>
            <div className="stepper-controls">
              <button type="button" onClick={() => decrement("rooms", 1)}>-</button>
              <input type="number" name="rooms" value={formData.rooms} readOnly />
              <button type="button" onClick={() => increment("rooms")}>+</button>
            </div>
          </div>
        </div>

        <label>Payment Method</label>
        <select name="paymentMethod" required onChange={handleChange} value={formData.paymentMethod}>
          <option value="">Select Payment Method</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="netbanking">Net Banking</option>
          <option value="wallet">Wallet</option>
          <option value="cash">Cash (Pay at Check-in)</option>
        </select>

        {formData.paymentMethod === "wallet" && (
          <div className="wallet-section">
            <p>Loyalty Points Available: {walletPoints}</p>
            <img src="/payment/coin.gif" alt="Coin Animation" className="coin-animation" />
            <button type="button" className="gold-btn" onClick={handleWalletToggle}>
              {formData.applyWalletPoints ? "Remove Loyalty Points Discount" : "Apply Loyalty Points Discount"}
            </button>
          </div>
        )}

        {totalNights > 0 && (
          <div className="booking-summary">
            <p><strong>Nights:</strong> {totalNights}</p>
            <p><strong>Rate per night:</strong> ₹{roomPrice}</p>
            <p><strong>Total Amount:</strong> ₹{calculatedAmount}</p>
            {formData.applyWalletPoints && (
              <p className="discount-info" style={{ color: "green" }}>
                (Discount applied from wallet points)
              </p>
            )}
          </div>
        )}

        <button type="submit" className="gold-btn" disabled={!formData.paymentMethod}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
