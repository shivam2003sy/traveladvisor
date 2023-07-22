
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch  , useSelector} from 'react-redux';
import './MapBox.css'; 
import MapGL from "react-map-gl";

export default function MapBox() {
  const location = useSelector((state) => state.locations);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);


  const [viewport, setViewport] = useState({
    latitude: 50.7577,
    longitude: -122.4376,
    zoom: 8
  })

  useEffect(() => {
    if (location && location.lat && location.lng) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: location.lat,
        longitude: location.lng,
      }));
    }
  }, [location]);
    
  return (
    <div style={{ height: "100vh" }}>
    <MapGL
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      mapboxAccessToken="pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNsa2RsdDF4YTA0Ymczcm5xOHA5NmsxZGMifQ.jTn_kCeufp7SzKiHyti4DQ"
      cooperativeGestures
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  </div>
  );
}
