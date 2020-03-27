import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {createBrowserHistory} from 'history';

import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import AddMaterialPage from './components/AddMaterialPage';
import ManageMaterialsPage from './components/ManageMaterialsPage';
import ManageFulfilmentsPage from './components/ManageFulfilmentsPage';
import ManageSingleMaterialPage from './components/ManageSingleMaterialPage';

const history = createBrowserHistory();

const readCookie = require('./cookie.js').readCookie;
const eraseCookie = require('./cookie.js').eraseCookie;
const createCookie = require('./cookie.js').createCookie;

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null
    }
  }

  componentDidMount() {
    if(readCookie('access_token') !== null) {
      this.setState({ access_token: readCookie('access_token') });
    } else {
      eraseCookie('access_token');
      eraseCookie('refresh_token');
      this.setState({ access_token: null });
    }
  }

  logoutUser = () => {
    fetch(process.env.REACT_APP_API_URL + '/logout', {
      method: "POST",
      headers: {
        'Auth': JSON.parse(readCookie('access_token'))
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      eraseCookie('access_token');
      eraseCookie('refresh_token');
      this.setState({ access_token: null });
    }).catch((error) => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  render() {
    if(readCookie('access_token') !== null) {
      return (
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/maharashtra" />
            <Route exact path="/add-material" component={AddMaterialPage} />
            <Route exact path="/edit-material/:materialId" component={AddMaterialPage} />
            <Route exact path="/manage-materials" component={ManageMaterialsPage} />
            <Route exact path="/manage-material/:materialId" component={ManageSingleMaterialPage} />
            <Route exact path="/fulfilments/:requirementId" component={ManageFulfilmentsPage} />
            <Route exact path="/:state" component={LandingPage} />
            <Redirect path="*" to="/maharashtra" />
          </Switch>
        </Router>
      )
    } else {
      return (
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/maharashtra" />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/:state" component={LandingPage} />
            <Redirect path="*" to="/maharashtra" />
          </Switch>
        </Router>
      )
    }
  }
}