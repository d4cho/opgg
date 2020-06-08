import React, { Component } from 'react';
import classes from './Home.module.css';
import kaylehomepage from '../images/kayle-homepage.png';
import Searchbar from '../components/Searchbar';

class Home extends Component {
  render() {
    return (
      <div className={classes.home}>
        <div className={classes.picture}>
          <img src={kaylehomepage} alt='kayle' />
        </div>
        <Searchbar />
      </div>
    );
  }
}

export default Home;
