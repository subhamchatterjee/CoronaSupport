import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx';

const readCookie = require('../cookie.js').readCookie;

export default class ProcurerViewInventory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inventories: []
		}
	}

	componentDidMount() {
		fetch(apiBaseUrl + '/api/v1/inventory', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			this.setState({ inventories: data.data });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	gotoAllocate = (materialId) => {
		window.location.pathname = '/allocate-items/' + materialId;
	}

	render() {
		return (
			<div className="manage-districts-page">
				<h2 className="text-center">VIEW INVENTORY</h2>
				<div className="heading">
					<div className="column-2">Item</div>
					<div className="column-2">Units Received</div>
					<div className="column-2">Units Issued</div>
					<div className="column-2">Balance Units</div>
					<div className="column-2">ISSUE UNITS</div>
				</div>
				{!this.state.inventories.length ? (
					<div className="no-districts">Inventories not found</div>
				) : (null)}
				{this.state.inventories.map((inventory, index) => {
					return (
						<div className="district-row" key={index}>
							<div className="column-2">{inventory.name}</div>
							<div className="column-2">{inventory.unitsReceived}</div>
							<div className="column-2">{inventory.unitsIssued}</div>
							<div className="column-2">{inventory.balanceUnits}</div>
							<div className="column-2">
								{parseInt(inventory.balanceUnits) === 0 ? ('N/A') : (
									<button className="btn manage-district-btn" onClick={this.gotoAllocate.bind(this, inventory._id)}>Allocate</button>
								)}
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
