import "leaflet/dist/leaflet.css";
import { Map } from "./components/Map";
import "./App.css";

const App = () => {
  return (
    <div className="bg-gray-600 h-screen w-full relative">
      <Map />
    </div>
  );
};

export default App;
