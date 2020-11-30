import React from 'react';
import SkillContainer from './SkillContainer';
import PassiveContainer from './PassiveContainer';
import classes from './ChampionBanner.module.css';

const ChampionBanner = (props) => {
  const data = require(`../data/SingleChampionData/${props.id}.json`);

  const championData = {
    info: {
      name: data['data'][props.id]['name'],
      difficulty: data['data'][props.id]['info']['difficulty']
    },

    q: {
      name: data['data'][props.id]['spells'][0]['name'],
      desc: data['data'][props.id]['spells'][0]['description'],
      cd: data['data'][props.id]['spells'][0]['cooldown'],
      cost: data['data'][props.id]['spells'][0]['cost'],
      range: data['data'][props.id]['spells'][0]['range'],
      img: data['data'][props.id]['spells'][0]['image']['full'],
      key: 'Q'
    },

    w: {
      name: data['data'][props.id]['spells'][1]['name'],
      desc: data['data'][props.id]['spells'][1]['description'],
      cd: data['data'][props.id]['spells'][1]['cooldown'],
      cost: data['data'][props.id]['spells'][1]['cost'],
      range: data['data'][props.id]['spells'][1]['range'],
      img: data['data'][props.id]['spells'][1]['image']['full'],
      key: 'W'
    },
    e: {
      name: data['data'][props.id]['spells'][2]['name'],
      desc: data['data'][props.id]['spells'][2]['description'],
      cd: data['data'][props.id]['spells'][2]['cooldown'],
      cost: data['data'][props.id]['spells'][2]['cost'],
      range: data['data'][props.id]['spells'][2]['range'],
      img: data['data'][props.id]['spells'][2]['image']['full'],
      key: 'E'
    },
    r: {
      name: data['data'][props.id]['spells'][3]['name'],
      desc: data['data'][props.id]['spells'][3]['description'],
      cd: data['data'][props.id]['spells'][3]['cooldown'],
      cost: data['data'][props.id]['spells'][3]['cost'],
      range: data['data'][props.id]['spells'][3]['range'],
      img: data['data'][props.id]['spells'][3]['image']['full'],
      key: 'R'
    },
    p: {
      name: data['data'][props.id]['passive']['name'],
      desc: data['data'][props.id]['passive']['description'],
      img: data['data'][props.id]['passive']['image']['full']
    }
  };

  return (
    <div className={classes.parent}>
      <img
        className={classes.img}
        src={`/images/portrait/${props.id}.png`}
        alt={championData.name}
      />
      <div>
        <div className={classes.name}>{championData.info.name}</div>
        <div className={classes.difficulty}>
          Difficulty: {championData.info.difficulty}
        </div>
        <div className={classes.imgcontainer}>
          <div className={classes.skillimg}>
            <PassiveContainer data={championData.p} />
          </div>
          <div className={classes.skillimg}>
            <SkillContainer data={championData.q} />
          </div>

          <div className={classes.skillimg}>
            <SkillContainer data={championData.w} />
          </div>
          <div className={classes.skillimg}>
            <SkillContainer data={championData.e} />
          </div>
          <div className={classes.skillimg}>
            <SkillContainer data={championData.r} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionBanner;
