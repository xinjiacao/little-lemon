/* global submitAPI */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: "",
    guests: 1,
    occasion: "",
    time: "17:00",
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update available times when the date changes
    if (name === "date") {
      updateTimes(value); // Call the updateTimes function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData); // Submit form data using submitForm
    if (success) {
      navigate("/confirmed"); // Navigate to the confirmation page
    } else {
      alert("Reservation failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", maxWidth: "300px", gap: "20px" }}
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        onChange={handleChange}
        value={formData.date}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        onChange={handleChange}
        value={formData.time}
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        name="guests"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        onChange={handleChange}
        value={formData.guests}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        onChange={handleChange}
        value={formData.occasion}
      >
        <option value="">Select an occasion</option>
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
      </select>

      <input
        type="submit"
        value="Make Your Reservation"
        className="reserve-button"
      />
    </form>
  );
}

export default BookingForm;