import moment from 'moment';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { authHeader } from '../helper/auth-header';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class DORequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requests: [],
			materials: [],
			newRequestId: null
		}
	}

	componentDidMount() {
		this.getRequests();

		fetch(apiBaseUrl + '/materials', {
			method: 'GET'
		}).then(data => data.json())
			.then(data => {
				if (data.status === 'ok') this.setState({ materials: data.material });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	}

	getRequests = () => {
		fetch(apiBaseUrl + '/api/v1/requirements', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
			.then(data => {
				if (data.status === 'ok') this.setState({ requests: data.data, newRequestId: null });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	}

	addRequest = () => {
		let requests = this.state.requests;
		requests.unshift({
			_id: '0',
			materialId: '',
			required_qnty: '',
			districtId: this.props.userData.districts[0]._id
		});

		this.setState({ requests, newRequestId: '0' });
	}

	handleNewReqChange = (index, type, value) => {
		let requests = this.state.requests;
		if (type === 'required_qnty') value = parseInt(value.target.value);
		requests[index][type] = value;
		this.setState({ requests });
	}

	saveRequest = () => {
		let request = {
			materialId: this.state.requests[0].materialId,
			required_qnty: this.state.requests[0].required_qnty,
			districtId: this.state.requests[0].districtId
		}, error = false;

		if (!this.state.requests[0].materialId) error = 'material';
		else if (!this.state.requests[0].required_qnty) error = 'required_qnty';

		if (!error) {
			fetch(apiBaseUrl + '/api/v1/requirement', {
				method: 'POST',
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			}).then(data => data.json())
				.then(data => {
					this.setState({ newRequestId: null });
					this.getRequests();
					Swal.fire({ title: 'Request successfully added.', type: 'success' });
				}).catch(err => {
					console.log(err);
					this.setState({ newRequestId: null });
					// Swal.fire(
					//   'Oops!',
					//   'An error occured! Please try again in sometime.',
					//   'error'
					// );
				});
		} else {
			if (error === 'material') Swal.fire('', 'Please select a correct Material', 'error');
			else if (error === 'required_qnty') Swal.fire('', 'Please enter correct requested units', 'error');
		}
	}

	render() {
		return (
			<div className="page-container manage-do-req-page">
				<h2 className="text-center">REQUEST ITEM </h2>
				<div className="table-buttons">
					{this.state.newRequestId ? (
						<button className="btn save-button" onClick={this.saveRequest}>
							<i className="fas fa-check"></i>Save Request
						</button>
					) : (
							<button className="btn btn-alt add-button" onClick={this.addRequest}>
								<i className="fas fa-plus"></i>Add Request
							</button>
						)}
				</div>
				<div className="heading">
					<div className="column column-1">Item</div>
					<div className="column column-2">Requested Units</div>
					<div className="column column-3">Request Date</div>
					<div className="column column-4">Request Status</div>
					<div className="column column-5">Approved Units</div>
					<div className="column column-6">Approval Date</div>
				</div>
				{!this.state.requests.length ? (
					<div className="no-items">Requested Items not found</div>
				) : (null)}

				{this.state.requests.map((request, index) => {
					return (
						<div className="item-row" key={index}>
							<div className="column column-1">
								{this.state.newRequestId === request._id ? (
									<Select showSearch size="large" value={request.materialId} onChange={this.handleNewReqChange.bind(this, index, 'materialId')} style={{ width: "100%" }} placeholder="Select Material">
										{this.state.materials.map(function (material, index) {
											return (
												<Option value={material._id} key={index}>{material.name}</Option>
											)
										})}
									</Select>
								) : request.material}
							</div>
							<div className="column column-2">
								{this.state.newRequestId === request._id ? (
									<input className="form-control" type="number" value={request.required_qnty} onChange={this.handleNewReqChange.bind(this, index, 'required_qnty')} placeholder="Enter Requested Units" />
								) : request.required_qnty}
							</div>
							<div className="column column-3">{moment(request.timestamp).format('DD/MM/YYYY')}</div>
							<div className="column column-4">{request.status}</div>
							<div className="column column-5">{request.status === 'Approved' ? request.approved_qnty : ''}</div>
							<div className="column column-6">{request.status === 'Approved' ? moment(request.approvedAt).format('DD/MM/YYYY') : ''}</div>
						</div>
					)
				})}

			</div>
		);
	}
}
