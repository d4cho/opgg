import React from 'react';
import classes from './Profile.module.css';

const Profile = (props) => {
  return (
    <div className={classes.parent}>
      <img
        className={classes.img}
        src={props.img ? props.img : '/images/profileIcon/21.png'}
        alt={props.alt}
      />
      <div className={classes.name}>{props.userName}</div>
      <div className={classes.level}>{props.level}</div>
      <button className={classes.updateButton} onClick={props.updateClicked}>
        Update
      </button>
      <div className={classes.updated}>Last updated: a few seconds ago</div>
      <button className={classes.summaryButton} onClick={props.summaryClicked}>
        Summary
      </button>
      <button
        className={classes.championButton}
        onClick={props.championClicked}>
        Champion
      </button>
    </div>
  );
};

export default Profile;
