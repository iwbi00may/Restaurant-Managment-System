import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";
import "../Styles/Menu.css";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* HEADER */}
        <div className="menu-hdr">
          <h1>
            Explore the <span>Menu</span>
          </h1>
          <p>
            From bold flavors to comforting classics — discover something
            delicious for every craving.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <Search className="search-icon" />

            <input
              type="text"
              placeholder="Search for something delicious..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button className="clear-btn" onClick={handleClearSearch}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="results">
          {searchQuery ? (
            <p>
              We found <span>{filteredMenus.length}</span> delicious matches for{" "}
              <strong>{searchQuery}</strong>
            </p>
          ) : (
            <p></p>
          )}
        </div>

        {/* GRID */}
        {filteredMenus.length > 0 ? (
          <div className="menu-grid">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>
              Sorry, we couldn’t find anything matching{" "}
              <strong>"{searchQuery}"</strong>
            </p>
            <p>
              Try searching with different keywords or browse our full menu.
            </p>

            <button onClick={handleClearSearch}>View All Dishes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
