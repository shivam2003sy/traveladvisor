import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import MapBox from './components/MapBox';
import Header from './components/Header';
import ListComponent from './components/ListComponent';
import { getPlacesData } from './api';
import { latLngToBounds } from "../src/helper"
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(0);


  const viewState = useSelector(s => s.mapStateReducer)

  useEffect(() => {
    console.log(viewState.viewState)
    const { latitude, longitude, zoom } = viewState.viewState;
    const bounds = latLngToBounds(latitude, longitude, zoom, 800, 600);
    setBounds(bounds);
    console.log(bounds)
    const sw = bounds[0];
    const ne = bounds[1];
    console.log(sw, ne);
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, sw, ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
          console.log(data);
        });
    }

  }, [type, viewState]);


  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);

  }, [places, rating]);

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
                <div className="distance-value">{distance}km</div>
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
              <ListComponent
                isLoading={isLoading}
                childClicked={childClicked}
                places={filteredPlaces.length ? filteredPlaces : places}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}

              />
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
