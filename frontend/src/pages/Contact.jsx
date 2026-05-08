import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import "../Styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions or want to reserve a table? We’re here to help.</p>
      </section>

      <div className="contact-wrapper">
        {/* LEFT INFO */}
        <div className="contact-info">
          <div className="info-card">
            <MapPin />
            <h3>Our Location</h3>
            <p>
              2nd Floor, Skyline Plaza, Sector 18 Noida, Uttar Pradesh – 201301
              India
            </p>
          </div>

          <div className="info-card">
            <Phone />
            <h3>Call Us</h3>
            <p>+91 98765 432108</p>
          </div>

          <div className="info-card">
            <Mail />
            <h3>Email</h3>
            <p>dineaxis.restaurant@gmail.com</p>
          </div>

          <div className="info-card">
            <Clock />
            <h3>Opening Hours</h3>
            <p>Mon - Sun: 10 AM – 11 PM</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          {submitted && (
            <div className="success-msg">✅ Message sent successfully!</div>
          )}

          <div className="form-grid">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <input
            name="phone"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            <Send size={18} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
