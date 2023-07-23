
import React, { useRef, useEffect, useState ,useMemo, useCallback } from 'react';
import { useDispatch  , useSelector} from 'react-redux';
import Map  ,{Marker} from "react-map-gl";
import './MapBox.css'; 

export default function MapBox({places, setChildClicked}) {

  const mapStyle = useSelector(s => s.mapStateReducer.mapStyle)
  const viewState = useSelector(s => s.mapStateReducer);
  const dispatch = useDispatch();
  
  const onMove = useCallback(evt => {
    dispatch({type: 'setViewState', payload: evt.viewState});
  }, []);

  return (
    <div style={{ height: "100vh" }}>
    <Map
      {...viewState}
      onMove={onMove}
      mapboxAccessToken="pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNsa2RsdDF4YTA0Ymczcm5xOHA5NmsxZGMifQ.jTn_kCeufp7SzKiHyti4DQ"
      mapStyle= {mapStyle}
    >
      <Marker longitude={viewState.viewState.longitude} latitude={viewState.viewState.latitude} color='red'/>
      {places.map((place, i) => (
        <Marker key={i} longitude={place.longitude} latitude={place.latitude} color='blue'>
          <button className="marker-btn" onClick={(e) => {
            e.preventDefault();
            setChildClicked(place);
          }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMgkFBU6qTd6j2b-iO4EFbik2mWWiCqoBHw&usqp=CAU" alt="push-pin" 
            width={20}
            height={20}/>
          </button>
        </Marker>
      ))}

        
      </Map>
  </div>
  );
}
