import React, {useEffect} from 'react';

const FilterRadio = ({ state, setState, name, change }) => {

  const inputHandler = (e) => {
    setState(prev => prev.map(item => item.requestValue === e.target.value
      ? {...item, checked: true}
      : {...item, checked: false}
    ))

    if (name === 'sorted') {
      // const newState =
      change(e.target.id)
    }
  }

  return (
    <ul>
      {
        state.map((item, ind) => {
          return <li key={item.id}>
            <input id={item.id} type="radio" name={name} value={item.requestValue} checked={item.checked} onChange={inputHandler}/>
            <label htmlFor={item.id}>{item.description}</label>
          </li>
        })
      }
    </ul>
  );
};

export default FilterRadio;