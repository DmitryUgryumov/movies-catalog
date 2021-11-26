import React from 'react'
import { Link } from 'react-router-dom'

import home from '../../../img/Home.png'

const ToHomeButton = () => {
  return (
    <Link to='/' className='to-home'>
      <img src={home} alt='Home' className='to-home__img'/>
    </Link>
  )
}

export default ToHomeButton