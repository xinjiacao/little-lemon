import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, timesReducer } from './Main'; // Adjust the import path if necessary


describe('BookingForm Component', () => {
    test('Renders the BookingForm date label', () => {
        render(<BookingForm />);
        const labelElement = screen.getByLabelText(/Choose date/i); // Using regex for case-insensitivity
        expect(labelElement).toBeInTheDocument();
    });

    // Additional tests can be written here
});

describe('Main Component Functions', () => {
  test('initializeTimes returns correct initial values', () => {
      const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
      expect(initializeTimes()).toEqual(expectedTimes);
  });

  test('timesReducer returns the same state', () => {
      const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
      const result = timesReducer(initialState, { type: 'UPDATE_TIMES' });
      expect(result).toEqual(initialState);
  });
});