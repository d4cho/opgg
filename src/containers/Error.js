import React, { Component } from 'react';
import classes from './Error.module.css';
import xayah from '../images/xayah-cosmic-dusk.jpg';

class Home extends Component {
  render() {
    return (
      <div className={classes.error}>
        <h1>404</h1>
        <img src={xayah} alt='xayah' />
        <h2>Page is under construction...</h2>
      </div>
    );
  }
}

export default Home;
