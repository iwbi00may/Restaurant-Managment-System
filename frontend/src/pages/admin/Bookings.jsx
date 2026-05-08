import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "sonner";
import "../../Styles/Bookings.css";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/bookings");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);

      const { data } = await axios.put(`/api/booking/update-status/${id}`, {
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBookings(); // FIXED
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchBookings();
  }, [admin]);

  return (
    <div className="bookings-page">
      <h1 className="title">All Bookings</h1>

      <div className="table-wrapper">
        {/* HEADER */}
        <div className="table-header">
          <span>Name</span>
          <span>Phone</span>
          <span>Persons</span>
          <span>Date</span>
          <span>Time</span>
          <span>Status</span>
        </div>

        {/* LIST */}
        <div className="table-body">
          {bookings.map((item) => (
            <div key={item._id} className="row">
              <span>{item.name}</span>
              <span>{item.phone}</span>
              <span>{item.numberOfPeople}</span>

              <span>
                {new Date(item.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span>{item.time}</span>

              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                disabled={loading}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
