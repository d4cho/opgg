import React, { Component } from 'react';
import ChampionList from '../components/ChampionList';
import classes from './Champions.module.css';
import Filter from '../components/Filter';
import allData from '../data.json';

class Champions extends Component {
  state = {
    champions: [],
    filteredChampions: []
  };

  componentDidMount() {
    // create array of keys ex. "Aatrox", "Ahri", etc.
    const keyArr = Object.keys(allData['data']);

    // use the keys to access the name property...
    const championsArr = keyArr.map((key) => {
      return {
        name: allData['data'][key]['name'],
        img: `/images/portrait/${key}.png`,
        role: allData['data'][key]['tags'],
        id: allData['data'][key]['id']
      };
    });

    this.setState({
      champions: championsArr,
      filteredChampions: championsArr
    });
  }

  filterChampion = (event) => {
    let value = event.target.value;
    let unfilteredChampions = [...this.state.champions];
    let filteredChampions = [];

    if (value === 'All') {
      filteredChampions = unfilteredChampions;
    }

    if (value === 'Assassin') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Assassin')
      );
    }

    if (value === 'Fighter') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Fighter')
      );
    }

    if (value === 'Mage') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Mage')
      );
    }

    if (value === 'Marksman') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Marksman')
      );
    }

    if (value === 'Support') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Support')
      );
    }

    if (value === 'Tank') {
      filteredChampions = unfilteredChampions.filter((item) =>
        item.role.includes('Tank')
      );
    }

    this.setState({
      filteredChampions: filteredChampions
    });
  };

  searchChampion = (event) => {
    let unfilteredChampions = [...this.state.champions];
    let filteredChampions = [];

    filteredChampions = unfilteredChampions.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    this.setState({
      filteredChampions: filteredChampions
    });
  };

  render() {
    return (
      <div className={classes.champions}>
        <Filter
          filterClicked={this.filterChampion}
          searching={this.searchChampion}
        />
        <ChampionList champions={this.state.filteredChampions} />
      </div>
    );
  }
}

export default Champions;
