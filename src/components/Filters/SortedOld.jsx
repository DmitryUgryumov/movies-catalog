import React, {useEffect} from 'react';

const SortedOld = ({ state, setState, name, change }) => {

  const inputHandler = (e) => {
    setState(prev => prev.map(item => item.requestValue === e.target.value
      ? {...item, checked: true}
      : {...item, checked: false}
    ))

    if (name === 'sorted') {
      change(e.target.id)
    }
  }

  return (
    <ul className={`${name}__ul`}>
      {
        state.map((item, ind) => {
          return <li key={item.id} className={`${name}__li`}>
            <input id={item.id} type="radio" name={name} value={item.requestValue} checked={item.checked} onChange={inputHandler}/>
            <label htmlFor={item.id}>{item.description}</label>
          </li>
        })
      }
    </ul>
  );
};

export default SortedOld;