import React from 'react';
import classes from './DamageBarFiller.module.css';

const DamageBarFiller = (props) => {
  return (
    <div
      className={classes.damageBarFiller}
      style={{ width: `${props.percentage}%` }}
    />
  );
};

export default DamageBarFiller;
