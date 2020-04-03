import React, { Component } from 'react';
import Swal from 'sweetalert2';

//Use authHeader()
// designation: Cookies.get('user_designation')
//Apply  logic on this designation
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
		else if (pathname === '/procurer-allocations') route = 'Procurers';
		else if (pathname === '/procurer-orders') route = 'Orders';
		else if (pathname === '/procurer-requests') route = 'Requests';
		else if (pathname === '/manage-users') route = 'Users';
		else if (pathname === '/request-items') route = 'Request Items';
		else if (pathname === '/receive-items') route = 'Receive Items';
		else if (pathname === '/manage-requests') route = 'Manage Requests';
		else if (pathname === '/HaffkineReceive') route = 'HaffkineReceive';
		else if (pathname === '/HaffkineAllocateItems') route = 'HaffkineAllocateItems';
		else if (pathname === '/HaffkineViewInventory') route = 'HaffkineViewInventory';
		else if (pathname === '/create-material') route = 'Create Material';
		else if (pathname === '/declare-placed-orders') route = 'Declare Placed Orders';

		if (route) this.setState({ route });
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
					<a className="menu-item" href="/"><img src="/images/logo.png" height="50" /></a>
					<div className="menu-items">
						<a className={this.state.route === "Dashboard" ? "menu-item selected" : "menu-item"}
							href={window.location.pathname === '/dashboard' ? null : '/dashboard'}>Dashboard</a>

						{this.props.userData.role.name === "REQUESTOR" ? (
							<a className={this.state.route === "Request Items" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/request-items' ? null : '/request-items'}>Request Items</a>
						) : (null)}

						{this.props.userData.role.name === "REQUESTOR" ? (
							<a className={this.state.route === "Receive Items" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/receive-items' ? null : '/receive-items'}>Receive Items</a>
						) : (null)}

						{this.props.userData.role.name === "APPROVER" ? (
							<a className={this.state.route === "Manage Requests" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/manage-requests' ? null : '/manage-requests'}>Manage Requests</a>
						) : (null)}



						{this.props.userData.role.name === "APPROVER" ? (
							<a className={this.state.route === "HaffkineReceive" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/HaffkineReceive' ? null : '/HaffkineReceive'}>HaffkineReceive</a>
						) : (null)}

						{this.props.userData.role.name === "APPROVER" ? (
							<a className={this.state.route === "HaffkineAllocateItems" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/HaffkineAllocateItems' ? null : '/HaffkineAllocateItems'}>HaffkineAllocateItems</a>
						) : (null)}

						{this.props.userData.role.name === "APPROVER" ? (
							<a className={this.state.route === "HaffkineViewInventory" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/HaffkineViewInventory' ? null : '/HaffkineViewInventory'}>HaffkineViewInventory</a>
						) : (null)}

						{this.props.userData.role.name === "FUNDRAISER" ? (
							<a className={this.state.route === "Create Material" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/create-material' ? null : '/create-material'}>Create Material</a>
						) : (null)}

						{this.props.userData.role.name === "FUNDRAISER" ? (
							<a className={this.state.route === "Declare Placed Orders" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/declare-placed-orders' ? null : '/declare-placed-orders'}>Declare Placed Orders</a>
						) : (null)}

						{this.props.userData.role.name === "PROCURER" ? (
							<a className={this.state.route === "Procurers" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/procurer-allocations' ? null : '/procurer-allocations'}>Allocation</a>
						) : (null)}

						{this.props.userData.role.name === "PROCURER" ? (
							<a className={this.state.route === "Orders" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/procurer-orders' ? null : '/procurer-orders'}>Orders</a>
						) : (null)}

						{this.props.userData.role.name === "PROCURER" ? (
							<a className={this.state.route === "Requests" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/procurer-requests' ? null : '/procurer-requests'}>Requests</a>
						) : (null)}

						{this.props.userData.role.name === "PROCURER" ? (
							<a className={this.state.route === "Users" ? "menu-item selected" : "menu-item"}
								href={window.location.pathname === '/manage-users' ? null : '/manage-users'}>Manage Users</a>
						) : (null)}
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
