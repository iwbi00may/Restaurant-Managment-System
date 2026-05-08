import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../Styles/MyBookings.css";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="myBookings-container">
      <div className="myBookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <h2 className="myBookings-title">My Reservations</h2>
            <hr className="row-divider" />
            <div className="booking-header">
              <h3>{booking.name}</h3>
              <span className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </div>

            <div className="booking-grid">
              <p>
                <span>Phone:</span> {booking.phone}
              </p>
              <p>
                <span>Date:</span> {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <span>Time:</span> {booking.time}
              </p>
              <p>
                <span>Guests:</span> {booking.numberOfPeople}
              </p>
            </div>
            <hr className="row-divider" />
            {booking.note && (
              <p className="booking-note">
                <span>Note:</span> {booking.note}
              </p>
            )}

            <div className="booking-footer">
              Booked on:{" "}
              {new Date(booking.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
