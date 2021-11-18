import React, {useEffect, useState} from 'react';
import {getActorFilms, getActorInfo} from "../../api/api";
import {Link, useParams} from "react-router-dom";
import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";
import ButtonToHome from "../UI/Buttons/ButtonToHome";

const Actor = () => {
  const [actorMovies, setActorMovies] = useState(null)
  const [actorInfo, setActorInfo] = useState('')
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { actorId } = useParams()

  useEffect(() => {
    getActorInfo(actorId, setActorInfo)
    getActorFilms(actorId, setActorMovies, setError, setIsLoaded)
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

      <ButtonToHome/>
    </div>
  )
};

export default Actor;