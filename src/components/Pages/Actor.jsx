import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { apiMethod } from '../../api/api'

import MoviesList from '../Movies/MoviesList'
import PageLoader from '../UI/Loaders/PageLoader'
import ToHomeButton from '../UI/Buttons/ToHomeButton'
import PageItemLoader from "../UI/Loaders/PageItemLoader";

const Actor = () => {
  const [actorMovies, setActorMovies] = useState(null)
  const [actorInfo, setActorInfo] = useState('')
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { actorId } = useParams()

  useEffect(() => {
    apiMethod('person', actorId, setActorInfo)
    apiMethod('person', actorId, setActorMovies,'/movie_credits', setError, setIsLoaded)
  }, [])

  if (error) {
    return <div className='error'>Error: {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader/> </div>
  }

  return (
    <div className='actor'>
      <h2 className='actor__title'>Film with:
        <span className='actor__name'>
          {
            actorInfo ? ` ${actorInfo.name}` : null
          }
        </span>
      </h2>
      <MoviesList movies={actorMovies.cast}/>

      <ToHomeButton/>
    </div>
  )
}

export default Actor