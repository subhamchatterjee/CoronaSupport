import React, {Component} from 'react';
import Swal from 'sweetalert2';

export default class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    componentDidMount() {
        let pathname = window.location.pathname, route = null;
        if (pathname === '/dashboard') route = 'Dashboard';
        else if (pathname === '/manage-materials') route = 'Materials';
        else if (pathname === '/manage-districts') route = 'Districts';
        else if (pathname === '/manage-users') route = 'Users';

        if (route) this.setState({route});
    }

    logout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Yes, Logout'
        }).then(res => {
            if (res.value) {
                this.props.logoutUser();
            }
        });
    };

    render() {
        return (
            <div className="top-menu">
                <div className="left-container">
                    <a className="menu-item" href="/"><img src="/images/logo.png" height="50"/></a>
                    <div className="menu-items">
                        <a className={this.state.route === "Dashboard" ? "menu-item selected" : "menu-item"}
                           href={window.location.pathname === '/dashboard' ? null : '/dashboard'}>Dashboard</a>

                        <a className={this.state.route === "Materials" ? "menu-item selected" : "menu-item"}
                           href={window.location.pathname === '/manage-materials' ? null : '/manage-materials'}>Manage
                            Materials</a>

                        <a className={this.state.route === "Districts" ? "menu-item selected" : "menu-item"}
                           href={window.location.pathname === '/manage-districts' ? null : '/manage-districts'}>Manage
                            Districts</a>

                        <a className={this.state.route === "Users" ? "menu-item selected" : "menu-item"}
                           href={window.location.pathname === '/manage-users' ? null : '/manage-users'}>Manage Users</a>
                    </div>
                </div>
                <div className="current-user">
                    <div
                        className="name">{this.props.userData.fullName ? this.props.userData.fullName : this.props.userData.email}</div>
                    <div className="logout-btn" onClick={this.logout}><i className="fas fa-sign-out-alt"></i></div>
                </div>
            </div>
        );
    }
}
