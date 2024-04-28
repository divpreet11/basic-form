import React, { useState } from 'react';
import './App.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
    agreement: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.reason.trim()) {
      errors.reason = 'Reason is required';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    if (!formData.agreement) {
      errors.agreement = 'You must agree to the terms';
    }
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      alert(JSON.stringify(formData, null, 2));
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
      <h1>Feedback Form</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Reason:</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        >
          <option value="">Select a reason</option>
          <option value="question">Question</option>
          <option value="feedback">Feedback</option>
          <option value="support">Support</option>
        </select>
        {errors.reason && <span className="error">{errors.reason}</span>}
      </div>
      <div className="form-group">
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <div className="form-group">
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
          required
        />
        <label>I agree to the terms</label>
        {errors.agreement && (
          <span className="error">{errors.agreement}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
