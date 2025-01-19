import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { initializeTimes, timesReducer } from "./Main"; // Adjust the import path if necessary

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Preserve other exports from react-router-dom
  useNavigate: jest.fn(), // Mock useNavigate
}));

// Mock the fetchAPI function
jest.mock("../public/api", () => ({
  fetchAPI: jest.fn(() => [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]),
}));

describe("BookingForm Component", () => {
  test("renders BookingForm with routing", () => {
    render(
      <BookingForm
        availableTimes={[]}
        updateTimes={jest.fn()}
        submitForm={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
  });
});

describe("Main Component Functions", () => {
  test("initializeTimes returns correct initial values using fetchAPI", async () => {
    const { fetchAPI } = require("./api"); // Import mocked fetchAPI
    fetchAPI.mockResolvedValueOnce([
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);

    const result = await initializeTimes();
    expect(result).toEqual([
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);
    expect(fetchAPI).toHaveBeenCalledTimes(1);
  });

  test("timesReducer updates the state correctly", () => {
    const initialState = ["17:00", "18:00", "19:00"];
    const newTimes = ["20:00", "21:00", "22:00"];
    const action = { type: "UPDATE_TIMES", payload: newTimes };
    const result = timesReducer(initialState, action);
    expect(result).toEqual(newTimes);
  });
});

// Mocking the updateTimes and submitForm functions
const mockSubmitForm = jest.fn();
const mockUpdateTimes = jest.fn();
test("should show error messages when fields are invalid", () => {
  render(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      updateTimes={mockUpdateTimes}
      submitForm={mockSubmitForm}
    />
  );
  const dateInput = screen.getByLabelText(/Choose date/i);
  const guestsInput = screen.getByLabelText(/Number of guests/i);
  const occasionSelect = screen.getByLabelText(/Occasion/i); 
  fireEvent.click(screen.getByRole("button")); 
  expect(screen.getByText(/Please select a valid date/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Guests must be between 1 and 10/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Please select an occasion/i)).toBeInTheDocument();
});
test("should disable submit button when form is invalid", () => {
  render(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      updateTimes={mockUpdateTimes}
      submitForm={mockSubmitForm}
    />
  );
  const submitButton = screen.getByRole("button"); // Initially, the form is invalid because the fields are empty
  expect(submitButton).toBeDisabled();
  fireEvent.change(screen.getByLabelText(/Choose date/i), {
    target: { value: "2025-01-20" },
  });
  fireEvent.change(screen.getByLabelText(/Number of guests/i), {
    target: { value: 2 },
  });
  fireEvent.change(screen.getByLabelText(/Occasion/i), {
    target: { value: "birthday" },
  }); // Now the form should be valid, and the submit button should be enabled
  expect(submitButton).toBeEnabled();
});
