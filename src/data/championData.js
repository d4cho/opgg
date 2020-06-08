import data from './champion.json';

const keyArr = Object.keys(data['data']);

const allData = keyArr.map((item) => {
  return {
    key: parseInt(data['data'][item]['key']),
    name: data['data'][item]['name'],
    img: data['data'][item]['image']['full']
  };
});

export default allData;
