import React from 'react';
import classes from './Tier.module.css';

const Tier = (props) => {
  let rank = props.rank;

  if (props.tier === 'MASTER' || props.tier === 'GRANDMASTER') {
    rank = '';
  }

  return <div className={classes.tier}>{`${props.tier} ${rank}`}</div>;
};

export default Tier;
