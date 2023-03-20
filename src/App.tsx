
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import ParkingDetails from "./components/ParkingDetails";
import ParkingLot from "./components/ParkingLot";
import ParkingPayment from "./components/ParkingPayment";
import ParkingComponents from './context/ParkingComponents';

function App() {
  return (
   <ParkingComponents>
    <Router>
    <Routes>
      <Route path="/" element={<ParkingDetails/>}/>
      <Route path="/ParkingLot" element={<ParkingLot parking={[]}/>}/>
      <Route path="/ParkingPayment" element={<ParkingPayment/>}/>
    </Routes>
   </Router>
   </ParkingComponents>
  );
}

export default App;
