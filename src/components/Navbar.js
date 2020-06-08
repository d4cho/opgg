import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <div className={classes.navbar}>
        <ul className={classes.ul}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/champions'>Champions</Link>
          </li>
          <li>
            <Link to='/stats'>Stats</Link>
          </li>
          <li>
            <Link to='/leaderboards'>Leaderboards</Link>
          </li>
          <li>
            <Link to='/promatches'>Pro Matches</Link>
          </li>
          <li>
            <Link to='/extension'>Extension</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
