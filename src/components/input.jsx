import React, { useEffect, useState, useMemo } from 'react';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyDuQg3nYsLt3HZMydHj3skJVDT7wdhbgis", { language: 'pt-br'});

const CityInput = (props) => {
  const [ currentPosition, setCurrentPosition ] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude }}) => setCurrentPosition(await Geocoder.from({
        latitude,
        longitude,
      })))
    }
  }, [navigator.geolocation])

  console.log(currentPosition)

  const currentCountry = useMemo(() => currentPosition ? currentPosition.results.slice(-1)[0]['formatted_address'] : 'Brasil')
  
  return (
    <div>
      {currentCountry}
    </div>
  )
};

export default React.memo(CityInput);