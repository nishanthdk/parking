import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "../css/ParkingPayment.css"
import { ParkingContext } from '../context/ParkingComponents';

const ParkingPayment = () => {
  const { registration, timings, setRegistration, setTimings } = useContext(ParkingContext);
  const [charge, setCharge] = useState<number>(0);


  const handlePayment = () => {
 
    fetch('https://httpstat.us/200', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "car-registration": registration,
        "charge": charge
      })
    })
      .then((response) => response.json())
  alert("payment done")
  };
  
const navigate=useNavigate()

  const handleDeallocation = () => {
    setRegistration('');
    setTimings('');
    setCharge(0);
    navigate("/ParkingLot")
  };

  const duration = Number(timings);

  let calculatedCharge = 0;
  if (duration <= 2) {
    calculatedCharge = 10;
  } else {
    calculatedCharge = 10 + (duration - 2) * 10;
  }
  
  return (
    <div className="parking-payment-container">
  <div className="parking-payment-card">
    <h1 className="registration">Registration No.:-{registration}</h1>
    <h2 className="timngs">Timings:- {timings}</h2>
    <h3 className="calculatedCharge">Payable amount:-${calculatedCharge}</h3>
    <button
      onClick={handlePayment}
      data-testid="payment-button"
      className="takePAyment"
    >
      Take Payment
    </button>

    <button
      onClick={handleDeallocation}
      data-testid="deAllocation"
      className="dealloctae-button"
    >
      Deallocate Parking Space
    </button>

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
  </div>
</div>

  );
};

export default ParkingPayment;
