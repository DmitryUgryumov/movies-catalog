import React from 'react';

const FiltersCheckbox = ({ state, setState, name, change }) => {

  const inputHandler = (e) => {

    setState(prev => prev.map(item => {
      // console.log(item.requestValue.toString(), e.target.value)
      return item.requestValue.toString() === e.target.value
        ? {...item, checked: !item.checked}
        : {...item}
      }
    ))

    console.log(e.target.checked)
    change(e.target.id, e.target.checked)

  }

  return (
    <ul className={`${name}__ul`}>
      {
        state.map((item, ind) => {
          return <li key={item.id} className={`${name}__li`}>
            <input id={item.id} type="checkbox" name={name} value={item.requestValue} checked={item.checked} onChange={inputHandler}/>

            <label htmlFor={item.id}>{item.description}</label>
          </li>
        })
      }
    </ul>
  );
};

export default FiltersCheckbox;