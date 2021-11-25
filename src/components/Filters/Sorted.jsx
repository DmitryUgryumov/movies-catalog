import React from 'react'

import  { getMoviesList } from '../../api/api'

const Sorted = ({ sortedList, setSortedList, setSortedActive, setIsLoaded, setPage, setMovies, setError, genresActive, dateActive }) => {
  const changeSort = e => {
    const newSorted = sortedList.filter(item => item.id.toString() === e.target.id)[0].requestValue

    setSortedList(prev => prev.map(item => item.requestValue === newSorted
        ? { ...item, checked: true }
        : { ...item, checked: false }
      ))

    sessionStorage.setItem('sorted', JSON.stringify(newSorted))
    sessionStorage.setItem('scroll', JSON.stringify(0))

    setSortedActive(newSorted)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, newSorted, setMovies, setError, setIsLoaded, genresActive, dateActive)
  }

  return (
    <div className='sorted'>
      <p className='sorted__title'>Soring by: </p>
      <ul className='sorted__ul'>
        {
          sortedList.map(sort =>
            <li key={sort.id} className='sorted__li'>
              <input id={sort.id} type="radio" name='sorted' value={sort.requestValue} checked={sort.checked} onChange={changeSort}/>
              <label htmlFor={sort.id}>{ sort.description }</label>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Sorted