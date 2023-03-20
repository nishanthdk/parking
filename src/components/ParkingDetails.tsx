import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingContext } from "../context/ParkingComponents";
import "../css/ParkingDetails.css"

const ParkingDetails = () => {
  const { space, setSpace } = useContext(ParkingContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      navigate("/ParkingLot")
  };

  return (
    <div className="container-spaces">
      <h1 className="parking-app">Parking App</h1>
      <form onSubmit={handleSubmit} data-testid="my-form">
        <label className="Enter-number-of-spaces">Enter the number of spaces: </label>
        <input
        className="space-input"
          data-testid="inputSpace"
          type="text"
          value={space}
          placeholder="Enter spaces"
          onChange={(e) => setSpace(e.target.value)}
          required
        />
        <button type="submit" className="space-submit" data-testid="Submit-Button-for-ParkingSpace">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ParkingDetails;
