import React from 'react';
import classes from './Filter.module.css';

const Filter = (props) => {
  return (
    <div>
      <div className={classes.buttons}>
        <button onClick={props.filterClicked} value={'All'}>
          All
        </button>
        <button onClick={props.filterClicked} value={'Assassin'}>
          Assassin
        </button>
        <button onClick={props.filterClicked} value={'Fighter'}>
          Fighter
        </button>
        <button onClick={props.filterClicked} value={'Mage'}>
          Mage
        </button>
        <button onClick={props.filterClicked} value={'Marksman'}>
          Marksman
        </button>
        <button onClick={props.filterClicked} value={'Support'}>
          Support
        </button>
        <button onClick={props.filterClicked} value={'Tank'}>
          Tank
        </button>
      </div>
      <div className={classes.searchbar}>
        <input
          type='text'
          placeholder='Search a champion'
          onChange={props.searching}
        />
      </div>
    </div>
  );
};

export default Filter;
