import React from 'react';
import championData from '../data/championData';
import spellData from '../data/summonerSpellsData';
import classes from './SummarySpells.module.css';

const SummarySpells = (props) => {
  // change host for production mode
  let host = 'http://localhost:3000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

  const img = championData.find((item) => item.key === props.champion).img;
  const name = championData.find((item) => item.key === props.champion).name;
  const spell1Img = spellData.find((item) => item.key === props.spell1Id).img;
  const spell2Img = spellData.find((item) => item.key === props.spell2Id).img;

  return (
    <div className={classes.parent}>
      <div className={classes.row}>
        <a href={`${host}champions/${name}`} target='_blank'>
          <img
            src={`/images/portrait/${img}`}
            alt={name}
            className={classes.portrait}
          />
        </a>

        <div className={classes.col}>
          <img
            src={`/images/skills/${spell1Img}`}
            alt={props.spell1Id}
            className={classes.spell}
          />
          <img
            src={`/images/skills/${spell2Img}`}
            alt={props.spell2Id}
            className={classes.spell}
          />
        </div>
      </div>

      <div className={classes.name}>{name}</div>
    </div>
  );
};

export default SummarySpells;
