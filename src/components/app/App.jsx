import { useGlobalContext } from "../../utils/context/Context";
import ImageSlider from "../imageSlider/ImageSlider";
import "./App.css";

function App() {
  const { SliderData } = useGlobalContext();
  return (
    <div className="app">
      <ImageSlider SliderData={SliderData} />
    </div>
  );
}

export default App;
