import React, { useEffect, useState } from 'react'

import { dateArr, genresArr, sortedArr, getMoviesList } from '../../api/api'

import MoviesList from '../Movies/MoviesList'
import PageLoader from '../UI/Loaders/PageLoader'
import Sorted from '../Filters/Sorted'
import FilterGenres from '../Filters/FilterGenres'
import FilterDate from '../Filters/FilterDate'
import NextPage from '../UI/Buttons/NextPage'
import PrevPage from '../UI/Buttons/PrevPage'


const checkProperty = (key, nonKeyValue='') => sessionStorage.getItem(key)
  ? JSON.parse(sessionStorage.getItem(key))
  : nonKeyValue

const initialStateFilter = (filtersArr, typeFilter, filterActive) => typeFilter === 'radio'
  ? filtersArr.map(item => item.requestValue === filterActive ? { ...item, checked: true } : { ...item, checked: false })
  : filtersArr.map(item => filterActive.includes(item.requestValue) ? { ...item, checked: true } : { ...item, checked: false })


const MoviesCatalog = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [page, setPage] = useState( checkProperty('page', 1) )
  const [genresActive, setGenresActive] = useState( checkProperty('genres') )
  const [dateActive, setDateActive] = useState( checkProperty('date') )
  const [sortedActive, setSortedActive] = useState ( checkProperty('sorted', 'popularity.desc&vote_count.gte=50') )

  const [genresList, setGenresList] = useState( initialStateFilter(genresArr, 'checkbox', genresActive) )
  const [dateList, setDateList] = useState( initialStateFilter(dateArr, 'radio', dateActive) )
  const [sortedList, setSortedList] = useState( initialStateFilter(sortedArr, 'radio', sortedActive) )


  useEffect(() => getMoviesList(page, sortedActive, setMovies, setError, setIsLoaded, genresActive, dateActive), [])

  useEffect(() => sessionStorage.setItem( 'page', JSON.stringify(page) ), [page])

  useEffect(() => document.documentElement.scrollTop = checkProperty('scroll', 0))


  const pageNext = () => {
    setPage(prev => prev + 1)
    getMoviesList(page + 1, sortedActive, setMovies, setError, setIsLoaded, genresActive, dateActive)
    document.documentElement.scrollTop = 0
  }

  const pagePrev = () => {
    setPage(prev => prev - 1)
    getMoviesList(page - 1, sortedActive, setMovies, setError, setIsLoaded, genresActive, dateActive)
    document.documentElement.scrollTop = 0
  }

  const saveScrolling = e => {
    if ( e.target.tagName !== 'LI' && e.target.className !== 'movie-card__date' ) {
      sessionStorage.setItem( 'scroll', document.documentElement.scrollTop.toString() )
    }
  }


  if (error) {
    return <div className='error'>Error : {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader /> </div>
  }

  return(
    <>
      <div className='filters'>
        <Sorted sortedList={sortedList} setSortedList={setSortedList} setSortedActive={setSortedActive}
                setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError}
                genresActive={genresActive} dateActive={dateActive} />

        <FilterGenres genresList={genresList} setGenresList={setGenresList} setGenresActive={setGenresActive}
                      setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError}
                      sortedActive={sortedActive} dateActive={dateActive} />

        <FilterDate dateList={dateList} setDateList={setDateList} setDateActive={setDateActive}
                    setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError}
                    genresActive={genresActive} sortedActive={sortedActive} />
      </div>

      <div className='movies' onClick={saveScrolling}>
        <MoviesList movies={movies.results} />

        <div className='movies__buttons page-buttons'>
          <PrevPage handler={pagePrev} page={page} />
          <NextPage handler={pageNext} page={page} totalPages={movies.total_pages} />
        </div>
      </div>
    </>
  )
}

export default MoviesCatalog