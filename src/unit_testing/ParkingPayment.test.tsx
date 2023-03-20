import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ParkingPayment from '../components/ParkingPayment';
import { ParkingContext } from '../context/ParkingComponents';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';



describe('ParkingPayment', () => {
  const mockContext = {
    registration: 'ABC-123',
    timings: '2',
    setRegistration: jest.fn(),
    setTimings: jest.fn(),
    space:"",
    setSpace:jest.fn()
  };
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-type': 'application/json' },
      }))
    );
  });
  

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration, timings and payable amount correctly', () => {
    render(
      <MemoryRouter>
        <ParkingContext.Provider value={mockContext}>
        <ParkingPayment />
      </ParkingContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Registration No.:-ABC-123/i)).toBeInTheDocument();
    expect(screen.getByText(/Timings:- 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Payable amount:-\$10/i)).toBeInTheDocument();
  });

  it('handles payment correctly', async () => {
    render(
     <MemoryRouter>
       <ParkingContext.Provider value={mockContext}>
        <ParkingPayment />
      </ParkingContext.Provider>
     </MemoryRouter>
    );
    const mockAlert = jest.fn();
    window.alert = mockAlert;

    const paymentButton = screen.getByTestId('payment-button');
    fireEvent.click(paymentButton);

    expect(window.fetch).toHaveBeenCalledWith('https://httpstat.us/200', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.stringContaining('"car-registration":"ABC-123"'),
    });
  expect(mockAlert).toHaveBeenCalledWith('payment done');
  });

  it('handles deallocation correctly', () => {
    render(
     <MemoryRouter>
       <ParkingContext.Provider value={mockContext}>
        <ParkingPayment />
      </ParkingContext.Provider>
     </MemoryRouter>
    );

    const deallocateButton = screen.getByTestId('deAllocation');
    fireEvent.click(deallocateButton);

    expect(mockContext.setRegistration).toHaveBeenCalledWith('');
    expect(mockContext.setTimings).toHaveBeenCalledWith('');
    expect(screen.getByText(/Deallocate Parking Space/i)).toBeInTheDocument();
  });


 
  });

  
  describe('ParkingPayment component', () => {
   
    it('calculates charge correctly for a duration greater than 2', () => {
      const mockContext = {
        registration: 'ABC-123',
        timings: '4',
        setRegistration: jest.fn(),
        setTimings: jest.fn(),
        space:"",
        setSpace:jest.fn()
      };
       render(
      <MemoryRouter>
          <ParkingContext.Provider value={mockContext}>
          <ParkingPayment />
        </ParkingContext.Provider>
      </MemoryRouter>
      );
      const payableAmountElement = screen.getByText('Payable amount:-$30');
      expect(payableAmountElement).toBeInTheDocument();
    });
  });
  
