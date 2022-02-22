import React, { useState } from 'react';

import CityInput from './input.jsx';

const Modal = (props) => {
  const [ weatherInfo, setWeatherInfo ] = useState();

  console.log('WEATHER', weatherInfo)
  return (
    <div className='modal'>
      <CityInput setWeatherInfo={setWeatherInfo} />
    </div>
  )
}

export default React.memo(Modal);