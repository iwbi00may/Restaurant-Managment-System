import "../Styles/testimonials.css";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Restaurant Owner",
    image: "./person1.png",
    text: "DineAxis has completely transformed how I explore and review restaurants. The booking process is incredibly smooth, and ordering food feels fast and intuitive. It saves time and makes the overall dining experience much more enjoyable.",
  },
  {
    name: "Karan Verma",
    role: "Operations Manager, Fine Dining",
    image: "./person2.png",
    text: "I absolutely love the clean and modern interface of DineAxis. From reserving tables to placing food orders, everything works seamlessly. It’s a platform I genuinely enjoy recommending to my followers who love dining out.",
  },
  {
    name: "Riya Sharma",
    role: "Food & Lifestyle Content Creator",
    image: "./person3.png",
    text: "DineAxis is a game-changer for restaurant management. The booking system is efficient, and handling customer orders has become much easier. It helps us deliver a better experience to our guests while improving our daily operations.",
  },
];

const Star = () => (
  <svg width="18" height="18" viewBox="0 0 22 20" fill="none">
    <path
      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
      fill="#ffb703"
    />
  </svg>
);

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-heading">What Our Customers Say</h2>
        <p className="testimonial-subtext">
          Real feedback from people who love our service
        </p>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-header">
                <img src={t.image} alt={t.name} />
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                </div>
              </div>

              <p className="testimonial-text">{t.text}</p>

              <div className="testimonial-stars">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
