import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import regionCoordinates from '../data/regionCoordinates';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (event) => {
    const { target } = event;
    const { feature } = target?.properties;

    if (feature) {
      setSelectedRegion(feature);
    }
  };

  function getPathOptions(data){
    const options = { fillColor: 'black', fillOpacity: 0.5,color: 'black', weight: 1 };

    if (data < 300)
      options.fillColor = options.color = '#b8e6ff';
    else if (data < 400)
      options.fillColor = options.color = '#68b7ff';
    else if (data < 600)
      options.fillColor = options.color = '#6691ff';
    else
      options.fillColor = options.color = '#2c26b6'; 
        
    return options;
  }

  return (
    <MapContainer center={[30, 0]} zoom={2} style={{ height: '500px', width: '80%', border:'2px solid black', borderRadius:'20px ' }} scrollWheelZoom={false}>
      <TileLayer
        noWrap= "true"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((region) => (
        <Circle
          key={region.id}
          center={regionCoordinates[region.region]}
          radius={region.data * 1000}
          pathOptions={getPathOptions(region.data)}
          stroke={true}
          eventHandlers={{
            click: handleRegionClick,
          }}
        >
          <Popup>
            <div>
              <h2>{region.name}</h2>
              <p>Data Usage: {region.data}</p>
            </div>
          </Popup>
        </Circle>
      ))}
      {selectedRegion && (
        <Popup position={selectedRegion.geometry.coordinates}>
          <div>
            <h2>{selectedRegion.properties.region}</h2>
            <p>Data Usage: {selectedRegion.properties.data}</p>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
