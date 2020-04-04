import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';

const readCookie = require('../cookie.js').readCookie;

export default class DORecieveItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			receive: [],
			editItemId: null
		}
	}

	componentDidMount() {
		this.getReceivedItems();
	}

	getReceivedItems = () => {
		fetch(apiBaseUrl + '/api/v1/requestor/received-items', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			if(data.status === 'ok') this.setState({ receive: data.data });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	handleReceiveChange = (index, type, value) => {
		let receive = this.state.receive;
		if(type === 'receivedUnits') value = parseInt(value.target.value);
		receive[index][type] = value;
		this.setState({ receive });
	}

	receiveItem = (index, received_id) => {
		let receive = this.state.receive;
		receive[index]['receivedUnits'] = '';

		this.setState({ receive, editItemId: received_id });
	}

	saveItem = (index, received_id) => {
		let receive = this.state.receive,
			receiveObj = {
				id: received_id,
				receivedUnits: receive[index]['receivedUnits']
			}, error = false;

		if(!receiveObj.receivedUnits) error = 'receivedUnits';

		if (!error) {
			fetch(process.env.REACT_APP_API_URL + '/api/v1/requestor/receive-item', {
				method: 'POST',
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(receiveObj)
			}).then(data => data.json())
			.then(data => {
				this.setState({ editItemId: null });
				this.getReceivedItems();
				Swal.fire({ title: 'Received item updated successfully.', type: 'success' });
			}).catch(err => {
				console.log(err);
				this.setState({ editItemId: null });
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		} else {
			if (error === 'receivedUnits') Swal.fire('', 'Please enter correct units received', 'error');
		}
	}

	render() {
		return (
			<div className="page-container manage-do-receive-page">
				<h2 className="text-center">RECEIVE ITEMS</h2>
				<div className="table-buttons">
					<button className="btn btn-alt add-button" disabled={this.state.editItemId}>
						<i className="fas fa-plus"></i>ADD ITEM RECEIPT (SELF-EFFORT)
					</button>
				</div>
				<div className="heading">
					<div className="column column-1">Dispatch Number</div>
					<div className="column column-2">Dispatch Date</div>
					<div className="column column-3">Item</div>
					<div className="column column-4">Units Dispatched</div>
					<div className="column column-5">Units Received</div>
					<div className="column column-6">Comments</div>
					<div className="column column-7">Received and Added to stock</div>
				</div>
				{!this.state.receive.length ? (
					<div className="no-items">Received Items not found</div>
				) : (null)}
				{this.state.receive.map((received, index) => {
					return (
						<div className="item-row" key={index}>
							<div className="column column-1">{received.dispatchId}</div>
							<div className="column column-2">{received.dispatchedDate}</div>
							<div className="column column-3">{received.material}</div>
							<div className="column column-4">{received.units}</div>
							<div className="column column-5">
								{this.state.editItemId === received._id ? (
									<input className="form-control" type="number" value={received.receivedUnits} onChange={this.handleReceiveChange.bind(this, index, 'receivedUnits')} placeholder="Enter Units Received" />
								) : received.receivedUnits}
							</div>
							<div className="column column-6">{received.comment}</div>
							<div className="column column-7">
								{received.status !== 'Received' ? (
									this.state.editItemId === received._id ? (
										<button className="btn column-btn" onClick={this.saveItem.bind(this, index, received._id)}>Save Item</button>
									) : (
										<button className="btn column-btn" disabled={this.state.editItemId} onClick={this.receiveItem.bind(this, index, received._id)}>Receive Items</button>
									)
								) : ('Received')}
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
