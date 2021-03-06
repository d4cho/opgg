const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

// express static files
app.use(bodyParser.json());
app.use(cors());

// my API stuff

const RIOT_API_KEY = 'RIOT_API_KEY';

let getConfig = () => ({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,ko;q=0.7',
    'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://developer.riotgames.com',
    'X-Riot-Token': app.get(RIOT_API_KEY)
  }
});

app.post('/api/key', (req, res) => {
  app.set(RIOT_API_KEY, req.body.key);
  return res.status(201).json({ success: true });
});

app.get('/api/summoner/:summonerName', function (req, res) {
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${RIOT_API_KEY}`,
      getConfig()
    )
    .then((response) => {
      const userName = response.data['name'];
      const profileIcon = response.data['profileIconId'];
      const level = response.data['summonerLevel'];
      const accountId = response.data['accountId'];
      const summonerId = response.data['id'];
      axios
        .get(
          `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${RIOT_API_KEY}`,
          getConfig()
        )
        .then((response) => {
          let matchInfo = [];
          for (let i = 0; i < 10; ++i) {
            matchInfo.push({
              championPlayed: response.data['matches'][i]['champion'],
              gameId: response.data['matches'][i]['gameId'],
              queue: response.data['matches'][i]['queue']
            });
          }

          // const matchInfo = {
          //   championPlayed: response.data['matches'][0]['champion'],
          // gameId: response.data['matches'][0]['gameId'],
          // queue: response.data['matches'][0]['queue']
          // };

          axios
            .get(
              `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`,
              getConfig()
            )
            .then((response) => {
              let soloLP = 0;
              let soloWins = 0;
              let soloLosses = 0;
              let soloTier = 'UNRANKED';
              let soloRank = '';
              let flexLP = 0;
              let flexWins = 0;
              let flexLosses = 0;
              let flexTier = 'UNRANKED';
              let flexRank = '';
              for (const item of response.data) {
                if (item['queueType'] === 'RANKED_FLEX_SR') {
                  flexTier = item['tier'];
                  flexRank = item['rank'];
                  flexLP = item['leaguePoints'];
                  flexWins = item['wins'];
                  flexLosses = item['losses'];
                }
                if (item['queueType'] === 'RANKED_SOLO_5x5') {
                  soloTier = item['tier'];
                  soloRank = item['rank'];
                  soloLP = item['leaguePoints'];
                  soloWins = item['wins'];
                  soloLosses = item['losses'];
                }
              }
              res.status(200).json({
                userName,
                profileIcon,
                level,
                matchInfo,
                soloTier,
                soloRank,
                soloLP,
                soloWins,
                soloLosses,
                flexTier,
                flexRank,
                flexLP,
                flexWins,
                flexLosses
              });
            });
        });
    })
    .catch((error) => {
      console.log('there is an error', error);
    });
});

app.post('/api/summoner/:summonerName/matchsummary', function (req, res) {
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.body.gameId}?api_key=${RIOT_API_KEY}`,
      getConfig()
    )
    .then((response) => {
      const gameDuration = response.data['gameDuration'];
      const participantIdentities = response.data['participantIdentities'].map(
        (item) => {
          return {
            participantId: item['participantId'],
            summonerName: item['player']['summonerName']
          };
        }
      );
      const participantChampions = response.data['participants'].map((item) => {
        return {
          participantIdCheck: item['participantId'],
          championId: item['championId'],
          kills: item['stats']['kills']
        };
      });
      const participantInfo = [];
      for (let i = 0; i < participantIdentities.length; ++i) {
        participantInfo[i] = {
          ...participantIdentities[i],
          ...participantChampions[i]
        };
      }
      const teamInfo = {
        team1Id: 100,
        team1Kills: [],
        team2Id: 200,
        team2Kills: []
      };
      for (const item of response.data['participants']) {
        if (item['teamId'] === 100) {
          teamInfo.team1Kills.push(item['stats']['kills']);
        } else {
          teamInfo.team2Kills.push(item['stats']['kills']);
        }
      }

      const playerInfo = {};
      for (const item of response.data['participants']) {
        if (item['championId'] === req.body.championPlayed) {
          (playerInfo.championId = item['championId']),
            (playerInfo.teamId = item['teamId']),
            (playerInfo.spell1Id = item['spell1Id']),
            (playerInfo.spell2Id = item['spell2Id']),
            (playerInfo.win = item['stats']['win']),
            (playerInfo.item0 = item['stats']['item0']),
            (playerInfo.item1 = item['stats']['item1']),
            (playerInfo.item2 = item['stats']['item2']),
            (playerInfo.item3 = item['stats']['item3']),
            (playerInfo.item4 = item['stats']['item4']),
            (playerInfo.item5 = item['stats']['item5']),
            (playerInfo.item6 = item['stats']['item6']),
            (playerInfo.kills = item['stats']['kills']),
            (playerInfo.deaths = item['stats']['deaths']),
            (playerInfo.assists = item['stats']['assists']),
            (playerInfo.largestMultiKill = item['stats']['largestMultiKill']),
            (playerInfo.totalMinionsKilled =
              item['stats']['totalMinionsKilled']),
            (playerInfo.neutralMinionsKilled =
              item['stats']['neutralMinionsKilled']),
            (playerInfo.champLevel = item['stats']['champLevel']),
            (playerInfo.visionWardsBoughtInGame =
              item['stats']['visionWardsBoughtInGame']);
        }
      }
      const queue = req.body.queue;
      res.status(200).json({
        queue,
        gameDuration,
        participantInfo,
        playerInfo,
        teamInfo
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/api/summoner/:summonerName/matchoverview', function (req, res) {
  let gameDuration, teamInfo, participantInfo;
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.query.gameId}?api_key=${RIOT_API_KEY}`,
      getConfig()
    )
    .then((response) => {
      gameDuration = response.data['gameDuration'];

      teamInfo = response.data['teams'].map((item) => {
        return {
          teamId: item['teamId'],
          win: item['win'],
          towerKills: item['towerKills'],
          baronKills: item['baronKills'],
          dragonKills: item['dragonKills']
        };
      });

      const participantInfo1 = response.data['participants'].map((item) => {
        return {
          participantId: item['participantId'],
          teamId: item['teamId'],
          championId: item['championId'],
          spell1Id: item['spell1Id'],
          spell2Id: item['spell2Id'],
          item0: item['stats']['item0'],
          item1: item['stats']['item1'],
          item2: item['stats']['item2'],
          item3: item['stats']['item3'],
          item4: item['stats']['item4'],
          item5: item['stats']['item5'],
          item6: item['stats']['item6'],
          kills: item['stats']['kills'],
          deaths: item['stats']['deaths'],
          assists: item['stats']['assists'],
          totalDamageDealt: item['stats']['totalDamageDealt'],
          totalDamageDealtToChampions:
            item['stats']['totalDamageDealtToChampions'],
          goldEarned: item['stats']['goldEarned'],
          totalMinionsKilled: item['stats']['totalMinionsKilled'],
          neutralMinionsKilled: item['stats']['neutralMinionsKilled'],
          champLevel: item['stats']['champLevel'],
          visionWardsBoughtInGame: item['stats']['visionWardsBoughtInGame'],
          wardsPlaced: item['stats']['wardsPlaced'],
          wardsKilled: item['stats']['wardsKilled']
        };
      });

      const participantInfo2 = response.data['participantIdentities'].map(
        (item) => {
          return {
            summonerName: item['player']['summonerName'],
            summonerId: item['player']['summonerId']
          };
        }
      );

      participantInfo = [];
      for (let i = 0; i < participantInfo1.length; i++) {
        participantInfo[i] = {
          ...participantInfo1[i],
          ...participantInfo2[i]
        };
      }

      //created array of promises
      //all get requests are sent at the same time using Promise.all()
      let participantRankPromises = [];
      for (const info of participantInfo) {
        let getSummonerPromise = axios.get(
          `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${info.summonerId}?api_key=${RIOT_API_KEY}`,
          getConfig()
        );
        participantRankPromises.push(getSummonerPromise);
      }
      return Promise.all(participantRankPromises);
    })
    .then((responses) => {
      const arr = responses.map((response) => {
        if (response.data.length === 0) {
          return {
            tier: 'Unranked',
            rank: ''
          };
        }
        return {
          tier: response.data[0]['tier'],
          rank: response.data[0]['rank']
        };
      });

      for (let i = 0; i < participantInfo.length; i++) {
        participantInfo[i] = {
          ...participantInfo[i],
          ...arr[i]
        };
      }

      res.status(200).json({
        gameDuration,
        teamInfo,
        participantInfo
      });
    })

    .catch((error) => {
      console.log(error);
    });
});

// for deployment
const path = require('path');
// to serve front end for production mode
if (process.env.NODE_ENV === 'production') {
  // set static folder
  // all js and css files will be read and served from this folder
  app.use(express.static(path.join(__dirname, '..', 'build')));

  // index.html for all page routes
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 18080;

app.listen(port, () => console.log(`Server started on port ${port}`));
