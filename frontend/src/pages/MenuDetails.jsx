import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, CheckCircle, ShoppingCart, XCircle } from "lucide-react";
import "../Styles/MenuDetails.css";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart } = useContext(AppContext);
  const [quantity] = useState(1);

  const menu = menus.find((item) => item._id === id);

  if (!menu) {
    return (
      <div className="menu-details-error">
        <h2>Menu not found</h2>
        <p>The item you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/menu")}>Back to menu</button>
      </div>
    );
  }

  return (
    <div className="menu-details-page">
      {/* BACK */}
      <div className="menu-details-top">
        <button onClick={() => navigate("/menu")} className="back-btn">
          <ArrowLeft />
          Back to menu
        </button>
      </div>

      {/* CONTENT */}
      <div className="menu-details-container">
        {/* IMAGE */}
        <div className="menu-image-box">
          <img src={menu.image} alt={menu.name} />

          <div className="availability-badge">
            {menu.isAvailable ? (
              <span className="available">
                <CheckCircle size={18} /> Available
              </span>
            ) : (
              <span className="unavailable">
                <XCircle size={18} /> Unavailable
              </span>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="menu-info">
          <h1>{menu.name}</h1>

          <div className="price">
            <span className="amount">${menu.price}</span>
            <span className="per">per item</span>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{menu.description}</p>
          </div>

          <div className="order-box">
            <div className="total">
              <span>Total Amount</span>
              <strong>${menu.price * quantity}</strong>
            </div>

            <button
              disabled={!menu.isAvailable}
              onClick={() => addToCart(menu._id)}
              className={`add-btn ${menu.isAvailable ? "active" : "disabled"}`}
            >
              <ShoppingCart />
              {menu.isAvailable ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
