import moment from 'moment';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';
import { apiBaseUrl } from './config.jsx';
import enUS from 'antd/lib/locale-provider/en_US';

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class ProcurerAllocationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			materials: [],
			districts: [],
			allocations: [],
			editItemId: null,
			materialId: this.props.match.params.materialId || null,
			materialInventory: null
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

		this.getAllocations(this.props.match.params.materialId);
	}

	getMaterialInventory = (materialId) => {
		fetch(apiBaseUrl + '/api/v1/inventory/' + materialId, {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			if (data.status === 'ok') {
				this.setState({ materialInventory: data.data });
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

	getAllocations = (materialId = '') => {
		let query = '';
		if(materialId) {
			query = '?materialId=' + materialId;
			this.getMaterialInventory(materialId);
		}

		fetch(apiBaseUrl + '/api/v1/allocations' + query, {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			console.log(data)
			this.setState({ allocations: data.data, editItemId: null });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	materialChange = (materialId) => {
		this.setState({ materialId }, () => {
			this.getAllocations(materialId);
		});
	}

	procurerAllocation = (index, allocationId) => {
		let allocations = this.state.allocations;
		allocations[index]['dispatchedDate'] = '';

		this.setState({ allocations, editItemId: allocationId });
	}

	issueMore = () => {
		let allocations = this.state.allocations;
		allocations.unshift({
			_id: '0',
			units: '',
			comment: '',
			districtId: '',
			allocationedDate: moment().format('DD/MM/YYYY')
		});

		this.setState({ allocations, editItemId: '0' });
	}

	handleAllocationChange = (index, type, value) => {
		let allocations = this.state.allocations;
		if(type === 'comment') value = value.target.value;
		else if(type === 'units') value = parseInt(value.target.value);
		allocations[index][type] = value;
		this.setState({ allocations });
	}

	submitAllocation = (index = 0, allocationId) => {
		let allocations = this.state.allocations,
			allocationObj = {
				comment: allocations[index]['comment']
			}, error = false;

		if (parseInt(allocationId) === 0) {
			if(!allocations[index]['districtId']) error = 'districtId';
			else if(!allocations[index]['units']) error = 'units';

			if(!error) {
				allocationObj['materialId'] = this.state.materialId;
				allocationObj['units'] = allocations[index]['units'];
				allocationObj['districtId'] = allocations[index]['districtId'];
			}
		} else {
			if(!allocations[index]['dispatchedDate']) error = 'dispatchedDate';

			if(!error) {
				allocationObj['allocationId'] = allocationId;
				allocationObj['dispatchedDate'] = moment(allocations[index]['dispatchedDate']).format('DD/MM/YYYY');
			}
		}

		if(!error) {
			let url = process.env.REACT_APP_API_URL + '/api/v1/allocation/dispatch';
			if(parseInt(allocationId) === 0) url = process.env.REACT_APP_API_URL + '/api/v1/allocate'

			fetch(url, {
				method: 'POST',
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(allocationObj)
			}).then(data => data.json())
			.then(data => {
				if(data.status === 'ok') {
					this.getAllocations(this.state.materialId);
					let title = 'Allocation updated successfully.';
					if(parseInt(allocationId) === 0) title = 'Allocation added successfully.';
					Swal.fire({ title, type: 'success' });
				} else {
					Swal.fire('', data.message, 'error');
				}
			}).catch(err => {
				console.log(err);
				this.getAllocations(this.state.materialId);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		} else {
			if(error === 'dispatchedDate') Swal.fire('', 'Please select correct dispatched date', 'error');
			else if(error === 'districtId') Swal.fire('', 'Please select correct district', 'error');
			else if(error === 'units') Swal.fire('', 'Please enter correct units', 'error');
		}
	}

	render() {
		return (
			<div className="page-container haffkine-allocation-page">
				<h2 className="text-center">ALLOCATE ITEMS</h2>
				<div className="d-flex align-items-center justify-content-between">
					<div className="filter">
						<label className="control-label">Select Material</label>
						<Select showSearch size="large" value={this.state.materialId} onChange={this.materialChange} style={{ width: 250 }}>
							<Option value={null}>All</Option>
							{this.state.materials.map(function (material, index) {
								return (
									<Option value={material._id} key={index}>{material.name}</Option>
								)
							})}
						</Select>
					</div>
					{this.state.materialInventory ? (
						<div className="d-flex counts">
							<span><b>UNITS RECEIVED: </b>{this.state.materialInventory.unitsReceived}</span> | <span><b>UNITS ISSUED: </b>{this.state.materialInventory.unitsIssued}</span> | <span><b>BALANCE UNITS: </b>{this.state.materialInventory.balanceUnits}</span>
						</div>
					) : (null)}
				</div>
				{this.state.materialId && this.state.materialInventory ? (
					<div className="table-buttons">
						{this.state.editItemId === '0' ? (
							<button className="btn save-button" onClick={this.submitAllocation.bind(this, 0, '0')}>
								<i className="fas fa-check"></i>SUBMIT ALLOCATION
							</button>
						) : (
							parseInt(this.state.materialInventory.balanceUnits) ? (
								<button className="btn btn-alt add-button" disabled={this.state.editItemId} onClick={this.issueMore}>
									<i className="fas fa-plus"></i>ISSUE MORE
								</button>
							) : (null)
						)}
					</div>
				) : (null)}
				<div className="heading">
					<div className="column column-1">Units</div>
          <div className="column column-2">District</div>
          <div className="column column-3">Date of Allocation</div>
          <div className="column column-4">Status</div>
          <div className="column column-5">Dispatch ID</div>
          <div className="column column-6">Dispatch Date</div>
          <div className="column column-7">Comments</div>
          <div className="column column-8">DISPATCH</div>
				</div>
				{!this.state.allocations.length ? (
					<div className="no-items">Allocation Listings not found</div>
				) : (null)}
				{this.state.allocations.map((allocation, index) => {
					return (
						<div className="item-row" key={index}>
							<div className="column column-1">
								{this.state.editItemId === allocation._id && allocation._id === '0' ? (
              		<input className="form-control" type="number" min={0} value={allocation.units} onChange={this.handleAllocationChange.bind(this, index, 'units')} placeholder="Enter Units" />
              	) : allocation.units}
							</div>
              <div className="column column-2">
              	{this.state.editItemId === allocation._id && allocation._id === '0' ? (
	              	<Select showSearch size="large" value={allocation.districtId} onChange={this.handleAllocationChange.bind(this, index, 'districtId')} style={{ width: "100%" }}>
	              		{this.state.districts.map(function (district, index) {
	              			return (
	              				<Option value={district._id} key={index}>{district.name}</Option>
	              			)
	              		})}
	              	</Select>
	              ) : allocation.district}
              </div>
              <div className="column column-3">{allocation.allocationedDate}</div>
              <div className="column column-4">{allocation.status}</div>
              <div className="column column-5">{allocation.status !== 'Issued' ? allocation.dispatchId : ''}</div>
              <div className="column column-6">
              	{this.state.editItemId === allocation._id && allocation._id !== '0' ? (
              		<DatePicker locale={enUS} size="large" style={{width: "100%"}} format="DD/MM/YYYY" value={allocation.dispatchedDate} type="date" onChange={this.handleAllocationChange.bind(this, index, 'dispatchedDate')} />
              	) : allocation.status !== 'Issued' ? allocation.dispatchedDate : ''}
              </div>
              <div className="column column-7">
              	{this.state.editItemId === allocation._id ? (
              		<input className="form-control" type="text" value={allocation.comment} onChange={this.handleAllocationChange.bind(this, index, 'comment')} placeholder="Enter Comments" />
              	) : allocation.status !== 'Issued' ? allocation.comment : ''}
              </div>
							<div className="column column-8">
								{allocation.status === 'Issued' ? (
									this.state.editItemId === allocation._id ? (
										<button className="btn btn-alt column-btn" onClick={this.submitAllocation.bind(this, index, allocation._id)}>
											Submit
										</button>
									) : (
										<button className="btn column-btn" onClick={this.procurerAllocation.bind(this, index, allocation._id)} disabled={this.state.editItemId}>
											Dispatch
										</button>
									)
								) : 'N/A'}
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
