import React from 'react';
import classes from './SummaryKDA.module.css';

const SummaryKDA = (props) => {
  let kdaRatio = ((props.kills + props.assists) / props.deaths).toFixed(2);
  if (props.deaths === 0) {
    kdaRatio = 'Perfect';
  }
  let multikills = null;
  switch (props.multikills) {
    case 2:
      multikills = 'Double Kill';
      break;
    case 3:
      multikills = 'Triple Kill';
      break;
    case 4:
      multikills = 'Quadra Kill';
      break;
    case 5:
      multikills = 'Penta Kill';
      break;
    default:
      multikills = '';
  }
  return (
    <div className={classes.parent}>
      <div
        className={
          classes.kda
        }>{`${props.kills} / ${props.deaths} / ${props.assists}`}</div>
      <div className={classes.ratio}>
        {props.deaths === 0 ? 'Perfect' : `${kdaRatio}:1 KDA`}
      </div>
      <div className={multikills && classes.multikills}>{multikills}</div>
    </div>
  );
};

export default SummaryKDA;
