import "leaflet/dist/leaflet.css";
import { Map } from "./components/Map";
import "./App.css";
import mainModal from "./components/mainModal";
import classNames from "classnames";

const App = () => {
  const visible = "inset-0";
  return (
    <div className="bg-gray-600 h-screen w-full relative">
      <Map />
      
    </div>
  );
};

export default App;
