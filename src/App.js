import './App.css';
import { useState } from 'react'; // Import the useState hook
import MapBox from './components/MapBox';
import Header from './components/Header';

function App() {
  // State to store the distance value from the range selector
  const [distance, setDistance] = useState(0);

  // Function to handle changes in the range selector
  const handleRangeChange = (event) => {
    setDistance(parseFloat(event.target.value));
  };

  return (
    <div className='container'>
      <div>
        <Header />
      </div>
      <hr className="bg-secondary border-1 border-top border-secondary" />
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='Range'>
              <label htmlFor="customRange1" className="form-label">Distance
              <div class="distance-value">{distance}km</div>
               </label>
              <input
                type="range"
                className="form-range"
                id="customRange1"
                min="0"
                max="5"
                step="1"
                value={distance} // Bind the value to the state variable
                onChange={handleRangeChange} // Add the event handler for changes
              />
            </div>

            <div>
              {/* Add content related to the API here */}
            </div>
          </div>
          <div className='col-md-6'>
            <MapBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
