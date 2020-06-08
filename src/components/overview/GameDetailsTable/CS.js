import React from 'react';
import classes from './CS.module.css';

const CS = (props) => {
  const totalCS = props.neutralMinionsKilled + props.totalMinionsKilled;
  const csPerMin = (totalCS / Math.floor(props.gameDuration / 60)).toFixed(1);
  return (
    <div className={classes.parent}>
      <div>{totalCS}</div>
      <div>{csPerMin}/m</div>
    </div>
  );
};

export default CS;
