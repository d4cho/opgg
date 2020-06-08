import React, { Component } from 'react';
import classes from './Searchbar.module.css';
import { Link } from 'react-router-dom';

class Searchbar extends Component {
  state = {
    userName: ''
  };

  getInputValue = (event) => {
    let value = event.target.value;

    this.setState({
      userName: value
    });
  };

  render() {
    return (
      <div className={classes.searchbar}>
        <input
          type='text'
          placeholder='Name1, Name2, ...'
          onChange={this.getInputValue}
        />

        <Link
          className={classes.link}
          to={{
            pathname: `/summoner/${this.state.userName}`,
            userName: this.state.userName
          }}>
          .GG
        </Link>
      </div>
    );
  }
}

export default Searchbar;
