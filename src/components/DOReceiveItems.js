import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';

const readCookie = require('../cookie.js').readCookie;

export default class DORecieveItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			receive: []
		}
	}

	componentDidMount() {
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

	procurerRequest = (districtId) => {
		window.location.pathname = "/procurer-request/" + districtId;
	}

	render() {
		return (
			<div className="page-container manage-do-receive-page">
				<h2 className="text-center">RECEIVE ITEMS</h2>
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
							<div className="column column-5">{received.receivedUnits}</div>
							<div className="column column-6">{received.comment}</div>
							<div className="column column-7">
								{received.status !== 'Received' ? (
									<button className="btn column-btn">Receive Items</button>
								) : ('Received')}
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
