import React, {useEffect} from 'react';
import {getMoviesList, getTest} from "../../api/api";

const FilterDate = ({ dateList, setDateList, setDateActive, setIsLoaded, setPage, setMovies, setError, genresActive, sortedActive }) => {
  const [selectedValue, setSelectedValue] = dateList.filter(date => date.checked)

  const changeDateFilter = e => {
    const newDate = e.target.selectedOptions[0].value

    setDateList(prev => prev.map(date => date.requestValue === newDate
      ? { ...date, checked: true }
      : { ...date, checked: false }
    ))

    sessionStorage.setItem('date', newDate)

    setDateActive(newDate)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, sortedActive, setMovies, setError, setIsLoaded, genresActive, newDate)
  }


  return (
    <select className='release-date__select' name="date" onChange={changeDateFilter} value={selectedValue.requestValue}>
      {
        dateList.map(date =>
          <option className='release-date__option' value={date.requestValue} key={date.id}>
            {date.description}
          </option>
        )
      }
    </select>
  );
};

export default FilterDate;