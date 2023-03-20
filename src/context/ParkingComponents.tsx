import React, { createContext, useState } from "react";
import { numberofSpaceType } from "../types/ComponentsTypes";

export const ParkingContext = createContext<numberofSpaceType>({
  space: "",
  setSpace: () => {},
  registration: "",
  setRegistration: () => {},
  timings: "",
  setTimings: () => {},
});

const ParkingComponents = ({ children }: { children: React.ReactNode }) => {
  const [space, setSpace] = useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [timings, setTimings] = useState<string>("");

  const contextValue: numberofSpaceType = {
    space,
    setSpace,
    registration,
    setRegistration,
    timings,
    setTimings,
  };

  return (
    <ParkingContext.Provider value={contextValue}>
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingComponents;
