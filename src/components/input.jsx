import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const CityInput = (props) => {
  const {
    setWeatherInfo
  } = props;

  const [ currentCity, setCurrentCity ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude }}) => {
        setCurrentCity((await axios({
          method: 'get',
          url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${process.env.API_KEY}`
        })).data[0].name);
      })
    }
  }, [setWeatherInfo])

  useEffect(() => {
    const getCityPosition = async () => {
      const cityPosition = await axios({
        method: 'get',
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=5&appid=${process.env.API_KEY}`,
      });

      if (cityPosition && cityPosition.data) {
        const {
          lat,
          lon,
        } = cityPosition.data[0]
        setWeatherInfo(await axios({
          method: 'get',
          url: `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${process.env.API_KEY}`
        }));
      }
    }

    if (!loading && currentCity) {
      getCityPosition()
    }
  }, [loading, currentCity, setWeatherInfo])
  
  return (
    <div className='city-input'>
      <span className='city-input__label'>Sua Cidade</span>
      <Form.Control
        type='text'
        defaultValue={currentCity}
        onChange={(v) => {
          setLoading(true);
          setCurrentCity(v.target.value);
          setTimeout(() => setLoading(false), 3000);
        }}
      />
    </div>
  )
};

export default React.memo(CityInput);