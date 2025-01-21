import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { HeatmapLayer } from 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

const HeatmapMap = ({ data = [], center = [27.5142, 90.4336], zoom = 7 }) => {
  const [heatmapData, setHeatmapData] = useState([]);

  // Bhutan's boundary coordinates (approximate)
  const bhutanBoundary = [
    [26.5, 88.5],
    [28.4, 88.5],
    [28.4, 92.2],
    [26.5, 92.2],
    [26.5, 88.5], // Closing the loop of the polygon
  ];

  // Map hook to add HeatmapLayer and fit the map to the boundary
  function AdjustMap() {
    const map = useMap();
    useEffect(() => {
      if (Array.isArray(heatmapData) && heatmapData.length > 0) {
        const heatLayer = new HeatmapLayer({
          data: heatmapData,
          radius: 25,
        }).addTo(map);

        // Fit the map to the Bhutan boundary
        map.fitBounds(bhutanBoundary);

        return () => map.removeLayer(heatLayer); // Clean up on unmount
      }
    }, [map, heatmapData]);

    return null;
  }

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const heatmapPoints = data.map((item) => [
        item.lat,
        item.lng,
        item.intensity,
      ]);
      setHeatmapData(heatmapPoints);
    }
  }, [data]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '400px' }}
      maxBounds={bhutanBoundary} // Prevent panning outside Bhutan
      maxZoom={10} // Set maximum zoom level
      minZoom={7} // Set minimum zoom level (optional, can adjust based on preference)
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Adjust the map bounds and add Heatmap Layer */}
      <AdjustMap />
    </MapContainer>
  );
};

export default HeatmapMap;
