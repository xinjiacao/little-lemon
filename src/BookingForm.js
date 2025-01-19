import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: "",
    guests: 1,
    occasion: "",
    time: "17:00",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "date") {
      updateTimes(value);
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    if (name === "date" && value === "") {
      errorMessage = "Please select a valid date.";
    }
    if (name === "guests" && (value < 1 || value > 10)) {
      errorMessage = "Guests must be between 1 and 10.";
    }
    if (name === "occasion" && value === "") {
      errorMessage = "Please select an occasion.";
    }
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateAllFields();
    if (Object.values(errors).some((error) => error) || !isFormValid()) {
      alert("Please correct the errors before submitting.");
      return;
    }
    const success = await submitForm(formData);
    if (success) {
      navigate("/confirmed");
    } else {
      alert("Reservation failed. Please try again.");
    }
  };

  const validateAllFields = () => {
    const { date, guests, occasion, time } = formData;
    validateField("date", date);
    validateField("guests", guests);
    validateField("occasion", occasion);
  };

  const isFormValid = () => {
    const { date, guests, occasion, time } = formData;
    return (
      date !== "" &&
      guests >= 1 &&
      guests <= 10 &&
      occasion !== "" &&
      time !== ""
    );
  };

  return (
      <form onSubmit={handleSubmit} style={{ display: "grid", maxWidth: "300px", gap: "20px" }} aria-labelledby="formTitle" noValidate>

          <div>
            <label htmlFor="res-date">Choose date</label>
            <input
              type="date"
              id="res-date"
              name="date"
              onChange={handleChange}
              value={formData.date}
              required
              aria-label="Choose a date for your reservation"
            />
            {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}
          </div>

          <div>
            <label htmlFor="res-time">Choose time</label>
            <select
              id="res-time"
              name="time"
              onChange={handleChange}
              value={formData.time}
              aria-label="Select reservation time"
            >
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              name="guests"
              id="guests"
              onChange={handleChange}
              value={formData.guests}
              required
              min="1"
              max="10"
              aria-label="Enter the number of guests"
            />
            {errors.guests && (
              <span style={{ color: "red" }}>{errors.guests}</span>
            )}
          </div>

          <div>
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              onChange={handleChange}
              value={formData.occasion}
              required
              aria-label="Select the occasion for the reservation"
            >
              <option value="" disabled>
                Select an occasion
              </option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
            {errors.occasion && (
              <span style={{ color: "red" }}>{errors.occasion}</span>
            )}
          </div>

          <button
            type="submit"
            aria-label="Make your reservation"
            className="reserve-button"
          >
            Make Your Reservation
          </button>
      </form>
  );
}

export default BookingForm;
