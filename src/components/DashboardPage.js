import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Select } from 'antd';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class DashboardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			district: "",
			districts: []
		}
	}

	componentDidMount() {
		if(this.props.userData.districts.length) {
			this.setState({ districts: this.props.userData.districts });
		} else {
			fetch(apiBaseUrl + '/districts', {
				method: 'GET'
			}).then(data => data.json())
			.then(data => {
				if (data.status === 'ok') {
					this.setState({ districts: data.districts });
				}
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		}

		this.getDashboardData();
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
	}

	viewHistory = (item_id) => {

	}

	districtChange = (district) => {
		this.setState({ district }, () => { this.getDashboardData() });
	}

	getDashboardData = () => {
		let query = "";
		if(this.state.district) query += "?district=" + this.state.district;

		fetch(apiBaseUrl + '/api/v1/overview' + query, {
			method: 'GET',
			headers:  {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			if (data.status === 'ok') {
				this.setState({ items: data.data });
			}
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	render() {
		return (
			<div className="dashboard-page">
				<h2 className="text-center">Dashboard</h2>
				<div className="table-container">
					<div className="filter">
						<label className="control-label">District</label>
						<Select showSearch size="large" value={this.state.district} onChange={this.districtChange} style={{ width: 150 }}>
							<Option value="">All</Option>
							{this.state.districts.map(function (district, index) {
								return (
									<Option value={district.name} key={index}>{district.name}</Option>
								)
							})}
						</Select>
					</div>
					<div className="heading">
						<div className="column column-1">Item</div>
						<div className="column column-2">Items Requested</div>
						<div className="column column-3">Items Approved</div>
						<div className="column column-4">Items Received (State-Efforts)</div>
						<div className="column column-5">Orders Placed (Not yet received)</div>
						<div className="column column-6">Orders Dispatched</div>
						<div className="column column-7">Remaining requirement</div>
						<div className="column column-8">View History</div>
						<div className="column column-9">Items Received (Own efforts)</div>
					</div>
					{!this.state.items.length ? (
						<div className="no-items">No Items found</div>
					) : (null)}
					{this.state.items.map((item, index) => {
						return (
							<div className="item-row" key={index}>
								<div className="column column-1" title={item.name}>{item.name}</div>
								<div className="column column-2">{item.itemsRequested}</div>
								<div className="column column-3">{item.itemsApproved}</div>
								<div className="column column-4">{item.itemsReceived}</div>
								<div className="column column-5">{item.ordersPlaced}</div>
								<div className="column column-6">{item.ordersDispatched}</div>
								<div className="column column-7">{item.remainingRequirement}</div>
								<div className="column column-8">
									<button className="btn column-btn" onClick={this.viewHistory.bind(this, item._id)}>View</button>
								</div>
								<div className="column column-9">{item.itemsReceivedOwnEffort}</div>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}
