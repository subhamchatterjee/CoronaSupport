import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { apiBaseUrl } from './config.jsx'

const readCookie = require('../cookie.js').readCookie;

export default class AddMaterialPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			desc: "",
			min_price: "",
			max_price: ""
		}
	}

	componentDidMount() {
		if (this.props.match.params.materialId) {
			fetch(process.env.REACT_APP_API_URL + '/material/' + this.props.match.params.materialId, {
				method: 'GET'
			}).then(data => data.json())
				.then(data => {
					let material = {
						name: data.material.name,
						desc: data.material.desc,
						min_price: data.material.min_price,
						max_price: data.material.max_price
					};
					this.setState(material);
				}).catch(err => {
					console.log(err);
					// Swal.fire(
					//   'Oops!',
					//   'An error occured! Please try again in sometime.',
					//   'error'
					// );
				});
		}
	}

	changeHandler = (type, e) => {
		this.setState({ [type]: e.target.value });
	}

	submit = () => {
		let url = apiBaseUrl + '/add-materials', method = 'POST',
			material = {
				name: this.state.name,
				desc: this.state.desc,
				min_price: this.state.min_price,
				max_price: this.state.max_price
			};

		if (this.props.match.params.materialId) {
			url = apiBaseUrl + '/edit-material/' + this.props.match.params.materialId;
			method = 'PUT';
		}
		fetch(url, {
			method,
			headers: {
				'Auth': readCookie('access_token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(material)
		}).then(data => data.json())
			.then(data => {
				let title = 'Material successfully added.';
				if (this.props.match.params.materialId) title = 'Material updated successfully.';
				Swal.fire({
					title,
					type: 'success'
				});
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
			<div className="add-material-page">
				<h2 className="text-center">{this.props.match.params.materialId ? "EDIT MATERIAL PAGE" : "ADD MATERIAL PAGE"}</h2>
				<div className="d-flex question">
					<label className="control-label">Name of the material</label>
					<input className="form-control" type="text" value={this.state.name} onChange={this.changeHandler.bind(this, 'name')} />
				</div>
				<div className="d-flex question">
					<label className="control-label">Description of the material</label>
					<textarea className="form-control" value={this.state.desc} onChange={this.changeHandler.bind(this, 'desc')}></textarea>
				</div>
				<div className="d-flex question">
					<label className="control-label">Unit Price in INR</label>
					<div className="d-flex input-groups">
						<input className="form-control" type="number" placeholder="Minimum" value={this.state.min_price} onChange={this.changeHandler.bind(this, 'min_price')} />
						<input className="form-control" type="number" placeholder="Maximum" value={this.state.max_price} onChange={this.changeHandler.bind(this, 'max_price')} />
					</div>
				</div>
				<div className="text-center">
					<button className="btn submit-btn" onClick={this.submit}>SUBMIT THE MATERIAL</button>
				</div>
			</div>
		);
	}
}
