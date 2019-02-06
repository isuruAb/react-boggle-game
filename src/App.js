
import React, { Component } from 'react';
import './App.css';
import GameScreen from './components/gamescreen/gamescreen';

import NotFound from './components/notfound/notfound';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from './components/loginscreen/loginscreen';

class App extends Component {

  render() {
    return (
      <BrowserRouter>

      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route exact path="/game/:slug" component={GameScreen} />
        <Route exact path="*" component={NotFound} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
