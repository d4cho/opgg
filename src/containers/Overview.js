import React, { Component } from 'react';
import axios from 'axios';
import ObjectivesContainer from '../components/overview/ObjectivesContainer';
import loading from '../images/loading-arrow.gif';
import GameDetails from '../components/overview/GameDetailsTable/GameDetails';
import classes from './Overview.module.css';
import {API_BASE_URL} from '../App';

class Overview extends Component {
  state = {
    isLoading: true,
    data: {
      gameDuration: 0,
      participantInfo: [{}],
      teamInfo: [{}, {}]
    }
  };

  componentDidMount() {
    axios
      .get(
        `${API_BASE_URL}/${this.props.userName}/matchoverview`,
        {
          params: {
            gameId: this.props.gameId
          }
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          data: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.data);
    if (this.state.isLoading) {
      return (
        <div>
          <img src={loading} alt='loading' />
        </div>
      );
    }

    const participantInfo = [...this.state.data.participantInfo];

    const participantInfoTeam1 = [
      ...participantInfo.filter((info) => info.teamId === 100)
    ];

    const team1TotalKills = participantInfoTeam1
      .map((info) => {
        return info.kills;
      })
      .reduce((acc, val) => acc + val);

    const participantInfoTeam2 = [
      ...participantInfo.filter((info) => info.teamId === 200)
    ];

    const team2TotalKills = participantInfoTeam2
      .map((info) => {
        return info.kills;
      })
      .reduce((acc, val) => acc + val);

    const highestDamageArr = participantInfo.map((info) => {
      return info.totalDamageDealtToChampions;
    });

    const highestDamage = Math.max(...highestDamageArr);
    console.log(highestDamageArr, highestDamage);

    const GameDetailsTeam1 = participantInfoTeam1.map((info) => {
      return (
        <GameDetails
          key={info.championId}
          assists={info.assists}
          championId={info.championId}
          champLevel={info.champLevel}
          deaths={info.deaths}
          goldEarned={info.goldEarned}
          item0={info.item0}
          item1={info.item1}
          item2={info.item2}
          item3={info.item3}
          item4={info.item4}
          item5={info.item5}
          item6={info.item6}
          kills={info.kills}
          neutralMinionsKilled={info.neutralMinionsKilled}
          participantId={info.participantId}
          rank={info.rank}
          spell1Id={info.spell1Id}
          spell2Id={info.spell2Id}
          summonerName={info.summonerName}
          tier={info.tier}
          totalDamageDealt={info.totalDamageDealt}
          totalDamageDealtToChampions={info.totalDamageDealtToChampions}
          totalMinionsKilled={info.totalMinionsKilled}
          visionWardsBoughtInGame={info.visionWardsBoughtInGame}
          wardsKilled={info.wardsKilled}
          wardsPlaced={info.wardsPlaced}
          totalKills={team1TotalKills}
          gameDuration={this.state.data.gameDuration}
          highestDamage={highestDamage}
        />
      );
    });

    const GameDetailsTeam2 = participantInfoTeam2.map((info) => {
      return (
        <GameDetails
          key={info.championId}
          assists={info.assists}
          championId={info.championId}
          champLevel={info.champLevel}
          deaths={info.deaths}
          goldEarned={info.goldEarned}
          item0={info.item0}
          item1={info.item1}
          item2={info.item2}
          item3={info.item3}
          item4={info.item4}
          item5={info.item5}
          item6={info.item6}
          kills={info.kills}
          neutralMinionsKilled={info.neutralMinionsKilled}
          participantId={info.participantId}
          rank={info.rank}
          spell1Id={info.spell1Id}
          spell2Id={info.spell2Id}
          summonerName={info.summonerName}
          tier={info.tier}
          totalDamageDealt={info.totalDamageDealt}
          totalDamageDealtToChampions={info.totalDamageDealtToChampions}
          totalMinionsKilled={info.totalMinionsKilled}
          visionWardsBoughtInGame={info.visionWardsBoughtInGame}
          wardsKilled={info.wardsKilled}
          wardsPlaced={info.wardsPlaced}
          totalKills={team2TotalKills}
          gameDuration={this.state.data.gameDuration}
          highestDamage={highestDamage}
        />
      );
    });

    let result1 = 'Victory';
    let result2 = 'Defeat';
    let background1 = '#d8e4ec';
    let background2 = '#e9e0e0';
    let border1 = 'solid 1px #bacedc';
    let border2 = 'solid 1px #d8c0be';

    if (this.state.data.teamInfo[1]['win'] === 'Win') {
      result1 = 'Defeat';
      result2 = 'Victory';
      background1 = '#e9e0e0';
      background2 = '#d8e4ec';
      border1 = 'solid 1px #d8c0be';
      border2 = 'solid 1px #bacedc';
    }

    return (
      <>
        <table
          className={classes.table}
          style={{ background: `${background1}`, border: `${border1}` }}>
          <thead className={classes.header}>
            <tr>
              <th>{result1}</th>
              <th>Tier</th>
              <th>KDA</th>
              <th>Damage</th>
              <th>Wards</th>
              <th>CS</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>{GameDetailsTeam1}</tbody>
        </table>

        <ObjectivesContainer
          teamInfo={this.state.data.teamInfo}
          participantInfo={this.state.data.participantInfo}
        />
        <table
          className={classes.table}
          style={{ background: `${background2}`, border: `${border2}` }}>
          <thead className={classes.header}>
            <tr>
              <th>{result2}</th>
              <th>Tier</th>
              <th>KDA</th>
              <th>Damage</th>
              <th>Wards</th>
              <th>CS</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>{GameDetailsTeam2}</tbody>
        </table>
      </>
    );
  }
}

export default Overview;
