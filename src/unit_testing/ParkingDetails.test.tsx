import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ParkingDetails from "../components/ParkingDetails";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
// import { shallow } from 'enzyme';
import { ParkingContext } from "../context/ParkingComponents";

describe("ParkingApp component", () => {
  test("renders ParkingDetails without crashing", () => {
    render(
      <MemoryRouter>
        <ParkingDetails />
      </MemoryRouter>
    );
  });

  it("renders the heading", () => {
    render(
      <MemoryRouter>
        <ParkingDetails />
      </MemoryRouter>
    );
    const heading = screen.getByText("Parking App");
    expect(heading).toBeInTheDocument();
  });
  it("renders the form", () => {
    render(
      <MemoryRouter>
        <ParkingDetails />
      </MemoryRouter>
    );

    const label = screen.getByText("Enter the number of spaces:");
    const inputField = screen.getByPlaceholderText("Enter spaces");
    const input = screen.getByTestId("inputSpace");
    const button = screen.getByTestId("Submit-Button-for-ParkingSpace");

    expect(input).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
describe("ParkingApp component2", () => {
  test("handles form submission", () => {
    const setSpace = jest.fn();
    const setTimings = jest.fn();
    const setRegistration = jest.fn();
    const navigate = jest.fn();

    render(
      <MemoryRouter>
        <ParkingContext.Provider
          value={{
            space: "",
            setSpace,
            timings: "",
            setTimings,
            registration: "",
            setRegistration,
          }}
        >
          <ParkingDetails />
        </ParkingContext.Provider>
      </MemoryRouter>
    );

    const input = screen.getByTestId("inputSpace");
    fireEvent.change(input, { target: { value: "10" } });

    expect(setSpace).toHaveBeenCalledWith("10");
    const form = screen.getByTestId("my-form");
    fireEvent.submit(form);

    expect(navigate).toMatchSnapshot();
  });
});
