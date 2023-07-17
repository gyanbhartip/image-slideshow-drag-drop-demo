import { useGlobalContext } from '../../utils/context';
import ImageSlider from '../imageSlider';
import './App.css';

function App() {
    const { SliderData } = useGlobalContext();
    return (
        <div className="app">
            <ImageSlider SliderData={SliderData} />
        </div>
    );
}

export default App;
