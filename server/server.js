const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();

// express static files
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
// my API stuff
const API_KEY = 'API_KEY';

app.use('/api', function (req, res, next) {
    const apiKey = app.get(API_KEY);
    if (!apiKey) {
        return res.status(401).json({
            error: 'api_key_missing'
        });
    }
    next();
});

let config = () => ({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,ko;q=0.7',
    'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://developer.riotgames.com',
    'X-Riot-Token': app.get(API_KEY)
  }
});

app.get('/api/summoner/:summonerName', function (req, res) {
  const RIOT_API_KEY = app.get(API_KEY);
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${RIOT_API_KEY}`,
      config()
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
          config()
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

          axios
            .get(
              `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`,
              config()
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
        return res.status(401).json({
            error: 'api_key_expired',
            detail: error
        });
    });
});

app.post('/api/summoner/:summonerName/matchsummary', function (req, res) {
  const RIOT_API_KEY = app.get(API_KEY);

  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.body.gameId}?api_key=${RIOT_API_KEY}`,
      config()
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
         return res.status(401).json({
            error: 'api_key_expired',
            detail: error
        });;
    });
});

app.get('/api/summoner/:summonerName/matchoverview', function (req, res) {
  const RIOT_API_KEY = app.get(API_KEY);
  let gameDuration, teamInfo, participantInfo;
  axios
    .get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.query.gameId}?api_key=${RIOT_API_KEY}`,
      config()
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
          config()
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
        return res.status(401).json({
            error: 'api_key_expired',
            detail: error
        });;
    });
});

app.post('/internal/apikey', function (req, res) {
    const {apiKey} = req.body;
    app.set(API_KEY, apiKey);
});

app.listen(process.env.PORT || 8080);
