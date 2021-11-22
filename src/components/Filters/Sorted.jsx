import React, {useEffect} from 'react';
import {getMoviesList} from "../../api/api";

const Sorted = ({ sortedItems, setSortedItems, setSorted, setIsLoaded, setPage, setMovies, setError, genres }) => {
  const changeSort = id => {
    const newSorted = sortedItems.filter(item => item.id.toString() === id)[0].requestValue

    sessionStorage.setItem('sorted', newSorted)

    setSorted(newSorted)
    setIsLoaded(false)
    setPage(1)

    getMoviesList(1, newSorted, setMovies, setError, setIsLoaded, genres)
  }

  const inputHandler = (e) => {
    setSortedItems(prev => prev.map(item => item.requestValue === e.target.value
      ? {...item, checked: true}
      : {...item, checked: false}
    ))

    changeSort(e.target.id)
  }

  return (
    <ul className='sorted__ul'>
      {
        sortedItems.map(item => (
            <li key={item.id} className='sorted__li'>
              <input id={item.id} type="radio" name='sorted' value={item.requestValue} checked={item.checked} onChange={inputHandler}/>
              <label htmlFor={item.id}>{item.description}</label>
            </li>
          )
        )
      }
    </ul>
  );
};

export default Sorted;