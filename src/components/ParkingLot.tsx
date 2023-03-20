import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingContext } from "../context/ParkingComponents";
import "react-toastify/dist/ReactToastify.css";
import "../css/ParkingLot.css";
import { toast, ToastContainer } from "react-toastify";
import { ParkingLotProps } from "../types/ComponentsTypes";

interface ParkingLotSpace {
  num: number;
  color: string;
  registration?: string;
}

const ParkingLot: React.FC<ParkingLotProps> = ({ parking }) => {
  const [parkinglot, setparkinglot] = useState<ParkingLotSpace[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { space, registration, setRegistration, timings, setTimings } =
    useContext(ParkingContext);

  useEffect(() => {
    const arr: ParkingLotSpace[] = [];
    for (let i = 1; i <= parseInt(space); i++) {
      arr.push({ num: i, color: "default" });
    }
    setparkinglot(arr);
  }, [space]);

  const navigate = useNavigate();
  const handleParkingSpace = (
    allotedNum: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (registration && timings) {
    }
    if (parkinglot[allotedNum - 1].color === "red") {
      navigate("/ParkingPayment");
    } else {
      toast("This parking space is not available");
      alert("This parking space is not available");
    }
  };

  const handleEnterDetailsClick = () => {
    setShowForm(true);
    setRegistration("");
    setTimings("");
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(registration&&timings){
      const usedSpaces = parkinglot
      .filter((slot) => slot.color === "red")
      .map((slot) => slot.num);
    const availableSpaces = parkinglot
      .filter(
        (slot) =>
          slot.color === "default" && !usedSpaces.includes(slot.num)
      )
      .map((slot) => slot.num);
    if (availableSpaces.length === 0) {
      toast("Parking is Full");
      setShowForm(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableSpaces.length);
    const randomSpace = availableSpaces[randomIndex];

    setparkinglot((prevparkinglot) => {
      const updatedparkinglot = [...prevparkinglot];
      updatedparkinglot[randomSpace - 1] = {
        ...updatedparkinglot[randomSpace - 1],
        color: "red",
        registration,
      };
      return updatedparkinglot;
    });
    }
    else{
      alert("Enter the registration and timings correctly")
    }
    setShowForm(false);
  };

  return (
    <>
      <h1 className="parking-management">Parking Management</h1>
      <div className="container">
        <div className="empty-slot">
          {parkinglot.map(({ num, color, registration }: ParkingLotSpace) => {
            return (
              <button
              data-testid="parking-lot-button"
                key={num}
                style={{
                  backgroundColor: color === "default" ? "green" : color,
                }}
                className="parkin-num"
                onClick={(e) => handleParkingSpace(num, e)}
              >
                {num} 
                <p className="registration-timings">{registration && `${registration}`}</p>
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleEnterDetailsClick}
        data-testid="enter-vehicle-details"
        className="enter-vehicle-details"
      >
        Enter Vehicle Details
      </button>
      {showForm && (
        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="label">Registration: </label>
            <input
            className="registration-input"
              type="text"
              value={registration}
              placeholder="Enter Vehicle  Registration"
              onChange={(e) => setRegistration(e.target.value)}
            />
          </div>
          <div>
            <label>Enter Car Parking Timings in hours: </label>
            <input
             className="timings-input"
              type="text"
              value={timings}
              placeholder="Enter Timings"
              onChange={(e) => setTimings(e.target.value)}
            />
          </div>
          <button className="form-submit" type="submit">Submit</button>
        </form>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default ParkingLot;
