import React from 'react';
import classes from './KDA.module.css';

const KDA = (props) => {
  const ratio = ((props.kills + props.assists) / props.deaths).toFixed(2);
  const killParticipation = Math.round((props.kills / props.totalKills) * 100);
  return (
    <div className={classes.kda}>
      <div className={classes.bold}>
        {props.deaths === 0 ? 'Perfect' : `${ratio}:1`}
      </div>
      <div>{`${props.kills}/${props.deaths}/${props.assists} (${killParticipation}%)`}</div>
    </div>
  );
};

export default KDA;
