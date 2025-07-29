import React, { useState } from 'react';
import './ContactPage.css';
import '../../style.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Message sent!');
      // Clear form
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setSubmitted(true);
    }
  };

  const renderError = (field) => {
    if (touched[field] && errors[field]) {
      return <small className="error">{errors[field]}</small>;
    }
    return null;
  };

  return (
    <section className="contact-page" aria-labelledby="contact-heading">
      <h1 id="contact-heading">Contact Us</h1>
      <p>We’d love to hear from you! Reach out with questions, feedback, or collaboration ideas.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {renderError('name')}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {renderError('email')}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..." 
            rows="5"
            required
            aria-invalid={!!errors.message}
            aria-describedby="message-error"
          />
          {renderError('message')}
        </div>

        <button type="submit" className="submit-button">Send Message</button>

        {submitted && <p className="success-message">Thanks for your message. We'll get back to you soon!</p>}
      </form>
    </section>
  );
};

export default ContactPage;
