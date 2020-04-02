import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { apiBaseUrl } from './components/config.jsx'

import TopMenu from './components/TopMenu';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/DashboardPage';

import DODashboardPage from './components/DODashboardPage';
import DHS1DashboardPage from './components/DHS1DashboardPage';
import AddMaterialPage from './components/AddMaterialPage';
import ManageUsersPage from './components/ManageUsersPage';
import ManageDistrictsPage from './components/ManageDistrictsPage';
import ManageMaterialsPage from './components/ManageMaterialsPage';
import ManageFulfilmentsPage from './components/ManageFulfilmentsPage';
import ManageSingleMaterialPage from './components/ManageSingleMaterialPage';
import ManageSingleDistrictPage from './components/ManageSingleDistrictPage';
import ProcurerAllocationPage from './components/ProcurerAllocationPage';
import ManageSingleAllocationPage from './components/ManageSingleAllocationPage';
import ProcurerOrderPage from './components/ProcurerOrderPage';
import ManageSingleOrderPage from './components/ManageSingleOrderPage';
import ProcurerRequestPage from './components/ProcurerRequestPage';
import ManageSingleRequestPage from './components/ManageSingleRequestPage';
import HaffkineAllocateItems from './components/HaffkineAllocateItems';
import DORequestPage from './components/DORequestPage';
import DOReceiveItems from './components/DOReceiveItems';
import DhsRequestPage from './components/DhsRequestPage';


const history = createBrowserHistory();

const readCookie = require('./cookie.js').readCookie;
const eraseCookie = require('./cookie.js').eraseCookie;
const createCookie = require('./cookie.js').createCookie;

const DefaultAppLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <>
                <TopMenu logoutUser={rest.logoutUser} userData={rest.userData} />
                <Component {...matchProps} userData={rest.userData} logoutUser={rest.logoutUser} />
            </>
        )} />
    )
};

const LandingPageLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <Component {...matchProps} userData={rest.userData} logoutUser={rest.logoutUser} />
        )} />
    )
};

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            userData: null
        }
    }

    componentDidMount() {
        if (readCookie('userData') !== null) {
            this.setState({ userData: JSON.parse(readCookie('userData')), loaded: true });
        } else {
            eraseCookie('userData');
            eraseCookie('access_token');
            eraseCookie('refresh_token');
            this.setState({ userData: null, loaded: true });
        }
    }

    logoutUser = () => {
        fetch(apiBaseUrl + '/logout', {
            method: "POST",
            headers: {
                'Auth': readCookie('access_token')
            },
            body: JSON.stringify({ refresh_token: readCookie('refresh_token') })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            eraseCookie('userData');
            eraseCookie('access_token');
            eraseCookie('refresh_token');
            this.setState({ userData: null });
        }).catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    };

    render() {
        if (this.state.loaded) {
            if (this.state.userData !== null) {
                return (
                    <Router history={history}>
                        <Switch>
                            <Redirect exact from="/" to="/maharashtra" />
                            <DefaultAppLayout exact path="/dashboard" component={DashboardPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/DOdashboard" component={DODashboardPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/DHS1DashboardPage" component={DHS1DashboardPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/DORequestPage" component={DORequestPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/DOReceiveItems" component={DOReceiveItems}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/DhsRequestPage" component={DhsRequestPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/HaffkineAllocateItems" component={HaffkineAllocateItems}
                                userData={this.state.userData} logoutUser={this.logoutUser} />





                            <DefaultAppLayout exact path="/add-material" component={AddMaterialPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/edit-material/:materialId" component={AddMaterialPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/manage-materials" component={ManageMaterialsPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/manage-material/:materialId"
                                component={ManageSingleMaterialPage} userData={this.state.userData}
                                logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/manage-districts" component={ManageDistrictsPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/manage-district/:districtId"
                                component={ManageSingleDistrictPage} userData={this.state.userData}
                                logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-allocations" component={ProcurerAllocationPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-allocation/:districtId"
                                component={ManageSingleAllocationPage} userData={this.state.userData}
                                logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-orders" component={ProcurerOrderPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-order/:districtId"
                                component={ManageSingleOrderPage} userData={this.state.userData}
                                logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-requests" component={ProcurerRequestPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/procurer-request/:districtId"
                                component={ManageSingleRequestPage} userData={this.state.userData}
                                logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/manage-users" component={ManageUsersPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <DefaultAppLayout exact path="/fulfilments/:requirementId" component={ManageFulfilmentsPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
                            <LandingPageLayout exact path="/:state" component={LandingPage}
                                userData={this.state.userData} logoutUser={this.logoutUser} />
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
        } else {
            return null;
        }
    }
}