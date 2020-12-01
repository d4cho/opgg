import React, { Component } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import SummaryContainer from '../components/SummaryContainer';
import SummaryType from '../components/SummaryType';
import SummarySpells from '../components/SummarySpells';
import SummaryKDA from '../components/SummaryKDA';
import SummaryStats from '../components/SummaryStats';
import SummaryItems from '../components/SummaryItems';
import SummaryPlayers from '../components/SummaryPlayers';
import classes from './MatchSummary.module.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Overview from './Overview';

// data = {
//   gameDuration: 1108,
//   participantInfo: [
//     {
//       participantId: 1,
//       summonerName: 'Sy7777777ˇ',
//       participantIdCheck: 1,
//       championId: 69,
//       kills: 2
//     },
//     {
//       participantId: 2,
//       summonerName: '             Tcº',
//       participantIdCheck: 2,
//       championId: 39,
//       kills: 4
//     },
//     {
//       participantId: 3,
//       summonerName: 'Sweet GirI',
//       participantIdCheck: 3,
//       championId: 21,
//       kills: 0
//     },
//     {
//       participantId: 4,
//       summonerName: 'Chas3',
//       participantIdCheck: 4,
//       championId: 35,
//       kills: 4
//     },
//     {
//       participantId: 5,
//       summonerName: 'awqfr312tgfr',
//       participantIdCheck: 5,
//       championId: 43,
//       kills: 0
//     },
//     {
//       participantId: 6,
//       summonerName: 'Viizay',
//       participantIdCheck: 6,
//       championId: 236,
//       kills: 1
//     },
//     {
//       participantId: 7,
//       summonerName: 'Familiar',
//       participantIdCheck: 7,
//       championId: 30,
//       kills: 1
//     },
//     {
//       participantId: 8,
//       summonerName: 'Cplus',
//       participantIdCheck: 8,
//       championId: 81,
//       kills: 1
//     },
//     {
//       participantId: 9,
//       summonerName: 'KINGSLAYER RYKEN',
//       participantIdCheck: 9,
//       championId: 85,
//       kills: 3
//     },
//     {
//       participantId: 10,
//       summonerName: 'j71101',
//       participantIdCheck: 10,
//       championId: 432,
//       kills: 2
//     }
//   ],
//   playerInfo: {
//     assists: 4,
//     championId: 81,
//     deaths: 1,
//     item0: 0,
//     item1: 1055,
//     item2: 1036,
//     item3: 3025,
//     item4: 3042,
//     item5: 3158,
//     item6: 3363,
//     kills: 1,
//     largestMultiKill: 3,
//     neutralMinionsKilled: 0,
//     spell1Id: 7,
//     spell2Id: 4,
//     totalMinionsKilled: 147,
//     win: true
//   },
//   queue: 420
// };

class MatchSummary extends Component {
  state = {
    data: {},
    isLoading: true,
    showOverview: false
  };

  componentDidMount() {
    // change host for production mode
    let host = 'http://localhost:18080/';
    if (process.env.NODE_ENV === 'production') {
      host = '/';
    }

    axios
      .post(
        `${host}summoner/${this.props.userName}/matchsummary`,
        this.props.matchInfo
      )
      .then((res) => {
        this.setState({
          data: res.data,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  overviewClicked = () => {
    this.setState({
      showOverview: !this.state.showOverview
    });
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div
        className={
          _.get(this.state, 'data.playerInfo.win')
            ? classes.parentVictory
            : classes.parentDefeat
        }>
        <SummaryContainer>
          <SummaryType
            type={_.get(this.state, 'data.queue')}
            win={_.get(this.state, 'data.playerInfo.win')}
            time={this.state.data.gameDuration}
          />
          <SummarySpells
            champion={_.get(this.state, 'data.playerInfo.championId')}
            spell1Id={_.get(this.state, 'data.playerInfo.spell1Id')}
            spell2Id={_.get(this.state, 'data.playerInfo.spell2Id')}
          />
          <SummaryKDA
            kills={_.get(this.state, 'data.playerInfo.kills')}
            deaths={_.get(this.state, 'data.playerInfo.deaths')}
            assists={_.get(this.state, 'data.playerInfo.assists')}
            multikills={_.get(this.state, 'data.playerInfo.largestMultiKill')}
          />
          <SummaryStats
            level={_.get(this.state, 'data.playerInfo.champLevel')}
            totalMinionsKilled={_.get(
              this.state,
              'data.playerInfo.totalMinionsKilled'
            )}
            neutralMinionsKilled={_.get(
              this.state,
              'data.playerInfo.neutralMinionsKilled'
            )}
            time={this.state.data.gameDuration}
            team1Kills={_.get(this.state, 'data.teamInfo.team1Kills')}
            team2Kills={_.get(this.state, 'data.teamInfo.team2Kills')}
            team={_.get(this.state, 'data.playerInfo.teamId')}
            kills={_.get(this.state, 'data.playerInfo.kills')}
            assists={_.get(this.state, 'data.playerInfo.assists')}
          />
          <SummaryItems
            item0={_.get(this.state, 'data.playerInfo.item0')}
            item1={_.get(this.state, 'data.playerInfo.item1')}
            item2={_.get(this.state, 'data.playerInfo.item2')}
            item3={_.get(this.state, 'data.playerInfo.item3')}
            item4={_.get(this.state, 'data.playerInfo.item4')}
            item5={_.get(this.state, 'data.playerInfo.item5')}
            item6={_.get(this.state, 'data.playerInfo.item6')}
            controlWards={_.get(
              this.state,
              'data.playerInfo.visionWardsBoughtInGame'
            )}
          />
          <SummaryPlayers
            playerInfo={_.get(this.state, 'data.participantInfo')}
          />
          <button onClick={this.overviewClicked}>
            {this.state.showOverview ? (
              <IoIosArrowUp className={classes.arrow} />
            ) : (
              <IoIosArrowDown className={classes.arrow} />
            )}
          </button>
        </SummaryContainer>
        {this.state.showOverview ? (
          <Overview
            gameId={this.props.matchInfo.gameId}
            userName={this.props.userName}
            participantInfo={_.get(this.state, 'data.participantInfo')}
          />
        ) : null}
      </div>
    );
  }
}
export default MatchSummary;
