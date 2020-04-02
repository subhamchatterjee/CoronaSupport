import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';

const readCookie = require('../cookie.js').readCookie;

export default class ProcurerReceiveItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: []
		}
	}

	componentDidMount() {
		fetch(apiBaseUrl + '/api/v1/orders', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			this.setState({ orders: data.data });
			console.log(this.state.data.orders)
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
			<div className="manage-districts-page">
				<h2 className="text-center">MANAGE ORDERS PAGE</h2>
				<div className="heading">
					<div className="column-2">Order ID</div>
					<div className="column-2">District</div>
					<div className="column-2">Material Name</div>
					<div className="column-2">Ordered Units</div>
					<div className="column-2">Ordered Date</div>
					<div className="column-2">Received Units</div>
					<div className="column-2">Amount</div>
					<div className="column-2">Status</div>
					<div className="column-2">Action</div>
				</div>
				{!this.state.orders.length ? (
					<div className="no-districts">Order Listings not found</div>
				) : (null)}
				{this.state.orders.map((order, index) => {
					return (
						<div className="district-row" key={index}>
							<div className="column-2">{order.orderId}</div>
							<div className="column-2">{order.district}</div>
							<div className="column-2">{order.material}</div>
							<div className="column-2">{order.orderedUnits}</div>
							<div className="column-2">{order.orderedDate}</div>
							<div className="column-2">{order.receivedUnits}</div>
							<div className="column-2">{order.amount}</div>
							<div className="column-2">{order.status}</div>
							<div className="column-2">
								<button className="btn manage-district-btn">Manage</button>
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
