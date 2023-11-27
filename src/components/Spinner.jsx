import React from 'react'
import loading from './loading.gif'
function Spinner() {
  return (
    <div className='my-4'>
      <img src={loading} alt="" />
    </div>
  )
}

export default Spinner
