import React, { useEffect, useState } from 'react'
import { getMoviesList, getTest } from '../../api/api'

import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";
import Sorted from "../Filters/Sorted";
import FilterGenres from "../Filters/FilterGenres";

const genresArr = [
  {id: 28, description: 'Action'},
  {id: 12, description: 'Adventure'},
  {id: 16, description: 'Animation'},
  {id: 35, description: 'Comedy'},
  {id: 80, description: 'Crime'},
  {id: 99, description: 'Documentary'},
  {id: 18, description: 'Drama'},
  {id: 10751, description: 'Family'},
  {id: 14, description: 'Fantasy'},
  {id: 36, description: 'History'},
  {id: 27, description: 'Horror'},
  {id: 10402, description: 'Music'},
  {id: 9648, description: 'Mystery'},
  {id: 10749, description: 'Romance'},
  {id: 878, description: 'Science Fiction'},
  {id: 10770, description: 'TV Movie'},
  {id: 53, description: 'Thriller'},
  {id: 10752, description: 'War'}
]

const MoviesCatalog = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(sessionStorage.getItem('page') ? +sessionStorage.getItem('page') : 1)
  const [genresItems, setGenresItems] = useState(genresArr.map(genre => ({ ...genre, requestValue: genre.id, checked: false })))
  const [genres, setGenres] = useState(sessionStorage.getItem('genres') ? sessionStorage.getItem('genres') : '')
  const [sortedItems, setSortedItems] = useState([
    {id: 1, description: 'popularity', requestValue: 'popularity.desc', checked: true}, //default sorting
    {id: 2, description: 'vote average', requestValue: 'vote_average.desc&vote_count.gte=1000', checked: false},
    {id: 3, description: 'vote count', requestValue: 'vote_count.desc', checked: false},
    {id: 4, description: 'release date', requestValue: `primary_release_date.desc&primary_release_date.lte=2021-11-18&vote_count.gte=50`, checked: false}
  ])
  const [sorted, setSorted] = useState(sessionStorage.getItem('sorted') ? sessionStorage.getItem('sorted') : 'popularity.desc')

  useEffect(() => {
    getMoviesList(page, sorted, setMovies, setError, setIsLoaded, genres)
    setSortedItems(prev => prev.map(item => item.requestValue === sorted ? {...item, checked:true} : {...item, checked:false}))
    setGenresItems(prev => prev.map(item => genres.includes(item.requestValue) ? {...item, checked:true} : {...item, checked:false} ))
  }, [])

  useEffect(() => sessionStorage.setItem('page', page.toString()), [page])

  const pageNext = () => {
    setPage(prev => prev + 1)
    getMoviesList(page + 1, sorted, setMovies, setError, setIsLoaded, genres)
    document.documentElement.scrollTop = 0
  }

  const pagePrev = () => {
    setPage(prev => prev - 1)
    getMoviesList(page - 1, sorted, setMovies, setError, setIsLoaded, genres)
    document.documentElement.scrollTop = 0
  }

  if (error) {
    return <div className='error'>Error : {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader/> </div>
  }

  return(
    <>
      <div className='filters'>
        <div className='sorted'>
          <p className='sorted__title'>Soring by: </p>
          <Sorted sortedItems={sortedItems} setSortedItems={setSortedItems} setSorted={setSorted}
                  setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError} genres={genres}/>
        </div>
        <div className='genres'>
          <p className='genres__title'>Genres : </p>
          <FilterGenres genresItems={genresItems} setGenresItems={setGenresItems} setGenres={setGenres}
                        setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError} sorted={sorted}/>
        </div>
      </div>

      <div className='movies'>
        <MoviesList movies={movies.results}/>
        <div className='movies__buttons page-buttons'>
          {
            page > 1
              ? <button className='page-buttons__prev' onClick={pagePrev}>← {page - 1} page</button>
              : null
          }

          {
            page < movies.total_pages
              ? <button className='page-buttons__next' onClick={pageNext}>{page + 1} page →</button>
              : null
          }
        </div>
      </div>
    </>
  )

}

export default MoviesCatalog