import React from 'react';
import classes from './Tier.module.css';

const Tier = (props) => {
  let rank = props.rank;

  switch (rank) {
    case 'I':
      rank = 1;
      break;

    case 'II':
      rank = 2;
      break;

    case 'III':
      rank = 3;
      break;

    case 'IV':
      rank = 4;
      break;
  }

  if (
    props.tier === 'MASTER' ||
    props.tier === 'GRANDMASTER' ||
    props.tier === 'CHALLENGER'
  ) {
    rank = '';
  }

  return <div className={classes.tier}>{`${props.tier} ${rank}`}</div>;
};

export default Tier;
