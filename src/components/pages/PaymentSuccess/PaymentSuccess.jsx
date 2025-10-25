import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get membership type (Silver / Gold) from navigation state
  const membershipType = location.state?.membership || "Silver";

  useEffect(() => {
    toast.success(`${membershipType} Membership Activated Successfully! 🎉`, {
      position: "top-center",
      autoClose: 2500,
      className: "custom-toast",  
    });

  }, [membershipType]);

  return (
    <div className="payment-success-container">
      <div className="payment-card">
        <h2 className="pay-head">{membershipType} Membership ✅</h2>
        <div className="success-icon">🎉</div>
        <h2 className="pay-succ">Payment Successful!</h2>
        <p className="con-class">
          Congratulations! Your <strong>{membershipType}</strong> Membership is now active.
        </p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PaymentSuccess;
