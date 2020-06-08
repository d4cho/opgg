import data from './summonerSpells.json';

const spellData = Object.keys(data['data']).map((item) => {
  return {
    key: parseInt(data['data'][item]['key']),
    name: data['data'][item]['name'],
    desc: data['data'][item]['description'],
    img: data['data'][item]['image']['full']
  };
});

export default spellData;
