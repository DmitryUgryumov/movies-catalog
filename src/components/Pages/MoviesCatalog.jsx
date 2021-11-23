import React, { useEffect, useState } from 'react'
import {dateArr, genresArr, getMoviesList, sortedArr} from '../../api/api'

import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";
import Sorted from "../Filters/Sorted";
import FilterGenres from "../Filters/FilterGenres";
import FilterDate from "../Filters/FilterDate";


const MoviesCatalog = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [page, setPage] = useState(sessionStorage.getItem('page') ? +sessionStorage.getItem('page') : 1)
  const [genresList, setGenresList] = useState(genresArr)
  const [genresActive, setGenresActive] = useState(sessionStorage.getItem('genres') ? sessionStorage.getItem('genres') : '')
  const [dateList, setDateList] = useState(dateArr)
  const [dateActive, setDateActive] = useState(sessionStorage.getItem('date') ? sessionStorage.getItem('date') : '')
  const [sortedList, setSortedList] = useState(sortedArr)
  const [sortedActive, setSortedActive] = useState(sessionStorage.getItem('sorted') ? sessionStorage.getItem('sorted') : 'popularity.desc&vote_count.gte=50')

  useEffect(() => {
    getMoviesList(page, sortedActive, setMovies, setError, setIsLoaded, genresActive, dateActive)

    setSortedList(prev => prev.map(item => item.requestValue === sortedActive ? {...item, checked:true} : {...item, checked:false}))
    setGenresList(prev => prev.map(item => genresActive.includes(item.requestValue) ? {...item, checked:true} : {...item, checked:false} ))
    setDateList( prev => prev.map(item => item.requestValue === dateActive ? { ...item, checked:true } : {...item, checked: false}) )
  }, [])

  useEffect(() => sessionStorage.setItem('page', page.toString()), [page])

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
          <Sorted sortedList={sortedList} setSortedList={setSortedList} setSortedActive={setSortedActive}
                  setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError} genresActive={genresActive} dateActive={dateActive}/>
        </div>
        <div className='genres'>
          <p className='genres__title'>Genres: </p>
          <FilterGenres genresList={genresList} setGenresList={setGenresList} setGenresActive={setGenresActive}
                        setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError} sortedActive={sortedActive} dateActive={dateActive}/>
        </div>
        <div className='release-date'>
          <p className='release-date__title'>Release date: </p>
          <FilterDate dateList={dateList} setDateList={setDateList} setDateActive={setDateActive}
                      setIsLoaded={setIsLoaded} setPage={setPage} setMovies={setMovies} setError={setError} genresActive={genresActive} sortedActive={sortedActive}/>
        </div>
      </div>

      <div className='movies'>
        <MoviesList movies={movies.results}/>
        <div className='movies__buttons page-buttons'>
          {/*{*/}
          {/*  page > 1*/}
          {/*    ? <button className='page-buttons__prev' onClick={pagePrev}>← {page - 1} page</button>*/}
          {/*    : null*/}
          {/*}*/}

          {/*{*/}
          {/*  page < movies.total_pages*/}
          {/*    ? <button className='page-buttons__next' onClick={pageNext}>{page + 1} page →</button>*/}
          {/*    : null*/}
          {/*}*/}
        </div>
      </div>
    </>
  )

}

export default MoviesCatalog