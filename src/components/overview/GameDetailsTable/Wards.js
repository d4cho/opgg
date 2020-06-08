import React from 'react';
import classes from './Wards.module.css';

const Wards = (props) => {
  return (
    <div className={classes.parent}>
      <div>{props.visionWardsBoughtInGame}</div>
      <div>
        {props.wardsKilled} / {props.wardsPlaced}
      </div>
    </div>
  );
};

export default Wards;
