import React from 'react';
import { useNavigate } from 'react-router-dom';

function Chicago() {
  const navigate = useNavigate(); // Get the navigate function

  const handleReserveClick = () => {
    navigate("/booking"); // Navigate to the /booking path
  };

  return (
    <div className="sec1">
      <h1>Little Lemon</h1>
      <span>
        We are a family-owned Mediterranean restaurant, focused on traditional
        recipes serverd with a modern twist
      </span>
      <div>
        <button onClick={handleReserveClick}>Reserve a Table</button>
      </div>
    </div>
  );
}

export default Chicago;
