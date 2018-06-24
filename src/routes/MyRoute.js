import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/layout/history';

import App from '../components/layout/App';
import Login from '../components/layout/Login';
import Start from '../components/layout/Start';


class MyRoute extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Start}/>
          <Route path="/app" component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/start" component={Start}/>
        </Switch>
      </Router>
    );
  }
}

export default MyRoute;