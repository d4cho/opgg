import React from 'react';
import championData from '../../../data/championData';
import spellData from '../../../data/summonerSpellsData';
import classes from './ChampionInfo.module.css';

const ChampionInfo = (props) => {
  const champName = championData.find((item) => item.key === props.championId)
    .name;
  const champImg = championData.find((item) => item.key === props.championId)
    .img;
  const spell1Img = spellData.find((item) => item.key === props.spell1Id).img;
  const spell2Img = spellData.find((item) => item.key === props.spell2Id).img;
  return (
    <div className={classes.parent}>
      <a href={`http://localhost:3000/champions/${champName}`} target='_blank'>
        <img
          className={classes.portrait}
          src={`/images/portrait/${champImg}`}
          alt={champImg}
        />
      </a>
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
      <a
        href={`http://localhost:3000/summoner/${props.summonerName}`}
        target='_blank'>
        <div className={classes.name}>{props.summonerName}</div>
      </a>
    </div>
  );
};

export default ChampionInfo;
