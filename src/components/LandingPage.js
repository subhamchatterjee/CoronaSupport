import moment from 'moment';
import Swal from 'sweetalert2';
import { Select, Button } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

export default class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			districts: [],
			materials: [
			// {
			// 	_id: '5asd67as7d6as7d565d6as',
			// 	cost: 550,
			// 	count: 12347,
			// 	name: 'N95 Mask',
			// 	totalCount: 30560
			// }
			],
			district: ""
		}
	}

	componentDidMount() {
		if(this.props.match.params.state) {
			fetch(process.env.REACT_APP_API_URL + '/districts?state=' + this.props.match.params.state, {
				method: 'GET'
			}).then(data => data.json())
			.then(data => {
				this.setState({districts: data});
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		}

		this.refreshReqs();
	}

	districtChange = (value) => {
		this.setState({ district: value }, () => {
			this.refreshReqs();
		});
	}

	refreshReqs = () => {
		let query = "";
		if(this.state.district) query = "?district=" + this.state.district;
		if(query) query += "&state=" + this.props.match.params.state;
		else query = "?state=" + this.props.match.params.state;

		fetch(process.env.REACT_APP_API_URL + '/materials' + query, {
			method: 'GET'
		}).then(data => data.json())
		.then(data => {
			this.setState({materials: data});
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	express = (req_id) => {
		console.log(req_id);
	}

	render() {
		return (
			<div className="landing-page">
				<div className="banner">
					<div className="banner-container">
						<div className="black-text">COMBATING</div>
						<div className="black-text">COVID,</div>
						<div className="red-text">TOGETHER</div>
						<div className="black-text small">AN INITIATIVE OF</div>
						<div className="logos-container">
							<img src="/images/MSINS.png" width="200" height="80" style={{padding: "15px 5px 0 0"}} />
							<img src="https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp" width="200" height="80" />
						</div>
					</div>
					<div className="banner-heading">LET'S JOIN HAND IN FIGHTING THE PANDEMIC</div>
				</div>
				<div className="container-1">
					<div className="content">
						<div className="left-container">
							<div className="heading">
								<span className="black-text">OUR</span>
								<span className="red-text">ENDEAVOUR</span>
							</div>
							<div>We are currently in the midst of a pandemic. And we are aware that our healthcare capacity is not wellequipped to handle this burden. In collaboration with <span className="red-text"><a className="red-text" href="https://msins.in/" target="_blank">Maharashtra State Innovation Society, a body of the Government of Maharashtra</a>, the various district hospitals and <a className="red-text" href="https://letsendorse.com/" target="_blank">LetsEndorse</a></span> to combat this.</div>
							<div>We are running against time to get the supplies that our public health system needs. And we need support from one and all in enabling our infrastructure and people to combat COVID-19.</div>
						</div>
						<div className="right-container"></div>
					</div>
				</div>
				<div className="container-2">
					<div className="heading">
						<span className="black-text">LET'S ENABLE OUR</span>
						<span className="red-text">FRONTLINE</span>
					</div>
					<div className="filter-container">
						<div className="filter">
							<label className="control-label">District</label>
							<Select size="large" value={this.state.district} onChange={this.districtChange} style={{ width: 150 }}>
								<Option value="">All</Option>
								{this.state.districts.map(function(district, index) {
									return (
										<Option value={district} key={index}>{district}</Option>
									)
								})}
							</Select>
						</div>
						<div className="last-updated-container">
							<span className="black-text">Last Updated:</span>
							<span className="red-text">{moment().format('HH:mm') + ' | ' + moment().format('DD MMMM YYYY')}</span>
						</div>
					</div>
					<div className="requirements-container">
						<div className="heading">
							<div className="column-1">Requirement</div>
							<div className="column-2">Unit Cost (INR)</div>
							<div className="column-3">Status</div>
							<div className="column-4">Pledge Contribution</div>
						</div>
						{!this.state.materials.length ? (
							<div className="no-materials">
								<span className="title">No requirements available currently!</span>
								<span className="sub-title">Please wait until requirements are added.</span>
							</div>
						) : (null)}
						{this.state.materials.map((material, index) => {
							return (
								<div className="req-row" key={index}>
									<div className="column-1">{material.name}</div>
									<div className="column-2">{material.cost}</div>
									<div className="column-3">
										<div className="box">
											<div className="box-filled" style={{width: parseInt(material.count / material.totalCount * 100) + "%"}}><span>{material.count}</span></div>
											<span className="box-total">{material.totalCount}</span>
										</div>
									</div>
									<div className="column-4">
										<button className="btn interest-btn" onClick={this.express.bind(this, material._id)}>Express Interest</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className="container-3">
					<div className="heading-container">
						<a className="link" href="https://bit.ly/CovidMahSupply" target="_blank">CLICK HERE TO VIEW THE LIST AND INVENTORY OF VETTED MATERIAL SUPPLIERS.</a>
						<div className="text">(We would nonetheless encourage you to do your due-diligence on the suppliers.)</div>
					</div>
					<div className="heading">
						<span className="black-text">HOW DOES THIS</span>
						<span className="red-text">PLATFORM WORK?</span>
					</div>
					<div className="text-container">
						<div>Built in collaboration with <a className="red-text" href="https://msins.in/" target="_blank">Maharashtra State Innovation Society</a> (a body of the Government of Maharashtra) and <a className="red-text" href="https://letsendorse.com/" target="_blank">LetsEndorse</a>, this platform serves to provide real-time information about the gaps in and needs of the public health system of Maharashtra.</div>
						<div>Our collective goal is to garner the precise needs from the ground (Government Hospitals serving COVID-19 patients) from across different districts of Maharashtra and offer a single and transparent channel to individuals and institutions <b>(through grants and CSR funds- <a className="red-text" href="https://www.mca.gov.in/Ministry/pdf/Covid_23032020.pdf" target="_blank">Read regulation here</a>)</b> to make direct contribution and impact in fighting the current pandemic.</div>
						<div>Once you gauge the gaps, you can click on "<span className="red-text">EXPRESS INTEREST</span>" button, mention the scale of your contribution, recommend any supplier, and our task-force team shall get in touch with you to channelize your support in the most appropriate manner.</div>
						<div>To check how your contribution has reached the last mile, you can click on the hyperlinked name of the item and you would see the entire list of contributions in realtime.</div>
						<div>To know further, get in touch with us at <a href="mailto:support@letsendorse.com" target="_blank" className="red-text">support@letsendorse.com</a>.</div>
					</div>
				</div>
				<div className="footer-container">
					<div>PLATFORM AND UPDATES POWERED BY</div>
					<img src="https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp" width="200" height="70" />
				</div>
			</div>
		);
	}
}