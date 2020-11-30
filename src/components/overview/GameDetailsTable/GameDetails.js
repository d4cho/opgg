import React from 'react';
import PlayerDetailContainer from './PlayerDetailContainer';

const GameDetails = (props) => {
  return (
    <tr>
      <PlayerDetailContainer
        assists={props.assists}
        championId={props.championId}
        champLevel={props.champLevel}
        deaths={props.deaths}
        goldEarned={props.goldEarned}
        item0={props.item0}
        item1={props.item1}
        item2={props.item2}
        item3={props.item3}
        item4={props.item4}
        item5={props.item5}
        item6={props.item6}
        kills={props.kills}
        neutralMinionsKilled={props.neutralMinionsKilled}
        participantId={props.participantId}
        rank={props.rank}
        spell1Id={props.spell1Id}
        spell2Id={props.spell2Id}
        summonerName={props.summonerName}
        tier={props.tier}
        totalDamageDealt={props.totalDamageDealt}
        totalDamageDealtToChampions={props.totalDamageDealtToChampions}
        totalMinionsKilled={props.totalMinionsKilled}
        visionWardsBoughtInGame={props.visionWardsBoughtInGame}
        wardsKilled={props.wardsKilled}
        wardsPlaced={props.wardsPlaced}
        totalKills={props.totalKills}
        gameDuration={props.gameDuration}
        highestDamage={props.highestDamage}
      />
    </tr>
  );
};

export default GameDetails;
