import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Champions from './containers/Champions';
import SingleChampion from './containers/SingleChampion';
import Summoner from './containers/Summoner';
import Error from './containers/Error';
export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api';

import './index.css';

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/champions' component={Champions} />
        <Route exact path='/champions/:name' component={SingleChampion} />
        <Route exact path='/summoner/:userName' component={Summoner} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
