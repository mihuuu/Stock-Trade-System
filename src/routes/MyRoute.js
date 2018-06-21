import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/layout/history';

import App from '../components/layout/App';
import Login from '../components/layout/Login';


class MyRoute extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path="/app" component={App}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default MyRoute;