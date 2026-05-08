import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../Styles/Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <section className="hero">
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <Link to="/" className="hero-logo">
          <img src="./logo.png" alt="logo" />
        </Link>
        <h1>Welcome to DineAxis</h1>

        <p>
          A simple and convenient platform for restaurant reservations and food
          ordering. Explore delicious meals, book tables easily, and enjoy a
          smooth dining experience all in one place.
        </p>

        <div className="hero-buttons">
          <button className="btn primary" onClick={() => navigate("/menu")}>
            All Menus
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/book-table")}
          >
            Reserve Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
