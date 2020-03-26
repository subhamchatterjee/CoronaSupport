import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Select } from 'antd';

const { Option } = Select;

export default class ManageSingleMaterialPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			districts: [],
			material: null,
			editRequirement: null,
			selectedRequirement: null,
			showFulfilmentModal: false
		}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + '/districts', {
			method: 'GET'
		}).then(data => data.json())
		.then(data => {
			this.setState({districts: data.districts});
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});

		fetch(process.env.REACT_APP_API_URL + '/material/' + this.props.match.params.materialId, {
			method: 'GET'
		}).then(data => data.json())
		.then(data => {
			this.setState({material: data});
		}).catch(err => {
			console.log(err);
			this.setState({
				material: {
					_id: '5asd5asd67sds6asd65as',
					name: 'N95',
					requirements: [{
						_id: '5asd65as65sd65sad65sa',
						district: 'Gadchiroli',
						reqUnits: 30454,
						fulfilledUnits: 123
					}, {
						_id: '5as5das5da5dwq556dffd',
						district: 'Chandrapur',
						reqUnits: 4500,
						fulfilledUnits: 0
					}, {
						_id: '5fdg87dfg87df87gw7dse',
						district: 'Nanded',
						reqUnits: 2342,
						fulfilledUnits: 32
					}, {
						_id: '5asbvqw65asd87sdf87ds',
						district: 'Nashik',
						reqUnits: 23331,
						fulfilledUnits: 332
					}]
				}
			});
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	addFulfilment = (req) => {
		this.setState({ selectedRequirement: req, showFulfilmentModal: true });
	}

	addDistrict = () => {
		let valid = true, material = this.state.material;
		if(material.requirements.length) {
			if(!material.requirements[material.requirements.length - 1].district || !material.requirements[material.requirements.length - 1].reqUnits) valid = false;
		}

		if(valid) {
			material.requirements.push({
				_id: '0',
				district: '',
				reqUnits: '',
				fulfilledUnits: ''
			});

			this.setState({ material, editRequirement: '0' });
		}
	}

	editRequirement = (req_id) => {
		this.setState({ editRequirement: req_id });
	}

	handleReqChange = (index, type, value) => {
		let material = this.state.material;
		if(value.target) value = parseInt(value.target.value);
		material.requirements[index][type] = value;
		this.setState({ material });
	}

	saveRequirement = (req) => {
		let requirement = {
			district: req.district,
			reqUnits: req.reqUnits
		}, error = false, material = this.state.material;

		if(material.requirements.length > 1) {
			for(let i = 0; i < material.requirements.length; i++) {
				if(req._id !== material.requirements[i]._id && req.district === material.requirements[i].district) error = 'district';
			}

			if(!req.district) error = 'district';
			else if(!req.reqUnits) error = 'reqUnits';
		}

		if(!error) {
			fetch(process.env.REACT_APP_API_URL + '/update-requirement/' + req._id, {
				method: 'PUT',
				// headers: {
				// 	'Auth': JSON.parse(readCookie('access_token')),
				// 	'Content-Type': 'application/JSON'
				// },
				body: JSON.stringify(requirement)
			}).then(data => data.json())
			.then(data => {
				Swal.fire({
					title: 'Requirement successfully updated.',
					type: 'success'
				});
			}).catch(err => {
				console.log(err);
				this.setState({ editRequirement: null });
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		} else {
			if(error === 'district') Swal.fire('', 'Please select a correct District', 'error');
			else if(error === 'reqUnits') Swal.fire('', 'Please enter correct required units', 'error');
		}
	}

	render() {
		if(this.state.material !== null) {
			return (
				<div className="manage-single-material-page">
					<h2 className="text-center">{this.state.material.name}</h2>
					<div className="heading">
						<div className="column-1">District</div>
						<div className="column-2">Required Units</div>
						<div className="column-3">Fulfilled Units</div>
						<div className="column-4">Add Fulfilment</div>
						<div className="column-5">SAVE</div>
					</div>
					{!this.state.material.requirements.length ? (
						<div className="no-materials">Requirements not found</div>
					) : (null)}
					{this.state.material.requirements.map((req, index) => {
						return (
							<div className="material-row" key={index}>
								{this.state.editRequirement === req._id ? (
									<div className="column-1">
										<Select size="large" value={req.district} onChange={this.handleReqChange.bind(this, index, 'district')} style={{ width: "100%" }}>
											{this.state.districts.map(function(district, index) {
												return (
													<Option value={district} key={index}>{district}</Option>
												)
											})}
										</Select>
									</div>
								) : (
									<div className="column-1">{req.district}</div>
								)}
								{this.state.editRequirement === req._id ? (
									<div className="column-2">
										<input className="form-control" type="number" value={req.reqUnits} onChange={this.handleReqChange.bind(this, index, 'reqUnits')} />
									</div>
								) : (
									<div className="column-2">{req.reqUnits}</div>
								)}
								<div className="column-3">{req.fulfilledUnits}</div>
								<div className="column-4">
									<button className="btn add-fulfilment-btn" disabled={this.state.editRequirement} onClick={this.addFulfilment.bind(this, req)}>Add</button>
								</div>
								<div className="column-5">
									{this.state.editRequirement === req._id ? (
										<button className="btn save-requirement-btn" onClick={this.saveRequirement.bind(this, req)}>Save</button>
									) : (
										<button className="btn edit-requirement-btn" disabled={this.state.editRequirement} onClick={this.editRequirement.bind(this, req._id)}>Edit</button>
									)}
								</div>
							</div>
						)
					})}
					<div className="add-district-container">
						<button className="btn add-district-btn" onClick={this.addDistrict} disabled={this.state.editRequirement}>
							<i className="fa fa-plus"></i>
							Add District
						</button>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}
