import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {createBrowserHistory} from 'history';

import LandingPage from './components/LandingPage';
import AddMaterialPage from './components/AddMaterialPage';
import ManageMaterialsPage from './components/ManageMaterialsPage';
import ManageSingleMaterialPage from './components/ManageSingleMaterialPage';

const history = createBrowserHistory();

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to="/maharashtra" />
          {/*<Route exact path="/add-material" component={AddMaterialPage} />
          <Route exact path="/edit-material/:materialId" component={AddMaterialPage} />
          <Route exact path="/manage-materials" component={ManageMaterialsPage} />
          <Route exact path="/manage-material/:materialId" component={ManageSingleMaterialPage} />*/}
          <Route exact path="/:state" component={LandingPage} />
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    )
  }
}