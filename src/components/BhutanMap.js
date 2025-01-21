// src/components/BhutanMap.js
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BhutanMap = () => {
  // Coordinates for Bhutan (central coordinates)
  const bhutanCenter = [27.5142, 90.4336];
  const zoomLevel = 7;

  return (
    <MapContainer center={bhutanCenter} zoom={zoomLevel} style={{ width: '100%', height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default BhutanMap;
