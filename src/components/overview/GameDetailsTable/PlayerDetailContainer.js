import React from 'react';
import ChampionInfo from './ChampionInfo';
import Tier from './Tier';
import KDA from './KDA';
import Wards from './Wards';
import CS from './CS';
import Items from './Items';
import DamageBar from './DamageBar';

const PlayerDetailContainer = (props) => {
  return (
    <>
      <td>
        <ChampionInfo
          championId={props.championId}
          champLevel={props.champLevel}
          spell1Id={props.spell1Id}
          spell2Id={props.spell2Id}
          summonerName={props.summonerName}
        />
      </td>
      <td>
        <Tier tier={props.tier} rank={props.rank} />
      </td>
      <td>
        <KDA
          kills={props.kills}
          deaths={props.deaths}
          assists={props.assists}
          totalKills={props.totalKills}
        />
      </td>
      <td>
        <DamageBar
          highestDamage={props.highestDamage}
          totalDamageDealtToChampions={props.totalDamageDealtToChampions}
        />
      </td>
      <td>
        <Wards
          visionWardsBoughtInGame={props.visionWardsBoughtInGame}
          wardsKilled={props.wardsKilled}
          wardsPlaced={props.wardsPlaced}
        />
      </td>
      <td>
        <CS
          neutralMinionsKilled={props.neutralMinionsKilled}
          totalMinionsKilled={props.totalMinionsKilled}
          gameDuration={props.gameDuration}
        />
      </td>
      <td>
        <Items
          item0={props.item0}
          item1={props.item1}
          item2={props.item2}
          item3={props.item3}
          item4={props.item4}
          item5={props.item5}
          item6={props.item6}
        />
      </td>
    </>
  );
};
export default PlayerDetailContainer;
