import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import MapBox from './components/MapBox';
import Header from './components/Header';
import ListComponent from './components/ListComponent';
import { getPlacesData } from './api';
import { latLngToBounds , getDistance } from "../src/helper"
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const [type, setType] = useState('restaurants');
  const [bounds, setBounds] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]); 
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(1);


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
      getPlacesData(type, sw, ne).then((data) => {
        const filteredPlaces = data.filter((place) => {
          const placeLatLng = {
            latitude: place.latitude,
            longitude: place.longitude,
          };
          const centerLatLng = {
            latitude: viewState.viewState.latitude,
            longitude: viewState.viewState.longitude,
          };
          const distanceBetween = getDistance(placeLatLng, centerLatLng);
          return distanceBetween <= distance;
        });
        setPlaces(data);
        setPlaces(data.filter((place) => place.name ));
        setFilteredPlaces(filteredPlaces);
        console.log(filteredPlaces);
        
        setIsLoading(false);
      });
    }
  }, [type, viewState, distance]);
  

  const handleRangeChange = (event) => {
    setDistance(parseFloat(event.target.value));
  };

  return (
    <div className='container'>
      <div>
        <Header
         type={type}
         setType={setType} />
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
                min="1"
                max="5"
                step="1"
                value={distance} 
                onChange={handleRangeChange}
              />
            </div>

            <div>
              <ListComponent
                isLoading={isLoading}
                childClicked={childClicked}
                places={filteredPlaces.length ? filteredPlaces : places}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <MapBox
              setChildClicked={setChildClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
