import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, User2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import "../Styles/Signup.css";

const Signup = () => {
  const { navigate, axios, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
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
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Please sign up to continue</p>

        {/* Name */}
        <div className="input-box">
          <User2Icon className="icon" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Email */}
        <div className="input-box">
          <MailIcon className="icon" />
          <input
            type="email"
            placeholder="Email id"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Password */}
        <div className="input-box">
          <LockIcon className="icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
