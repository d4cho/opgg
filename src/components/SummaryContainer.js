import React from 'react';
import classes from './SummaryContainer.module.css';

const SummaryContainer = (props) => {
  return <div className={classes.parent}>{props.children}</div>;
};

export default SummaryContainer;
