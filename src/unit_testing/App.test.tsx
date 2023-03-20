import { shallow } from "enzyme";
import App from "../App";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it('renders the ParkingLotInput component when the path is "/"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ path: "/" }).prop("element").type.name).toEqual(
      "ParkingDetails"
    );
  });
  it('renders the PArkingLot component when the path is "/parkingLot"', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.find({ path:"/ParkingLot" }).prop("element").type.name).toEqual("ParkingLot");
  });
  it('renders the ParkingCharge component when the path is "/parkingCharge"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ path: "/ParkingPayment" }).prop("element").type.name).toEqual("ParkingPayment");
  });
});
