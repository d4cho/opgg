import React from 'react';
import { Link } from 'react-router-dom';
import opgglogo from '../images/opgg-logo.jpeg';
import lollogo from '../images/lol-logo.jpg';
import classes from './Topbar.module.css';

const Topbar = () => {
  return (
    <div className={classes.topbar}>
      <Link to='/'>
        <img src={opgglogo} alt='opgg logo' />
      </Link>
      <a href='https://na.leagueoflegends.com/en-us/?utm_source=riotbar&utm_medium=card1&utm_campaign=lol&utm_content=lol_key01'>
        <img src={lollogo} alt='lol logo' />
      </a>
    </div>
  );
};

export default Topbar;
