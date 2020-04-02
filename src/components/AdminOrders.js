import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';

const readCookie = require('../cookie.js').readCookie;

export default class AdminOrders extends Component {
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
			if(data.status === 'ok') this.setState({ orders: data.data });
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
			<div className="page-container admin-placed-orders-page">
				<h2 className="text-center">DECLARE PLACED ORDERS</h2>
				<div className="heading">
					<div className="column column-1">Order ID</div>
					<div className="column column-2">Item</div>
					<div className="column column-3">Units Ordered</div>
					<div className="column column-4">Order Date</div>
					<div className="column column-5">Expected date of Receipt</div>
					<div className="column column-6">Funder</div>
					<div className="column column-7">Order Value (INR)</div>
					<div className="column column-8">Comments about the order/supplier</div>
					<div className="column column-9">District preference (If any)</div>
					<div className="column column-10">Receipt status (HAFFKINE)</div>
					<div className="column column-11">Date of Receipt</div>
					<div className="column column-12">Units Recieved</div>
				</div>
				{!this.state.orders.length ? (
					<div className="no-items">Order Listings not found</div>
				) : (null)}
				{this.state.orders.map((order, index) => {
					return (
						<div className="item-row" key={index}>
							<div className="column column-1">{order.orderId}</div>
							<div className="column column-2">{order.material}</div>
							<div className="column column-3">{order.orderedUnits}</div>
							<div className="column column-4">{order.orderedDate}</div>
							<div className="column column-5">{order.expectedDateOfReceipt}</div>
							<div className="column column-6">{order.funder}</div>
							<div className="column column-7">{order.amount}</div>
							<div className="column column-8">{order.comment}</div>
							<div className="column column-9">{order.district ? order.district : 'Any'}</div>
							<div className="column column-10">{order.status}</div>
							<div className="column column-11">{order.dateOfReceipt}</div>
							<div className="column column-12">{order.receivedUnits}</div>
						</div>
					)
				})}
			</div>
		);
	}
}
