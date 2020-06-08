import React from 'react';
import DamageBarFiller from './DamageBarFiller';
import classes from './DamageBar.module.css';

const DamageBar = (props) => {
  const percentage =
    (props.totalDamageDealtToChampions / props.highestDamage) * 100;

  return (
    <div className={classes.parent}>
      <div>{props.totalDamageDealtToChampions}</div>
      <div className={classes.damageBar}>
        <DamageBarFiller percentage={percentage} />
      </div>
    </div>
  );
};

export default DamageBar;
