import React from 'react'

import home from '../../../img/Home.png'

import { Link } from 'react-router-dom'

const ToHomeButton = () => {
  return (
    <Link to='/movies-catalog' className='to-home'>
      <img src={home} alt='Home' className='to-home__img'/>
    </Link>
  )
}

export default ToHomeButton