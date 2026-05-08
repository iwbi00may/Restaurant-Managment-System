import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../Styles/MyOrders.css";

const MyOrders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="myOrders-container">
      {orders.length === 0 ? (
        <p className="orders-empty">No orders placed yet</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h2 className="myOrders-title">My Orders</h2>
              <hr className="row-divider" />
              {/* HEADER */}
              <div className="order-header">
                <h3>
                  Order ID: <span>{order._id.slice(-6)}</span>
                </h3>

                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              {/* DETAILS */}
              <div className="order-details">
                <p>
                  <span>Delivery Address:</span> {order.address}
                </p>

                <p>
                  <span>Payment Method:</span> {order.paymentMethod}
                </p>

                <p>
                  <span>Order Total:</span> ₹{order.totalAmount}
                </p>

                <p>
                  <span>Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ITEMS */}
              <div className="order-items">
                <span>Items in Order: {order.items.length} product(s)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
