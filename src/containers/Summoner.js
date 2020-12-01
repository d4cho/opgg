import React, { Component } from 'react';
import classes from './Summoner.module.css';
import championData from '../data/championData';
import loading from '../images/loading-arrow.gif';
import Profile from '../components/Profile';
import RankedContainer from '../components/RankedContainer';
import RankInfo from '../components/RankInfo';
import MatchSummary from './MatchSummary';

import axios from 'axios';

class Summoner extends Component {
  state = {
    isLoading: true,
    summaryTabClicked: true,
    championTabClicked: false,
    userName: 'test',
    profileIcon: 0,
    level: 0,
    matchInfo: [
      {
        championPlayed: 0,
        gameId: 0,
        queue: 0
      }
    ],
    img: 'null',
    soloQueueType: 'Ranked Solo',
    soloTier: 'unranked',
    soloRank: 'null',
    soloLP: 0,
    soloWins: 0,
    soloLosses: 0,
    flexQueueType: 'Flex 5:5 Rank',
    flexTier: 'unranked',
    flexRank: 'null',
    flexLP: 0,
    flexWins: 0,
    flexLosses: 0
  };

  componentDidMount() {
    this.getdata();
  }

  updateButtonHandler = () => {
    this.setState({
      isLoading: true
    });
    this.getdata();
  };

  getdata = () => {
    // change host for production mode
    let host = 'http://localhost:18080/';
    if (process.env.NODE_ENV === 'production') {
      host = '/';
    }

    axios
      .get(`${host}summoner/${this.props.match.params.userName}`)
      .then((response) => {
        const userName = response.data['userName'];
        const profileIcon = response.data['profileIcon'];
        const level = response.data['level'];
        const matchInfo = response.data['matchInfo'];

        const soloTier = response.data['soloTier'];
        const soloRank = response.data['soloRank'];
        const soloLP = response.data['soloLP'];
        const soloWins = response.data['soloWins'];
        const soloLosses = response.data['soloLosses'];

        const flexTier = response.data['flexTier'];
        const flexRank = response.data['flexRank'];
        const flexLP = response.data['flexLP'];
        const flexWins = response.data['flexWins'];
        const flexLosses = response.data['flexLosses'];

        let img = null;
        for (const item of championData) {
          if (item.key === this.state.matchInfo.championPlayed) {
            img = item.img;
          }
        }

        this.setState({
          isLoading: false,
          userName: userName,
          profileIcon: profileIcon,
          level: level,
          matchInfo: matchInfo,
          img: img,
          soloTier: soloTier,
          soloRank: soloRank,
          soloLP: soloLP,
          soloWins: soloWins,
          soloLosses: soloLosses,
          flexTier: flexTier,
          flexRank: flexRank,
          flexLP: flexLP,
          flexWins: flexWins,
          flexLosses: flexLosses
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  summaryTabClickedHandler = () => {
    this.setState({
      summaryTabClicked: true,
      championTabClicked: false
    });
  };

  championTabClickedHandler = () => {
    this.setState({
      summaryTabClicked: false,
      championTabClicked: true
    });
  };

  render() {
    const matchSummary = this.state.matchInfo.map((match) => {
      return (
        <MatchSummary
          key={match.gameId}
          userName={this.state.userName}
          matchInfo={match}
        />
      );
    });

    if (!this.state.isLoading) {
      return (
        <div className={classes.parent}>
          <Profile
            img={`/images/profileIcon/21.png`}
            alt={this.state.profileIcon}
            userName={this.state.userName}
            level={this.state.level}
            updateClicked={this.updateButtonHandler}
            summaryClicked={this.summaryTabClickedHandler}
            championClicked={this.championTabClickedHandler}
          />
          {this.state.summaryTabClicked ? (
            <div>
              <RankedContainer>
                <RankInfo>
                  {this.state.soloQueueType}
                  {this.state.soloTier}
                  {this.state.soloRank}
                  {this.state.soloLP}
                  {this.state.soloWins}
                  {this.state.soloLosses}
                </RankInfo>
                <RankInfo>
                  {this.state.flexQueueType}
                  {this.state.flexTier}
                  {this.state.flexRank}
                  {this.state.flexLP}
                  {this.state.flexWins}
                  {this.state.flexLosses}
                </RankInfo>
              </RankedContainer>
              <div className={classes.matchSummaryContainer}>
                {matchSummary}
              </div>
            </div>
          ) : this.state.championTabClicked ? (
            <div>sorry, under construction</div>
          ) : null}
        </div>
      );
    }
    return <img className={classes.loading} src={loading} alt='loading' />;
  }
}

export default Summoner;
