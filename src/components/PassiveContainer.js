import React from 'react';
import Tooltip from './Tooltip';
import classes from './PassiveContainer.module.css';

const PassiveContainer = (props) => {
  const { name, desc } = props.data;

  return (
    <div className={classes.tooltipcontainer}>
      <img
        className={classes.img}
        src={`/images/passives/${props.data.img}`}
        alt='passive'
      />
      <span className={classes.tooltiptext}>
        <Tooltip>
          {name}
          {desc}
        </Tooltip>
      </span>
    </div>
  );
};

export default PassiveContainer;
