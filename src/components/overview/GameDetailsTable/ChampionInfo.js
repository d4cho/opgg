import React from 'react';
import championData from '../../../data/championData';
import spellData from '../../../data/summonerSpellsData';
import classes from './ChampionInfo.module.css';

const ChampionInfo = (props) => {
  const champImg = championData.find((item) => item.key === props.championId)
    .img;
  const spell1Img = spellData.find((item) => item.key === props.spell1Id).img;
  const spell2Img = spellData.find((item) => item.key === props.spell2Id).img;
  return (
    <div className={classes.parent}>
      <img
        className={classes.portrait}
        src={`/images/portrait/${champImg}`}
        alt={champImg}
      />
      <div className={classes.level}>{props.champLevel}</div>
      <div>
        <img
          className={classes.img}
          src={`/images/skills/${spell1Img}`}
          alt={spell1Img}
        />
        <img
          className={classes.img}
          src={`/images/skills/${spell2Img}`}
          alt={spell2Img}
        />
      </div>
      <div className={classes.name}>{props.summonerName}</div>
    </div>
  );
};

export default ChampionInfo;
