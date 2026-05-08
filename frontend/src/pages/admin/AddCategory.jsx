import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import "../../Styles/AddCategory.css";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
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

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("image", file);

      const { data } = await axios.post("/api/category/add", formDataToSend);

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/categories");
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
    <div className="add-category-page">
      <form className="add-category-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New Category</h2>
        <hr className="row-divider" />
        {/* PREVIEW */}
        {preview && (
          <img src={preview} alt="preview" className="preview-image" />
        )}

        {/* NAME */}
        <div className="form-group">
          <label>Category Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>

        {/* IMAGE */}
        <div className="form-group">
          <label>Category Image</label>

          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="hidden-input"
          />

          <label htmlFor="fileUpload" className="upload-box">
            <Upload className="icon" />
            <span>{file ? file.name : "Click to upload an image"}</span>
          </label>
        </div>

        {/* BUTTON */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
