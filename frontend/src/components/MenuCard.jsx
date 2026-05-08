import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";
import "../Styles/MenuCard.css";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);

  return (
    <div className="menu-card">
      {/* IMAGE SECTION */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="menu-image-wrapper"
      >
        <img src={menu.image} alt={menu.name} />

        <div className="menu-overlay">
          {!menu.isAvailable && (
            <div className="unavailable-badge">Unavailable</div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="menu-content">
        <h3 className="menu-title">{menu.name}</h3>

        <p className="menu-desc">{menu.description}</p>

        <div className="menu-footer">
          <p className="menu-price">₹{menu.price}</p>

          <button
            onClick={() => addToCart(menu._id)}
            disabled={!menu.isAvailable}
            className={`menu-btn ${menu.isAvailable ? "active" : "disabled"}`}
          >
            {/* <ShoppingCart className="icon" /> */}
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
