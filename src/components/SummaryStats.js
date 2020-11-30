import React from 'react';
import classes from './SummaryStats.module.css';

const SummaryStats = (props) => {
  const totalCS = props.totalMinionsKilled + props.neutralMinionsKilled;
  const time = Math.round(props.time / 60);
  const csPerMin = (totalCS / time).toFixed(1);
  let totalTeamKillsArr = props.team1Kills;
  if (props.team === 200) {
    totalTeamKillsArr = props.team2Kills;
  }
  const reducer = (acc, currVal) => acc + currVal;
  const totalTeamKills = totalTeamKillsArr.reduce(reducer);

  const killParticipation = Math.round(
    ((props.kills + props.assists) / totalTeamKills) * 100
  );

  return (
    <div className={classes.parent}>
      <div className={classes.level}>{`Level ${props.level}`}</div>
      <div className={classes.cs}>{`${totalCS} (${csPerMin}) CS`}</div>
      <div className={classes.kp}>{`P/Kill ${killParticipation}%`}</div>
    </div>
  );
};

export default SummaryStats;
