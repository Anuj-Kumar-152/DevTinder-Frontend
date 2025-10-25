import { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚙️ Replace these with your actual EmailJS details
    const serviceID = "service_hyllf9a";
    const templateID = "template_zcvye67";
    const publicKey = "pnrCLAnkttnSmDmah";

    // sending mail
    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", subject: "", message: "" });

          // remove success message after 3 sec
          setTimeout(() => setIsSubmitted(false), 3000);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1>Contact Us</h1>
        <p className="contact-desc">
          We'd love to hear from you! Fill out the form below and our team will get back to you soon.
        </p>

        {isSubmitted && (
          <p className="success-msg">
            ✅ Message sent successfully! We'll reach out shortly.
          </p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject :</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject..."
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
