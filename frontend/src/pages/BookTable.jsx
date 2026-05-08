import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "sonner";
import "../Styles/BookTable.css";

const BookTable = () => {
  const { axios, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/booking/create", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card0">
        <h2 className="booking-title">Reserve Your Table Now</h2>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-input">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="input"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="input"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="input"
            />

            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              placeholder="Number of Guests"
              min="1"
              required
              className="input"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="grid-2"></div>

          <div className="grid-2"></div>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Special Requests (optional)"
            rows="4"
            className="textarea"
          />

          <button type="submit" className="btn">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;
