import { useContext, useState } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { AppContext } from "../../context/AppContext";
import "../../Styles/AdminLogin.css";

const AdminLogin = () => {
  const { navigate, loading, setLoading, axios, setAdmin } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/admin/login", formData);

      if (data.success) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setAdmin(true);
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="title">Admin Login</h1>
        <p className="subtitle">Please login to continue</p>

        {/* EMAIL */}
        <div className="input-box">
          <MailIcon className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="input-box">
          <LockIcon className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
