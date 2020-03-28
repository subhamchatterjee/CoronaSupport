import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class DashboardPage extends Component {
	logout = () => {
		Swal.fire({
			title: 'Are you sure you want to logout?',
			type: 'warning',
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Yes, Logout'
		}).then(res => {
			if(res.value){
				this.props.logoutUser();
			}
		});
	}

	render() {
		return (
			<div className="dashboard-page">
				<h2 className="text-center">COMBATING COVID-19</h2>
				<h3 className="text-center">ADMINISTRATOR MODULE</h3>
				<div className="buttons-container">
					<a className="button" href="/">
						HOMEPAGE
					</a>
					<a className="button" href="/manage-users">
						MANAGE USERS
					</a>
					<a className="button" href="/add-material">
						ADD MATERIAL
					</a>
					<a className="button" href="/manage-districts">
						MANAGE DISTRICT<br />(Requirements & Fulfillments)
					</a>
					<a className="button" href="/manage-materials">
						MANAGE MATERIAL<br />(Requirements & Fulfillments)
					</a>
				</div>
				<div className="footer-button" onClick={this.logout}>
					LOGOUT
				</div>
			</div>
		);
	}
}
