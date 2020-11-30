import React from 'react';
import championData from '../data/championData';
import classes from './SummaryPlayers.module.css';

const SummaryPlayers = (props) => {
  let playersArr = props.playerInfo;
  const players = playersArr.map((item) => {
    let img = championData.find((el) => el.key === item.championId).img;
    return (
      <div key={item.participantId} className={classes.player}>
        <img src={`/images/portrait/${img}`} alt={img} />
        <a
          href={`http://localhost:3000/summoner/${item.summonerName}`}
          target='_blank'>
          <div className={classes.name}>{item.summonerName}</div>
        </a>
      </div>
    );
  });
  return <div className={classes.parent}>{players}</div>;
};

export default SummaryPlayers;
