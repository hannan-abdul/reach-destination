import React, { useState } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const location = {
  lat: 22.378231,
  lng: 91.812683
};

function Direction({origin, destination}) {
    const [directionResponse, setDirectionResponse]= useState(null);
  return (
    <LoadScript
      googleMapsApiKey="YOUR_API"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        {
            origin !== '' && destination !== '' && <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={res => {
                if(res !== null){
                  setDirectionResponse(res);
                }
            }}
          />
        }
        {
            directionResponse && <DirectionsRenderer
            options={{
              directions: directionResponse
            }}
          />
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Direction)