import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class AddMaterialPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			desc: "",
			minCost: "",
			maxCost: ""
		}
	}

	componentDidMount() {
		if(this.props.match.params.materialId) {
			fetch(process.env.REACT_APP_API_URL + '/get-material/' + this.props.match.params.materialId, {
				method: 'GET'
			}).then(data => data.json())
			.then(data => {
				let material = {
					name: data.name,
					desc: data.desc,
					minCost: data.minCost,
					maxCost: data.maxCost
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
		let url = process.env.REACT_APP_API_URL + '/add-materials', method = 'POST',
			material = {
				name: this.state.name,
				desc: this.state.desc,
				minCost: this.state.minCost,
				maxCost: this.state.maxCost
			};

		if(this.props.match.params.materialId) {
			url = process.env.REACT_APP_API_URL + '/edit-material/' + this.props.match.params.materialId;
			method = 'PUT';
		}
		fetch(url, {
			method,
			// headers: {
			// 	'Auth': JSON.parse(readCookie('access_token')),
			// 	'Content-Type': 'application/JSON'
			// },
			body: JSON.stringify(material)
		}).then(data => data.json())
		.then(data => {
			let title = 'Material successfully added.';
			if(this.props.match.params.materialId) title = 'Material updated successfully.';
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
						<input className="form-control" type="number" placeholder="Minimum" value={this.state.minCost} onChange={this.changeHandler.bind(this, 'minCost')} />
						<input className="form-control" type="number" placeholder="Maximum" value={this.state.maxCost} onChange={this.changeHandler.bind(this, 'maxCost')} />
					</div>
				</div>
				<div className="text-center">
					<button className="btn submit-btn" onClick={this.submit}>SUBMIT THE MATERIAL</button>
				</div>
			</div>
		);
	}
}
