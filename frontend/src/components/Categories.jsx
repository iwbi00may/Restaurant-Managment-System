import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../Styles/Categories.css";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);

  const [showAll, setShowAll] = useState(false);

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h1 className="categories-hdr">
          Explore Delicious <span>Categories</span>
        </h1>

        <p className="categories-subtitle">
          Browse a variety of food categories and quickly find your favorite
          dishes, from snacks to main courses and drinks, all in one place.
        </p>

        {/* GRID */}
        <div className="categories-grid">
          {(showAll ? categories : categories.slice(0, 10)).map((cat) => (
            <div key={cat._id} className="category-card">
              <div className="category-image-wrapper">
                <div className="category-image-circle">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <div className="category-overlay"></div>
              </div>

              <div className="category-name">
                <h3>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        {categories.length > 8 && (
          <div className="view-more">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "View Less <<" : "View More >>"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
