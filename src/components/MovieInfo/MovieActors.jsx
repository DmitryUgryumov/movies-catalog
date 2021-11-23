import React, {useEffect, useRef, useState} from 'react';
import {apiMethod} from "../../api/api";

import noPoster from '../../img/Question_mark.svg'
import {Link} from "react-router-dom";
import PageItemLoader from "../UI/Loaders/PageItemLoader";

const MovieActors = ({ movieId }) => {
  const [actors, setActors] = useState({})
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const list = useRef(null)
  const buttonTriangle = useRef(null)

  useEffect(() => {
    // getActors(movieId, setActors, setError, setIsLoaded)
    apiMethod('movie', movieId, setActors, '/credits', setError, setIsLoaded)
  }, [movieId])

  function changeListHeight() {
    const listStyles = getComputedStyle(list.current)

    list.current.style.height = listStyles.height === '0px' ? 'auto' : '0px'

    buttonTriangle.current.innerHTML = buttonTriangle.current.innerHTML === '▶' ? '▼' : '▶'
  }


  if (error) {
    return <div className='error'>Error: {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageItemLoader/> </div>
  }

  return (
    <div className='movie__actors actors'>
      <div className='actors__header' onClick={changeListHeight}>
        <h2 className='actors__title'>Actors:</h2>
        <button className='actors__btn' ref={buttonTriangle}>▶</button>
      </div>

      <ul className='actors__list' ref={list}>
        {
          actors.cast.slice(0, 12).map(actor => {
            return (
              <li key={actor.id} className='actors__li'>
                <Link to={`/actor/${actor.id}`}>
                  <img src={ actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : noPoster }
                       alt='actor'
                       className='actors__poster'
                  />
                  <p className='actors__name'>{ actor.name }</p>
                </Link>
              </li>
            )
          })
        }
      </ul>

    </div>

  )
};

export default MovieActors;