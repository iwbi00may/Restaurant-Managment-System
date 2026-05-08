import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "sonner";
import "../../Styles/AdminOrders.css";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchOrders();
  }, [admin]);

  return (
    <div className="orders-page">
      <h1 className="orders-title">All Orders</h1>

      <div className="orders-container">
        <ul className="orders-list">
          {orders.map((item) => (
            <li key={item._id} className="adminOrder-card">
              {/* Top Section */}
              <div className="order-grid">
                <div>
                  <strong>Name:</strong> {item?.user?.name}
                </div>
                <div>
                  <strong>Address:</strong> {item?.address}
                </div>
                <div>
                  <strong>Total:</strong> ₹{item?.totalAmount}
                </div>
                <div>
                  <strong>Payment:</strong> {item?.paymentMethod}
                </div>

                <div className="order-status">
                  <select
                    value={item.status}
                    disabled={loading}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="order-items">
                {item.items.map((menu, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={menu?.menuItem?.image}
                      alt={menu?.menuItem?.name}
                    />

                    <div className="item-details">
                      <p className="item-name">{menu?.menuItem?.name}</p>
                      <p>Qty: {menu?.quantity}</p>
                      <p>₹{menu?.menuItem?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
