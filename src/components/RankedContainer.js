import React from 'react';
import classes from './RankedContainer.module.css';

const RankedContainer = (props) => {
  return <div className={classes.parent}>{props.children}</div>;
};

export default RankedContainer;
