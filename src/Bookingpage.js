import React from "react";
import BookingForm from "./BookingForm";

function Bookingpage({ availableTimes, updateTimes, submitForm }) {
  return (
    <>
      <h1>Reservations</h1>
      <BookingForm availableTimes={availableTimes} updateTimes={updateTimes} submitForm={submitForm}/>
    </>
  );
}

export default Bookingpage;