import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Select } from 'antd';

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class DashboardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			districts: [],
		}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/districts', {
			method: 'GET'
		}).then(data => data.json())
		.then(data => {
			if(data.status === 'ok') {
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

	viewHistory = (item_id) => {

	}

	render() {
		return (
			<div className="dashboard-page">
				<h3 className="text-center">Dashboard</h3>
				<div className="table-container">
					<div className="filter">
						<label className="control-label">District</label>
						<Select showSearch size="large" value={this.state.district} onChange={this.districtChange} style={{ width: 150 }}>
							<Option value="">All</Option>
							{this.state.districts.map(function(district, index) {
								return (
									<Option value={district.name} key={index}>{district.name}</Option>
								)
							})}
						</Select>
					</div>
					<div className="heading">
						<div className="column-1">Item</div>
						<div className="column-2">Items Requested</div>
						<div className="column-3">Items Approved</div>
						<div className="column-4">Items Received (State-Efforts)</div>
						<div className="column-5">Orders Placed (Not yet received)</div>
						<div className="column-6">Orders Dispatched</div>
						<div className="column-7">Remaining requirement</div>
						<div className="column-8">View History</div>
						<div className="column-9">Items Received (Own efforts)</div>
					</div>
					{this.state.items.map((item, index) => {
						return (
							<div className="item-row" key={index}>
								<div className="column-1" title={item.name}>{item.name}</div>
								<div className="column-2">{item.requested}</div>
								<div className="column-3">{item.approved}</div>
								<div className="column-4">{item.received}</div>
								<div className="column-5">{item.ordersPlaced}</div>
								<div className="column-6">{item.ordersDispatched}</div>
								<div className="column-7">{item.remainingReq}</div>
								<div className="column-8">
									<button className="btn view-contribution-btn" onClick={this.viewHistory.bind(this, item._id)}>View</button>
								</div>
								<div className="column-9">{item.receivedOwn}</div>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}
