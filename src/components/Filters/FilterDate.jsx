import React from 'react'

import { getMoviesList } from '../../api/api'

const FilterDate = ({ dateList, setDateList, setDateActive, setIsLoaded, setPage, setMovies, setError, genresActive, sortedActive }) => {
  const [selectedValue] = dateList.filter(date => date.checked)

  const changeDateFilter = e => {
    const newDate = e.target.selectedOptions[0].value

    setDateList(prev => prev.map(date => date.requestValue === newDate
      ? { ...date, checked: true }
      : { ...date, checked: false }
    ))

    sessionStorage.setItem('date', JSON.stringify(newDate))
    sessionStorage.setItem('scroll', JSON.stringify(0))

    setDateActive(newDate)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, sortedActive, setMovies, setError, setIsLoaded, genresActive, newDate)
  }

  return (
    <div className='release-date'>
      <p className='release-date__title'>Release date: </p>
      <select className='release-date__select' name='date' onChange={changeDateFilter} value={selectedValue.requestValue}>
        {
          dateList.map(date =>
            <option className='release-date__option' value={date.requestValue} key={date.id}>
              { date.description }
            </option>
          )
        }
      </select>
    </div>
  )
}

export default FilterDate