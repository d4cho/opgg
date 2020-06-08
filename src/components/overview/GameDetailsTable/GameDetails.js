import React from 'react';
import PlayerDetailContainer from './PlayerDetailContainer';

const GameDetails = (props) => {
  // console.log(props.teamInfo);
  // console.log(props.participantInfo);

  // const participantInfo = [...props.participantInfo];

  // const participantInfoTeam1 = [
  //   ...participantInfo.filter((info) => info.teamId === 100)
  // ];
  // console.log(participantInfoTeam1);

  // const team1TotalKills = participantInfoTeam1
  //   .map((info) => {
  //     return info.kills;
  //   })
  //   .reduce((acc, val) => acc + val);

  // const playerDetailTeam1 = participantInfoTeam1.map((info) => {
  //   return (
  //     <tr key={info.championId}>
  //       <PlayerDetailContainer
  //         assists={info.assists}
  //         championId={info.championId}
  //         champLevel={info.champLevel}
  //         deaths={info.deaths}
  //         goldEarned={info.goldEarned}
  //         item0={info.item0}
  //         item1={info.item1}
  //         item2={info.item2}
  //         item3={info.item3}
  //         item4={info.item4}
  //         item5={info.item5}
  //         item6={info.item6}
  //         kills={info.kills}
  //         neutralMinionsKilled={info.neutralMinionsKilled}
  //         participantId={info.participantId}
  //         rank={info.rank}
  //         spell1Id={info.spell1Id}
  //         spell2Id={info.spell2Id}
  //         summonerName={info.summonerName}
  //         tier={info.tier}
  //         totalDamageDealt={info.totalDamageDealt}
  //         totalDamageDealtToChampions={info.totalDamageDealtToChampions}
  //         totalMinionsKilled={info.totalMinionsKilled}
  //         visionWardsBoughtInGame={info.visionWardsBoughtInGame}
  //         wardsKilled={info.wardsKilled}
  //         wardsPlaced={info.wardsPlaced}
  //         totalKills={team1TotalKills}
  //       />
  //     </tr>
  //   );
  // });

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
