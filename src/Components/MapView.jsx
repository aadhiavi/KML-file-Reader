import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const apikey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapView = ({ geoJsonData }) => {
  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };
  
  useEffect(() => {
    if (map && geoJsonData) {
      const newBounds = new window.google.maps.LatLngBounds();

      geoJsonData.features.forEach((feature) => {
        if (feature.geometry) {
          const coordinates = feature.geometry.coordinates;
          if (feature.geometry.type === 'Point') {
            if (!isNaN(coordinates[1]) && !isNaN(coordinates[0])) {
              const latLng = new window.google.maps.LatLng(coordinates[1], coordinates[0]);
              newBounds.extend(latLng);
            }
          } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'Polygon') {
            coordinates.forEach((coord) => {
              if (!isNaN(coord[1]) && !isNaN(coord[0])) {
                const latLng = new window.google.maps.LatLng(coord[1], coord[0]);
                newBounds.extend(latLng);
              }
            });
          }
        }
      });
      map.fitBounds(newBounds);
    }
  }, [geoJsonData, map]);

  return (
    <LoadScript googleMapsApiKey={apikey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        options={{ disableDefaultUI: true }}
      >
        {geoJsonData.features.map((feature, index) => {
          const coordinates = feature.geometry.coordinates;
          if (feature.geometry.type === 'Point') {
            const latLng = { lat: coordinates[1], lng: coordinates[0] };
            return <Marker key={index} position={latLng} />;
          }
          return null;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
