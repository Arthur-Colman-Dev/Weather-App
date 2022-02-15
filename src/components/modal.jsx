import React from 'react';

import CityInput from './input';

const Modal = (props) => {
  return (
    <div className='modal'>
      <CityInput />
    </div>
  )
}

export default React.memo(Modal);