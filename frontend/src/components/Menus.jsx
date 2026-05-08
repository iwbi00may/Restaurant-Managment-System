import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import "../Styles/Menus.css";

const Menus = () => {
  const { menus } = useContext(AppContext);

  const [showAll, setShowAll] = useState(false);

  return (
    <div className="menus-page">
      <div className="menus-container">
        {/* HEADER */}
        <div className="menu-hdr">
          <h1>
            Our Special <span>Menu</span>
          </h1>

          <p>
            Explore a curated selection of delicious dishes crafted to satisfy
            every craving and deliver a delightful dining experience.
          </p>
        </div>

        {/* GRID */}
        <div className="menus-grid">
          {(showAll ? menus : menus.slice(0, 8)).map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>

        {/* VIEW MORE BUTTON */}
        {menus.length > 8 && (
          <div className="view-more">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "View Less <<" : "View More >>"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;
