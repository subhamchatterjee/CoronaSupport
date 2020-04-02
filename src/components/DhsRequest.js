import moment from 'moment';
import { Select } from 'antd';
import React, {Component} from 'react';
import {apiBaseUrl} from './config.jsx';

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class DhsRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requests: [],
			district: "",
			districts: []
		}
	}

	componentDidMount() {
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

		this.getRequests();
	}

	getRequests = () => {
		let query = "";
		if(this.state.district) query += "?district=" + this.state.district;

		fetch(apiBaseUrl + '/api/v1/requirements' + query, {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			this.setState({ requests: data.data });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	editMaterial = (materialId) => {
		window.location.pathname = "/edit-material/" + materialId;
	}

	manageMaterial = (materialId) => {
		window.location.pathname = "/manage-material/" + materialId;
	}

	districtChange = (district) => {
		this.setState({ district }, () => { this.getRequests() });
	}

	render() {
		return (
			<div className="page-container manage-dhs-requests-page">
				<h2 className="text-center">MANAGE REQUESTS</h2>
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
					<div className="column column-2">Requested Units</div>
					<div className="column column-3">Request Date</div>
					<div className="column column-4">Request Status</div>
					<div className="column column-5">Approved Units</div>
					<div className="column column-6">Approval Date</div>
					<div className="column column-7">District</div>
					<div className="column column-8">APPROVE</div>
				</div>
				{!this.state.requests.length ? (
					<div className="no-items">Requested Items not found</div>
				) : (null)}
				{this.state.requests.map((request, index) => {
					return (
						<div className="item-row" key={index}>
							<div className="column column-1">{request.material}</div>
							<div className="column column-2">{request.required_qnty}</div>
							<div className="column column-3">{moment(request.timestamp).format('DD/MM/YYYY')}</div>
							<div className="column column-4">{request.status}</div>
							<div className="column column-5">{request.status === 'Approved' ? request.approved_qnty : ''}</div>
							<div className="column column-6">{request.status === 'Approved' ? moment(request.approvedAt).format('DD/MM/YYYY') : ''}</div>
							<div className="column column-7">{request.district}</div>
							<div className="column column-8">
								{request.status === 'Pending Approval' ? (
									<button className="btn column-btn">Approve</button>
								) : (null)}
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
