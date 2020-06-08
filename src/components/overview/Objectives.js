import React from 'react';
import baron from '../../images/baron.png';
import drake from '../../images/drake.png';
import turret from '../../images/turret.png';
import classes from './Objectives.module.css';

const Objectives = (props) => {
  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <img src={baron} alt='baron' />
        <div>{props.baronKills}</div>
      </div>
      <div className={classes.child}>
        <img src={drake} alt='drake' />
        <div>{props.dragonKills}</div>
      </div>
      <div className={classes.child}>
        <img src={turret} alt='turret' />
        <div>{props.towerKills}</div>
      </div>
    </div>
  );
};

export default Objectives;
