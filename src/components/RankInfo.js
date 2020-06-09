import React from 'react';
import classes from './RankInfo.module.css';

const RankInfo = (props) => {
  let [type, tier, rank, LP, wins, losses] = props.children;
  const winRate = Math.round((wins / (wins + losses)) * 100);

  switch (rank) {
    case 'I':
      rank = 1;
      break;

    case 'II':
      rank = 2;
      break;

    case 'III':
      rank = 3;
      break;

    case 'IV':
      rank = 4;
      break;
  }

  if (tier === 'MASTER' || tier === 'GRANDMASTER') {
    rank = null;
  }

  return (
    <div className={classes.parent}>
      <div>
        <img
          className={classes.img}
          src={`/images/rankedIcons/${tier}.png`}
          alt={tier}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.type}>{type}</div>
        {tier === 'UNRANKED' ? (
          <div className={classes.type}>Unranked</div>
        ) : (
          <>
            <div className={classes.tier}>
              {tier} {rank}
            </div>
            <div
              className={classes.stats}>{`${LP} LP / ${wins}W ${losses}L`}</div>
            <div className={classes.winRate}>Win Rate {winRate}%</div>
          </>
        )}
      </div>
    </div>
  );
};

export default RankInfo;
