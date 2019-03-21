
import React, { Component } from 'react';
import './App.css';
import GameScreen from './components/gamescreen/gamescreen';

import NotFound from './components/notfound/notfound';
import {BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import LoginScreen from './components/loginscreen/loginscreen';
function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem("token")
        ? <Component {...props} />
        : <Redirect to={{pathname: '/game', state: {from: props.location}}} />}
    />
  )
}
class App extends Component {

  render() {
    return (
      <BrowserRouter>

      <Switch>
        <Route exact path='/' component={LoginScreen} />
        {/* <Route exact path="/game" component={GameScreen} /> */}
        <PrivateRoute exact path='/game'  component={GameScreen} />

        <Route exact path="*" component={NotFound} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
