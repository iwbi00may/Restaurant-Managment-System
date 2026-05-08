import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import "../../Styles/AdminCategories.css";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting");
    }
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">All Categories</h1>

      <div className="categories-box">
        <div className="categories-header">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>

        <hr className="divider" />

        <ul>
          {categories.map((item) => (
            <div key={item._id}>
              <div className="category-row">
                <div className="category-image">
                  <img src={item.image} alt="" />
                </div>

                <p className="category-name">{item.name}</p>

                <p
                  className="delete-btn"
                  onClick={() => deleteCategory(item._id)}
                >
                  <CircleX />
                </p>
              </div>

              <hr className="row-divider" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
