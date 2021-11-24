import React from 'react'
import { Link } from 'react-router-dom'

import home from '../../../img/Home.png'

const ToHomeButton = () => {
  return (
    <Link to='/' className='to-home'>
      <img src={home} alt='' className='to-home__img'/>
    </Link>
  )
}

export default ToHomeButton