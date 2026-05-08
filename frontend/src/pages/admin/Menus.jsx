import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import "../../Styles/AdminMenus.css";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting");
    }
  };

  return (
    <div className="menus-container">
      <h1 className="menus-title">All Menus</h1>

      <div className="menus-box">
        <div className="menus-header">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        <hr className="divider" />

        <ul>
          {menus.map((item) => (
            <div key={item._id}>
              <div className="menu-row">
                <div className="menu-image">
                  <img src={item.image} alt="" />
                </div>

                <p className="menu-name">{item?.name}</p>
                <p className="menu-category">{item?.category?.name}</p>
                <p className="menu-price">₹{item.price}</p>

                <p className="delete-btn" onClick={() => deleteMenu(item._id)}>
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

export default Menus;
