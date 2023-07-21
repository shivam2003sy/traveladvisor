import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapBox = () => {
  const position = [51.505, -0.09];
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}  >
        <Popup>
          A marker at latitude {position[0]}, longitude {position[1]}.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapBox;
