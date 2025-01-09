/* global fetchAPI, submitAPI */
import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./Homepage";
import Bookingpage from "./Bookingpage";
import ConfirmedBooking from "./ConfirmedBooking";

// Function to initialize available times for today
const initializeTimes = async () => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  if (typeof fetchAPI !== "undefined") { // Check if fetchAPI is defined
    const availableTimes = await fetchAPI(new Date(today)); // Fetch times for today
    return availableTimes;
  } else {
    console.error("fetchAPI is not defined");
    return []; // Return an empty array if fetchAPI is not available
  }
};

// Reducer function for managing available times
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload; // Update the state with new times
    default:
      return state;
  }
};

function Main() {
  const [availableTimes, dispatch] = useReducer(timesReducer, []);

  // Function to fetch initial times when the component mounts
  useEffect(() => {
    const fetchInitialTimes = async () => {
      const initialTimes = await initializeTimes();
      dispatch({ type: 'UPDATE_TIMES', payload: initialTimes });
    };
    fetchInitialTimes();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to update available times based on the selected date
  const updateTimes = async (date) => {
    if (typeof fetchAPI !== "undefined") { // Check if fetchAPI is defined
      const newTimes = await fetchAPI(new Date(date)); // Fetch available times for the selected date
      dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
    } else {
      console.error("fetchAPI is not defined");
    }
  };

  // Function to submit the form
  const submitForm = async (formData) => {
    if (typeof submitAPI !== "undefined") { // Check if submitAPI is defined
      const success = await submitAPI(formData);
      return success; // Return the result of the API call
    } else {
      console.error("submitAPI is not defined");
      return false; // Return false if submitAPI is not available
    }
  };

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<Bookingpage availableTimes={availableTimes} updateTimes={updateTimes} submitForm={submitForm} />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Main;