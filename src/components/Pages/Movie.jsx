import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {apiMethod} from "../../api/api";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieActors from "../MovieInfo/MovieActors";
import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";
import ToHomeButton from "../UI/Buttons/ToHomeButton";



const Movie = () => {
  const [movie, setMovie] = useState({})
  const [movieCollections, setMovieCollections] = useState(null)
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { movieId } = useParams()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    // getMovie(movieId, setMovie, setError, setIsLoaded)
    apiMethod('movie', movieId, setMovie, '', setError, setIsLoaded)
  }, [movieId])

  useEffect(() => {
    if (Object.keys(movie).length && movie.belongs_to_collection) {
      // getCollections(movie.belongs_to_collection.id, setMovieCollections)
      apiMethod('collection', movie.belongs_to_collection.id, setMovieCollections)
    }
  }, [movie])


  if (error) {
    return <div className='error'>Error: {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader/> </div>
  }

  return(
    <div className='movie'>
      <MovieInfo movie={movie}/>
      <MovieActors movieId={movieId}/>
      {
        movieCollections
          ? (
            <div className='movie__collection collection'>
              <h2 className='collection__title'>Film comes to the collection: </h2>
              <MoviesList movies={movieCollections.parts}/>
            </div>
          )
          : null
      }
      <ToHomeButton/>
    </div>
  )
};

export default Movie;