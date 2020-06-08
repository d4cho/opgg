import React from 'react';
import Objectives from './Objectives';
import TotalKills from './TotalKills';
import TotalGold from './TotalGold';
import classes from './ObjectivesContainer.module.css';

const ObjectivesContainer = (props) => {
  console.log(props.participantInfo);
  const participantInfo = [...props.participantInfo];

  const team1Kills = [];
  participantInfo
    .filter((item) => item.teamId === 100)
    .forEach((item) => team1Kills.push(item.kills));
  let totalKillsTeam1 = 0;
  if (team1Kills.length > 0) {
    totalKillsTeam1 = team1Kills.reduce((acc, curr) => acc + curr);
  }

  const team2Kills = [];
  participantInfo
    .filter((item) => item.teamId === 200)
    .forEach((item) => team2Kills.push(item.kills));
  let totalKillsTeam2 = 0;
  if (team2Kills.length > 0) {
    totalKillsTeam2 = team2Kills.reduce((acc, curr) => acc + curr);
  }

  const team1Gold = [];
  participantInfo
    .filter((item) => item.teamId === 100)
    .forEach((item) => team1Gold.push(item.goldEarned));
  let totalGoldTeam1 = 0;
  if (team1Gold.length > 0) {
    totalGoldTeam1 = team1Gold.reduce((acc, curr) => acc + curr);
  }

  const team2Gold = [];
  participantInfo
    .filter((item) => item.teamId === 200)
    .forEach((item) => team2Gold.push(item.goldEarned));
  let totalGoldTeam2 = 0;
  if (team2Gold.length > 0) {
    totalGoldTeam2 = team2Gold.reduce((acc, curr) => acc + curr);
  }

  let winTeam = 1;
  if (props.teamInfo[1]['win'] === 'Win') {
    winTeam = 2;
  }

  return (
    <div>
      <div className={classes.parent}>
        <Objectives
          towerKills={props.teamInfo[0]['towerKills']}
          baronKills={props.teamInfo[0]['baronKills']}
          dragonKills={props.teamInfo[0]['dragonKills']}
        />
        <div className={classes.total}>
          <TotalKills
            team1Kills={totalKillsTeam1}
            team2Kills={totalKillsTeam2}
            winTeam={winTeam}
          />
          <TotalGold
            team1Gold={totalGoldTeam1}
            team2Gold={totalGoldTeam2}
            winTeam={winTeam}
          />
        </div>
        <Objectives
          towerKills={props.teamInfo[1]['towerKills']}
          baronKills={props.teamInfo[1]['baronKills']}
          dragonKills={props.teamInfo[1]['dragonKills']}
        />
      </div>
    </div>
  );
};

export default ObjectivesContainer;
