import moment from 'moment';
import Swal from 'sweetalert2';
import { DatePicker } from 'antd';
import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';
import enUS from 'antd/lib/locale-provider/en_US';

const readCookie = require('../cookie.js').readCookie;

moment.locale('en');

export default class ProcurerReceiveItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			editOrderId: null
		}
	}

	componentDidMount() {
		this.getOrders();
	}

	getOrders = () => {
		fetch(apiBaseUrl + '/api/v1/orders', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			this.setState({ orders: data.data, editOrderId: null });
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

	haffkineReceive = (index, orderId) => {
		let orders = this.state.orders;
		orders[index]['dateOfReceipt'] = '';
		orders[index]['receivedUnits'] = '';

		this.setState({ orders, editOrderId: orderId });
	}

	handleOrderChange = (index, type, value) => {
		let orders = this.state.orders;
		if(type === 'receivedUnits') value = parseInt(value.target.value);
		orders[index][type] = value;
		this.setState({ orders });
	}

	submitReceive = (index, orderId) => {
		let orders = this.state.orders,
			orderObj = {
				orderId,
				receivedUnits: orders[index]['receivedUnits']
			}, error = false;

		if(!this.state.orders[index].receivedUnits) error = 'receivedUnits';
		else if(!this.state.orders[index].dateOfReceipt) error = 'dateOfReceipt';

		if (!error) {
			orderObj['dateOfReceipt'] = moment(this.state.orders[index].dateOfReceipt).format('DD/MM/YYYY');
			fetch(process.env.REACT_APP_API_URL + '/api/v1/order/receive', {
				method: 'POST',
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(orderObj)
			}).then(data => data.json())
			.then(data => {
				this.getOrders();
				Swal.fire({ title: 'Request updated successfully.', type: 'success' });
			}).catch(err => {
				console.log(err);
				this.getOrders();
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		} else {
			if (error === 'receivedUnits') Swal.fire('', 'Please enter correct received units', 'error');
			else if (error === 'dateOfReceipt') Swal.fire('', 'Please select a correct date of receipt', 'error');
		}
	}

	render() {
		return (
			<div className="page-container haffkine-receive-items-page">
				<h2 className="text-center">RECEIVE ITEMS</h2>
				<div className="table-container">
					<div className="heading">
						<div className="column column-1">Order ID</div>
	          <div className="column column-2">Item</div>
	          <div className="column column-3">Units Ordered</div>
	          <div className="column column-4">Order Date</div>
	          <div className="column column-5">Expected date of receipt</div>
	          <div className="column column-6">Funder</div>
	          <div className="column column-7">Order Value (INR)</div>
	          <div className="column column-8">Comments about the order/supplier</div>
	          <div className="column column-9">District preference (If any)</div>
	          <div className="column column-10">Receipt status (HAFFKINE)</div>
	          <div className="column column-11">Date of Receipt</div>
	          <div className="column column-12">Units Recieved</div>
	          <div className="column column-13">Action</div>
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
	              <div className="column column-9">{order.district}</div>
	              <div className="column column-10">{order.status}</div>
	              <div className="column column-11">
	              	{this.state.editOrderId === order._id ? (
	              		<DatePicker locale={enUS} size="large" style={{width: "100%"}} format="DD/MM/YYYY" value={order.dateOfReceipt} type="date" disabledDate={d => !d || d.isAfter(new Date)} onChange={this.handleOrderChange.bind(this, index, 'dateOfReceipt')} />
	              	) : order.status === 'Received' ? order.dateOfReceipt : ''}
	              </div>
	              <div className="column column-12">
	              	{this.state.editOrderId === order._id ? (
	              		<input className="form-control" type="number" value={order.receivedUnits} min={0} onChange={this.handleOrderChange.bind(this, index, 'receivedUnits')} placeholder="Enter Received Units" />
	              	) : order.status === 'Received' ? order.receivedUnits : ''}
	              </div>
	              <div className="column column-13">
	              	{order.status === 'Received' ? 'Received & Added' : (
		                this.state.editOrderId === order._id ? (
		                	<button className="btn column-btn" onClick={this.submitReceive.bind(this, index, order._id)}>
			                	Submit
			                </button>
		                ) : (
			                <button className="btn btn-alt column-btn" onClick={this.haffkineReceive.bind(this, index, order._id)} disabled={this.state.editOrderId}>
			                	Mark as Received
			                </button>
		                )
	              	)}
	              </div>
	            </div>
						)
					})}
				</div>
			</div>
		);
	}
}
