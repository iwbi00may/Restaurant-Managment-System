import { Upload } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { useState, useContext } from "react";
import { toast } from "sonner";
import "../../Styles/AddMenu.css";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFormData({ ...formData, image: selectedFile });
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/menu/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/menus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-menu-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Menu</h2>
      <hr className="row-divider" />

      {/* NAME */}
      <div className="form-group">
        <label>Menu Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter menu name"
          required
        />
      </div>

      {/* PRICE */}
      <div className="form-group">
        <label>Price *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="form-group">
        <label>Description *</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* IMAGE */}
      <div className="form-group">
        <label>Menu Image *</label>

        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          className="hidden-input"
        />

        <label htmlFor="fileUpload" className="upload-box">
          <Upload className="icon" />
          <span>{file ? file.name : "Click to upload image"}</span>
        </label>
      </div>

      {/* PREVIEW */}
      {preview && <img src={preview} alt="preview" className="preview-image" />}

      {/* BUTTON */}
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Adding..." : "Add Menu"}
      </button>
    </form>
  );
};

export default AddMenu;
