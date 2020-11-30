import React from 'react';
import classes from './ProgressBar.module.css';
import Filler from './Filler';

const ProgressBar = (props) => {
  let background1 = 'red';
  let background2 = 'blue';
  if (props.winTeam === 1) {
    background1 = 'blue';
    background2 = 'red';
  }
  return (
    <div
      className={classes.progressBar}
      style={{ background: `${background1}` }}>
      <Filler percentage={props.percentage} background={background2} />
    </div>
  );
};

export default ProgressBar;
