import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseURL } from "../BaseURL";

const SurveyPopup = ({ Success }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleYes = () => {
    setShowSurvey(true);
  };

  const handleNo = () => {
    setIsVisible(false);
    toast.info("Maybe next time!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const verifyResponse = await axios.get(`${BaseURL}/user/verify`, {
        withCredentials: true,
      });

      const user_id = verifyResponse.data?.user?.id;
      if (!user_id) throw new Error("User ID not found");

      const formData = {
        birthdayOffer: event.target.birthdayOffer.value,
        weddingAnniversary: event.target.weddingAnniversary.value,
        otherSpecialDays: event.target.otherSpecialDays.value,
        festivalCelebration: event.target.festivalCelebration.value,
        otherOccasions: event.target.otherOccasions.value,
      };

      await axios.post(`${BaseURL}/user/survey`, {
        user_id,
        ans: formData,
      });
      Success();
      setIsVisible(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    overlay: {
      display: "flex",
      position: "fixed",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      zIndex: 1000,
      padding: "15px",
    },
    container: {
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "15px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      position: "relative",
      overflow: "auto",
      maxHeight: "90vh",
    },
    closeButton: {
      position: "absolute",
      right: "15px",
      top: "15px",
      cursor: "pointer",
      fontSize: "24px",
      color: "#888",
      zIndex: 2,
    },
    title: {
      margin: "0 0 20px",
      color: "#333",
      fontSize: "22px",
    },
    paragraph: {
      margin: "0 0 20px",
      color: "#555",
      fontSize: "16px",
    },
    button: {
      border: "none",
      padding: "12px 24px",
      margin: "5px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: 500,
    },
    primaryButton: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    secondaryButton: {
      backgroundColor: "#f44336",
      color: "white",
    },
    label: {
      display: "block",
      margin: "15px 0 5px",
      color: "#555",
      fontSize: "14px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
    },
    submitButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "12px 24px",
      marginTop: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
    },
  };

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <span
          onClick={handleClose}
          style={styles.closeButton}
          aria-label="Close"
        >
          &times;
        </span>

        {/* Initial Question */}
        {!showSurvey && (
          <div>
            <h2 style={styles.title}>Get Goodies! 🎉</h2>
            <p style={styles.paragraph}>
              Are you interested in taking a quick survey for exclusive coupons?
            </p>
            <div style={styles.buttonContainer}>
              <button
                onClick={handleYes}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Yes, I'm In!
              </button>
              <button
                onClick={handleNo}
                style={{ ...styles.button, ...styles.secondaryButton }}
              >
                No, Thanks
              </button>
            </div>
          </div>
        )}

        {showSurvey && (
          <div>
            <h2 style={styles.title}>Tell Us More! 🎁</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="birthdayOffer" style={styles.label}>
                Would you like to receive a special offer or discount on your
                birthday? If yes, mention the date please.
              </label>
              <div>
                <input
                  type="date"
                  id="birthdayOffer"
                  name="birthdayOffer"
                  style={styles.input}
                />
              </div>

              <label htmlFor="weddingAnniversary" style={styles.label}>
                When is your wedding anniversary?
              </label>
              <div>
                <input
                  type="date"
                  id="weddingAnniversary"
                  name="weddingAnniversary"
                  style={styles.input}
                />
              </div>

              {/* Other Special Days */}
              <label htmlFor="otherSpecialDays" style={styles.label}>
                Are there any other special days you celebrate, such as work
                anniversaries, engagement dates, or personal milestones?
              </label>
              <input
                type="text"
                id="otherSpecialDays"
                name="otherSpecialDays"
                placeholder="Enter special days"
                style={styles.input}
              />

              <label htmlFor="festivalCelebration" style={styles.label}>
                Would you be interested in celebrating festivals at our
                facility? If yes, mention the date please.
              </label>
              <div>
                <input
                  type="date"
                  id="festivalCelebration"
                  name="festivalCelebration"
                  style={styles.input}
                />
              </div>

              <label htmlFor="otherOccasions" style={styles.label}>
                Besides festivals, what other special occasions do you
                celebrate, such as work anniversaries, engagement dates, or
                personal milestones?
              </label>
              <input
                type="text"
                id="otherOccasions"
                name="otherOccasions"
                placeholder="Enter other occasions"
                style={styles.input}
              />

              <button
                type="submit"
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPopup;
