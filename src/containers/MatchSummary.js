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

class MatchSummary extends Component {
  state = {
    data: {},
    isLoading: true,
    showOverview: false
  };
  componentDidMount() {
    axios
      .post(
        `http://localhost:8080/summoner/${this.props.userName}/matchsummary`,
        this.props.matchInfo
      )
      .then((res) => {
        console.log(res);
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
    console.log(this.state.showOverview);
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
