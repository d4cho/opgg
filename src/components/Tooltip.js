import React from 'react';
import classes from './Tooltip.module.css';

const Tooltip = (props) => {
  const [name, desc, cd, cost, range] = props.children;

  //convert cd array to string
  let cdString = cd;
  if (cd) {
    cdString = cd.join('/');
  }

  //if cost is [0,0,0] then return No Cost
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let costString = cost;
  if (cost) {
    if (cost.reduce(reducer) === 0) {
      costString = 'No Cost';
    } else {
      costString = cost.join('/');
    }
  }

  //if range is always equal then return just one value
  const isEqual = (currentValue) => currentValue === range[0];
  let rangeString = range;
  if (range) {
    if (range.every(isEqual)) {
      rangeString = range[0];
    } else {
      rangeString = range.join('/');
    }
  }

  return (
    <div>
      <div className={classes.name}>{name}</div>
      <div className={classes.info}>{cd && `Cooldown: ${cdString}`}</div>
      <div className={classes.info}>{cost ? `Cost: ${costString}` : null}</div>
      <div className={classes.info}>
        {range ? `Range: ${rangeString}` : null}
      </div>
      <div className={classes.desc}>{desc}</div>
    </div>
  );
};

export default Tooltip;
