import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 22.378231,
  lng: 91.812683
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBLVHqBpK4pTUHkxRLctTj6a3nHrt1d-uI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)