
import React, { useRef, useEffect, useState ,useMemo, useCallback } from 'react';
import { useDispatch  , useSelector} from 'react-redux';
import Map  ,{Marker} from "react-map-gl";
import './MapBox.css'; 

export default function MapBox() {

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
      </Map>
  </div>
  );
}
