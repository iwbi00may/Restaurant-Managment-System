import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import { toast } from "sonner";
import "../Styles/Navbar.css";

const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="./logo.png" alt="logo" />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/menu">Menus</Link>
          <Link to="/book-table">Reserve Table</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {/* CART */}
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            <ShoppingCart size={22} />
            <span className="cart-count">{cartCount || 0}</span>
          </button>

          {/* PROFILE (FIXED DROPDOWN) */}
          <div
            className="profile-wrapper"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            {user ? (
              <div className="profile">
                <UserCircle size={30} />

                {isProfileOpen && (
                  <div className="dropdown">
                    <Link to="/my-bookings">My Reservations</Link>

                    <Link to="/my-orders">My Orders</Link>
                    <hr className="row-divider" />

                    <button onClick={logout}>
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="press-btns">
                <button
                  className="login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="login-btn"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link onClick={() => setIsMenuOpen(false)} to="/">
          Home
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} to="/menu">
          Menus
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} to="/book-table">
          Reserve a Table
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} to="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
