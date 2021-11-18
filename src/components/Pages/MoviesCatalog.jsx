import React, { useEffect, useState } from 'react'
import { getMoviesList } from '../../api/api'
import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";

const MoviesCatalog = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // const [filters, setFilters] = useState({})
  const [page, setPage] = useState(sessionStorage.getItem('page') ? +sessionStorage.getItem('page') : 1)

  useEffect(() => {
    console.log( sessionStorage.getItem('page') )
    getMoviesList(page, setMovies, setError, setIsLoaded)
  }, [])


  useEffect(() => {
    sessionStorage.setItem('page', page.toString())
    // console.log(sessionStorage)
  }, [page])


  // const buttonHandler = (action) => {
  //   if (action === 'next') {
  //     setPage(prev => prev + 1)
  //     getMoviesList(page + 1, setMovies, setError, setIsLoaded)
  //   } else {
  //     setPage(prev => prev - 1)
  //     getMoviesList(page - 1, setMovies, setError, setIsLoaded)
  //   }
  //
  //   document.documentElement.scrollTop = 0
  //
  // }


  const pageNext = () => {
    setPage(prev => prev + 1)
    getMoviesList(page + 1, setMovies, setError, setIsLoaded)
    document.documentElement.scrollTop = 0
  }

  const pagePrev = () => {
    setPage(prev => prev - 1)
    getMoviesList(page - 1, setMovies, setError, setIsLoaded)
    document.documentElement.scrollTop = 0
  }


  if (error) {
    return <div className='error'>Error : {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader/> </div>
  }

  return(
    <>
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