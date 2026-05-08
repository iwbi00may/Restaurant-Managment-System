import { Link } from "react-router-dom";
import "../Styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        {/* LEFT SIDE */}
        <div className="footer-left">
          {/* NAV LINKS */}
          <div className="footer-column">
            <p className="footer-title">Navigation</p>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/menu">Menus</a>
              </li>
              <li>
                <a href="/book-table">Reserve Table</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="footer-column">
            <p className="footer-title">Legal</p>
            <ul>
              <li>
                <a href="/">Privacy</a>
              </li>
              <li>
                <a href="/">Terms</a>
              </li>
            </ul>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="footer-right">
          {/* LOGO */}
          <Link to="/" className="logo">
            <img src="./logo.png" alt="logo" />
          </Link>
          <p className="footer-desc">
            A smooth and modern dining platform where you can easily explore
            menus, book tables, and order your favorite meals in just a few
            clicks.
          </p>

          {/* SOCIAL */}
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">facebook</a>
          </div>

          <p className="footer-copy">
            © 2026 <a href="/">DineAxis</a>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
