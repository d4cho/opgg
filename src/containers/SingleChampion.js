import React from 'react';
import classes from './SingleChampion.module.css';
import ChampionBanner from '../components/ChampionBanner';

const SingleChampion = (props) => {
  // access url's :name part
  console.log(props.match.params.name);
  // access the object property passed in <Link />
  console.log(props.location.id);
  console.log(props.location.name);

  return (
    <div className={classes.test}>
      <ChampionBanner id={props.match.params.name} />
    </div>
  );
};

export default SingleChampion;
