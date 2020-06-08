import React from 'react';
import ProgressBar from './ProgressBar';
import classes from './TotalGold.module.css';

const TotalGold = (props) => {
  console.log(props.winTeam);
  let percentage = 50;
  if (props.winTeam === 1) {
    percentage = (props.team1Gold / (props.team1Gold + props.team2Gold)) * 100;
  } else {
    percentage = (props.team2Gold / (props.team1Gold + props.team2Gold)) * 100;
  }
  return (
    <div>
      {props.winTeam === 1 ? (
        <div className={classes.parent}>
          <div>Total Gold</div>
          <div>{props.team1Gold}</div>
          <ProgressBar percentage={percentage} winTeam={props.winteam} />
          <div>{props.team2Gold}</div>
        </div>
      ) : (
        <div className={classes.parent}>
          <div>Total Gold</div>
          <div>{props.team2Gold}</div>
          <ProgressBar percentage={percentage} winTeam={props.winteam} />
          <div>{props.team1Gold}</div>
        </div>
      )}
    </div>
  );
};

export default TotalGold;
