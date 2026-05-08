import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "sonner";
import "../Styles/Checkout.css";

const Checkout = () => {
  const { totalPrice, axios, navigate } = useContext(AppContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const { data } = await axios.post("/api/order/place", {
        address,
        paymentMethod,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        {/* LEFT */}
        <div className="checkout-left">
          <h2>Delivery Details</h2>

          <textarea
            rows={5}
            value={address}
            placeholder="Enter your full address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <div>
            <h2>Your Order Overview</h2>

            <div className="summary-box">
              <p>
                <span>Total Amount:</span>
                <span className="price">₹{totalPrice}</span>
              </p>
            </div>

            <h3>Choose Payment Method</h3>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Pay at hotel"
                  checked={paymentMethod === "Pay at hotel"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Pay on Arrival
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Pay Online
              </label>
            </div>
          </div>

          <button onClick={handleCheckout}>Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
