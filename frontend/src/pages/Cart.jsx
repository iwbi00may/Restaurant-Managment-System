import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import { toast } from "sonner";
import "../Styles/Cart.css";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-box">
        <h2 className="cart-title">Your Order Summary</h2>

        <div className="table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id} className="meun-text">
                  <td className="item-cell">
                    <img src={item.menuItem.image} alt={item.menuItem.name} />
                    <span>{item.menuItem.name}</span>
                  </td>

                  <td>{item.quantity}</td>

                  <td>₹ {item.menuItem.price}</td>

                  <td className="total-cell">
                    ₹ {item.menuItem.price * item.quantity}
                  </td>

                  <td>
                    <X
                      className="remove-icon"
                      onClick={() => removeFromCart(item.menuItem._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-footer">
          <h3>
            Grand Total: <span>₹{totalPrice}</span>
          </h3>

          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
