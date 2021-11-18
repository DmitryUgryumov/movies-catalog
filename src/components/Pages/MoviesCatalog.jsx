import React, { useEffect, useState } from 'react'
import { getMoviesList } from '../../api/api'
import MoviesList from "../Movies/MoviesList";
import PageLoader from "../UI/Loaders/PageLoader";
import FilterRadio from "../Filters/FilterRadio";




const MoviesCatalog = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // const [filters, setFilters] = useState([])

  const [sortedItems, setSortedItems] = useState([
    {id: 1, description: 'popularity', requestValue: 'popularity.desc', checked: true},
    {id: 2, description: 'vote average', requestValue: 'vote_average.desc&vote_count.gte=1000', checked: false},
    {id: 3, description: 'vote count', requestValue: 'vote_count.desc', checked: false},
    {id: 4, description: 'release date', requestValue: `primary_release_date.desc&primary_release_date.lte=2021-11-18&vote_count.gte=50`, checked: false}
  ])

  const [sorted, setSorted] = useState('popularity.desc')
  const [page, setPage] = useState(sessionStorage.getItem('page') ? +sessionStorage.getItem('page') : 1)

  useEffect(() => {
    // console.log( sessionStorage.getItem('page') )
    getMoviesList(page, sorted, setMovies, setError, setIsLoaded)
  }, [])

  useEffect(() => sessionStorage.setItem('page', page.toString()), [page])

  function changeSort(id) {
    const newSorted = sortedItems.filter(item => item.id.toString() === id)[0].requestValue

    console.log(newSorted)

    setSorted(newSorted)
    setIsLoaded(false)

    getMoviesList(page, newSorted, setMovies, setError, setIsLoaded)
  }

  // useEffect(() => {
  //   console.log(true)
  //   const newSorted = sortedItems.filter(item => item.checked)[0].requestValue
  //
  //   setSorted(newSorted)
  //   setIsLoaded(false)
  //
  //   getMoviesList(page, newSorted, setMovies, setError, setIsLoaded)
  // }, [sortedItems])


  const pageNext = () => {
    setPage(prev => prev + 1)
    getMoviesList(page + 1, sorted, setMovies, setError, setIsLoaded)
    document.documentElement.scrollTop = 0
  }

  const pagePrev = () => {
    setPage(prev => prev - 1)
    getMoviesList(page - 1, sorted, setMovies, setError, setIsLoaded)
    document.documentElement.scrollTop = 0
  }


  if (error) {
    return <div className='error'>Error : {error}</div>
  } else if (!isLoaded) {
    return <div className='loading'> <PageLoader/> </div>
  }

  return(
    <>
      <div className="filters">
        <h2 className="filters__title">Filters</h2>
        <FilterRadio state={sortedItems} setState={setSortedItems} name='sorted' change={changeSort}/>
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