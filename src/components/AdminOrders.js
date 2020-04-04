import moment from 'moment';
import Swal from 'sweetalert2';
import {DatePicker, Select} from 'antd';
import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';
import enUS from 'antd/lib/locale-provider/en_US';

const {Option} = Select;
const readCookie = require('../cookie.js').readCookie;

moment.locale('en');

export default class AdminOrders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			materials: [],
			districts: [],
			newOrderId: null
		}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/materials', {
			method: 'GET'
		}).then(data => data.json())
		.then(data => {
			if(data.status === 'ok') this.setState({ materials: data.material });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});

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
			if(data.status === 'ok') this.setState({ orders: data.data, newOrderId: null });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	placeNewOrder = () => {
		let orders = this.state.orders;
		orders.unshift({
			_id: '0',
			amount: '',
			funder: '',
			status: '',
			orderId: '',
			comment: '',
			materialId: '',
			districtId: '',
			orderedUnits: '',
			dateOfReceipt: '',
			receivedUnits: '',
			expectedDateOfReceipt: '',
			orderedDate: moment().format('DD/MM/YYYY')
		});

		this.setState({ orders, newOrderId: '0' });
	}

	handleNewOrderChange = (index, type, value) => {
		let orders = this.state.orders;
		if(type === 'amount' || type === 'orderedUnits') value = parseInt(value.target.value);
		else if(type === 'funder' || type === 'comment') value = value.target.value;
		orders[index][type] = value;
		this.setState({ orders });
	}

	submitNewOrder = () => {
		let order = {
			amount: this.state.orders[0].amount,
			funder: this.state.orders[0].funder,
			comment: this.state.orders[0].comment,
			materialId: this.state.orders[0].materialId,
			districtId: this.state.orders[0].districtId,
			orderedUnits: this.state.orders[0].orderedUnits
		}, error = false;

		if(!this.state.orders[0].amount) error = 'amount';
		else if(!this.state.orders[0].funder) error = 'funder';
		else if(!this.state.orders[0].materialId) error = 'material';
		else if(!this.state.orders[0].orderedUnits) error = 'orderedUnits';
		else if(!this.state.orders[0].expectedDateOfReceipt) error = 'expectedDateOfReceipt';

		if (!error) {
			order['expectedDateOfReceipt'] = moment(this.state.orders[0].expectedDateOfReceipt).format('DD/MM/YYYY');
			fetch(process.env.REACT_APP_API_URL + '/api/v1/order', {
				method: 'POST',
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(order)
			}).then(data => data.json())
			.then(data => {
				if(data.status === 'ok') {
					this.getOrders();
					Swal.fire({ title: 'Order successfully added.', type: 'success' });
				} else {
					Swal.fire('', data.message, 'error');
				}
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
			if (error === 'amount') Swal.fire('', 'Please enter correct amount', 'error');
			else if (error === 'funder') Swal.fire('', 'Please enter correct funder', 'error');
			else if (error === 'material') Swal.fire('', 'Please select a correct Material', 'error');
			else if (error === 'orderedUnits') Swal.fire('', 'Please enter correct ordered units', 'error');
			else if (error === 'expectedDateOfReceipt') Swal.fire('', 'Please select a correct expected date of receipt', 'error');
		}
	}

	render() {
		return (
			<div className="page-container admin-placed-orders-page">
				<h2 className="text-center">DECLARE PLACED ORDERS</h2>
				<div className="table-buttons">
					{this.state.newOrderId ? (
						<button className="btn save-button" onClick={this.submitNewOrder}>
							<i className="fas fa-check"></i>SUBMIT NEW ORDER
						</button>
					) : (
						<button className="btn btn-alt add-button" onClick={this.placeNewOrder}>
							<i className="fas fa-plus"></i>PLACE NEW ORDER
						</button>
					)}
				</div>
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
							<div className="column column-2">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<Select showSearch size="large" value={order.materialId} onChange={this.handleNewOrderChange.bind(this, index, 'materialId')} style={{ width: "100%" }} placeholder="Select Material">
										{this.state.materials.map(function (material, index) {
											return (
												<Option value={material._id} key={index} title={material.name}>{material.name}</Option>
											)
										})}
									</Select>
								) : order.material}
							</div>
							<div className="column column-3">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<input className="form-control" type="number" value={order.orderedUnits} min={0} onChange={this.handleNewOrderChange.bind(this, index, 'orderedUnits')} placeholder="Enter Ordered Units" />
								) : order.orderedUnits}
							</div>
							<div className="column column-4">{order.orderedDate}</div>
							<div className="column column-5">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<DatePicker locale={enUS} size="large" style={{width: "100%"}} format="DD/MM/YYYY" value={order.expectedDateOfReceipt} type="date" onChange={this.handleNewOrderChange.bind(this, index, 'expectedDateOfReceipt')} />
								) : order.expectedDateOfReceipt}
							</div>
							<div className="column column-6">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<input className="form-control" type="text" value={order.funder} onChange={this.handleNewOrderChange.bind(this, index, 'funder')} placeholder="Enter Funder" />
								) : order.funder}
							</div>
							<div className="column column-7">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<input className="form-control" type="number" value={order.amount} min={0} onChange={this.handleNewOrderChange.bind(this, index, 'amount')} placeholder="Enter Amount" />
								) : order.amount}
							</div>
							<div className="column column-8">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<input className="form-control" type="text" value={order.comment} onChange={this.handleNewOrderChange.bind(this, index, 'comment')} placeholder="Enter Comment" />
								) : order.comment}
							</div>
							<div className="column column-9">
								{this.state.newOrderId === order._id && this.state.newOrderId === '0' ? (
									<Select size="large" value={this.state.districtId} onChange={this.handleNewOrderChange.bind(this, index, 'districtId')} style={{ width: "100%" }}>
										{this.state.districts.map(function (district, index) {
											return (
												<Option value={district._id} key={index} title={district.name}>{district.name}</Option>
											)
										})}
									</Select>
								) : (
									order.district ? order.district : 'Any'
								)}
							</div>
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
