import React from 'react';
import classes from './SummaryType.module.css';

const SummaryType = (props) => {
  let type;
  switch (props.type) {
    case 420:
      type = 'Ranked Solo';
      break;
    case 440:
      type = 'Flex 5:5 Ra...';
      break;
    case 900:
      type = 'URF';
      break;
    default:
      type = 'Normal';
  }

  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60;

  return (
    <div className={classes.parent}>
      <div>{type}</div>
      <div>____</div>
      <div className={props.win ? classes.win : classes.lose}>
        {props.win ? 'Victory' : 'Defeat'}
      </div>
      <div className={classes.time}>
        {minutes}m {seconds}s
      </div>
    </div>
  );
};

export default SummaryType;
