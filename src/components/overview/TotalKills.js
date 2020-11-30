import React from 'react';
import ProgressBar from './ProgressBar';
import classes from './TotalKills.module.css';

const TotalKills = (props) => {
  let percentage = 50;
  if (props.winTeam === 1) {
    percentage =
      (props.team1Kills / (props.team1Kills + props.team2Kills)) * 100;
  } else {
    percentage =
      (props.team2Kills / (props.team1Kills + props.team2Kills)) * 100;
  }
  return (
    <div>
      {props.winTeam === 1 ? (
        <div className={classes.parent}>
          <div>Total Kills</div>
          <div>{props.team1Kills}</div>
          <ProgressBar percentage={percentage} winTeam={props.winteam} />
          <div>{props.team2Kills}</div>
        </div>
      ) : (
        <div className={classes.parent}>
          <div>Total Kills</div>
          <div>{props.team2Kills}</div>
          <ProgressBar percentage={percentage} winTeam={props.winteam} />
          <div>{props.team1Kills}</div>
        </div>
      )}
    </div>
  );
};

export default TotalKills;
