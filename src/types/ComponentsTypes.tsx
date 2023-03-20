export interface numberofSpaceType {
  space: string;
  setSpace: (space: string) => void;

  registration: string;
  setRegistration: (registration: string) => void;
  timings: string;
  setTimings: (timings: string) => void;
}
export interface ParkingLotProps {
  parking: {
    num: number;
    color: string;
    registration: string | null;
  }[];
  handleParkingSpace?: (
    space: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}
