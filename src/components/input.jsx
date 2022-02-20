import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const CityInput = (props) => {
  const [ currentPosition, setCurrentPosition ] = useState();
  const [ weatherInfo, setWeatherInfo ] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude }}) => {
        setCurrentPosition(await axios({
          method: 'get',
          url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${process.env.API_KEY}`
        }));
        setWeatherInfo(await axios({
          method: 'get',
          url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`
        }));
      })
    }
  }, [])

  console.log('WEATHER INFO', weatherInfo);
  console.log('CURRENT POSTION', currentPosition);

  const currentCountry = useMemo(() => currentPosition ? currentPosition.data[0].name : '', [currentPosition])
  
  return (
    <div>
      {currentCountry}
    </div>
  )
};

export default React.memo(CityInput);