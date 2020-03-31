import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class ManageDistrictsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			districts: []
		}
	}

	componentDidMount() {
		fetch(apiBaseUrl + '/districts', {
			method: 'GET'
		}).then(data => data.json())
			.then(data => {
				this.setState({ districts: data.districts });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	}

	manageDistrict = (districtId) => {
		window.location.pathname = "/manage-district/" + districtId;
	}

	render() {
		return (
			<div className="manage-districts-page">
				<h2 className="text-center">MANAGE DISTRICTS PAGE</h2>
				<div className="heading">
					<div className="column-1">Name of the District</div>
					<div className="column-2">Manage Requirement and Fulfillment</div>
				</div>
				{!this.state.districts.length ? (
					<div className="no-districts">Districts not found</div>
				) : (null)}
				{this.state.districts.map((district, index) => {
					return (
						<div className="district-row" key={index}>
							<div className="column-1">{district.name}</div>
							<div className="column-2">
								<button className="btn manage-district-btn" onClick={this.manageDistrict.bind(this, district._id)}>Manage</button>
							</div>
						</div>
					)
				})}
			</div>
		);
	}
}
