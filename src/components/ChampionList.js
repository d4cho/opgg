import React from 'react';
import classes from './ChampionList.module.css';
import { Link } from 'react-router-dom';

const ChampionList = (props) => {
  let championData = props.champions;

  const championArr = championData.map((item) => {
    return (
      <article key={item.name}>
        <div className={classes.championportrait}>
          <Link
            to={{
              // can send info as object in react-router-dom Link
              pathname: `/champions/${item.id}`,
              name: item.name,
              id: item.id
            }}>
            <img src={item.img} alt={item.name} />
            <div className={classes.type1}>{item.role[0]}</div>
            <div className={classes.type2}>{item.role[1]}</div>
          </Link>
          <div>{item.name}</div>
        </div>
      </article>
    );
  });

  return <div className={classes.championlist}>{championArr}</div>;
};

export default ChampionList;
