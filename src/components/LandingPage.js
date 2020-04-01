import moment from 'moment';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { Row, Col, Modal, Table } from 'react-bootstrap';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, WhatsappIcon } from 'react-share';
// import { process.env.REACT_APP_API_URL } from './config.jsx'
const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			districts: [],
			materials: [],
			requirements: [],
			newContribution: {
				districts: [],
				materials: [],
				amount: '',
				contribute_as: '',
				contributer_info: {
					name: '',
					phone: '',
					email: ''
				},
				message: '',
				preffered_supplier: ''
			},
			errorObj: {},
			district: "",
			contributions: [],
			menuVisible: false,
			showSharingModal: false,
			showInterestModal: false,
			showContributionModal: false,
			selectedContributionMaterial: null
		}
	}

	componentDidMount() {
		if (this.props.match.params.state) {
			console.log(this.props.match.params.state)
			fetch(process.env.REACT_APP_API_URL + '/districts?state=' + this.props.match.params.state, {
				method: 'GET'
			}).then(data => data.json())
				.then(data => {
					if (data.status === 'ok') {
						if (!data.districts.length) window.location.pathname = "/";
						else this.setState({ districts: data.districts });
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

		fetch(process.env.REACT_APP_API_URL + '/materials', {
			method: 'GET'
		}).then(data => data.json())
			.then(data => {
				this.setState({ materials: data.material });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});

		this.refreshReqs();
	}

	districtChange = (value) => {
		this.setState({ districts: value }, () => {
			this.refreshReqs();
		});
	};

	refreshReqs = () => {
		let query = "?dashboard=true&state=" + this.props.match.params.state;

		console.log(this.state.districts)
		if (this.state.districts) query += "&district=" + this.state.districts;
		console.log(query)

		fetch(process.env.REACT_APP_API_URL + '/requirements' + query, {
			method: 'GET'
		}).then(data => data.json())
			.then(data => {
				this.setState({ requirements: data.requirement });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	};

	express = () => {
		let newContribution = {
			districts: [],
			materials: [],
			amount: '',
			contribute_as: '',
			contributer_info: { name: '', phone: '', email: '' },
			message: '',
			preffered_supplier: ''
		};
		this.setState({ newContribution, showInterestModal: true });
	};

	closeInterestModal = () => {
		this.setState({ showInterestModal: false });
	};

	onChangeHandler = (type, value) => {
		if (value.target) value = value.target.value;
		let newContribution = this.state.newContribution;
		if (type === 'districts' || type === 'materials') {
			if (value.indexOf('Any') > -1) newContribution[type] = ['Any'];
			else newContribution[type] = value;
		} else if (type === 'amount' || type === 'contribute_as' || type === 'message' || type === 'preffered_supplier') {
			newContribution[type] = value;
		} else if (type === 'contributer_info_name' || type === 'contributer_info_phone' || type === 'contributer_info_email' || type === 'contributer_info_organization' || type === 'contributer_info_designation') {
			newContribution['contributer_info'][type.split('_')[2]] = value;
		}
		this.setState({ newContribution });
	};

	closeSharingModal = () => {
		this.setState({ showSharingModal: false });
	};

	contribute = () => {
		let error = false, newContribution = this.state.newContribution, errorObj = {};
		if (!newContribution.districts.length || !newContribution.materials.length || !newContribution.amount || !newContribution.contribute_as) error = true;
		else if (!newContribution.contributer_info.name || !newContribution.contributer_info.phone || !newContribution.contributer_info.email) error = true;
		else if (newContribution.contribute_as === 'organization' && (!newContribution.contributer_info.organization || !newContribution.contributer_info.designation)) error = true;

		if (!error) {
			newContribution.state = this.props.match.params.state;
			newContribution.amount = parseInt(newContribution.amount);
			fetch(process.env.REACT_APP_API_URL + '/add-contribute', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newContribution)
			}).then(data => data.json())
				.then(data => {
					if (data.status === 'ok') {
						this.setState({
							showInterestModal: false,
							newContribution: {
								districts: [],
								materials: [],
								amount: '',
								contribute_as: '',
								contributer_info: { name: '', phone: '', email: '' },
								message: '',
								preffered_supplier: ''
							},
							showSharingModal: true
						});
					} else {
						Swal.fire(
							'Oops!',
							'An error occured! Please try again in sometime.',
							'error'
						);
					}
				}).catch(err => {
					console.log(err);
					// Swal.fire(
					//   'Oops!',
					//   'An error occured! Please try again in sometime.',
					//   'error'
					// );
				});
		} else {
			if (!newContribution.districts.length) errorObj['districts'] = 'Please select at least one District';
			if (!newContribution.materials.length) errorObj['materials'] = 'Please select at least one Material';
			if (!newContribution.amount) errorObj['amount'] = 'Please enter contribution amount';
			if (!newContribution.contribute_as) errorObj['contribute_as'] = 'Please select at least one option';
			if (!newContribution.contributer_info.name) errorObj['name'] = 'Please enter your Full Name';
			if (!newContribution.contributer_info.phone) errorObj['phone'] = 'Please enter your Phone Number';
			if (!newContribution.contributer_info.email) errorObj['email'] = 'Please enter your Email Id';
			if (newContribution.contribute_as === 'organization') {
				if (!newContribution.contributer_info.organization) errorObj['organization'] = 'Please enter your Organization Name';
				if (!newContribution.contributer_info.designation) errorObj['designation'] = 'Please enter your Designation';
			}
			this.setState({ errorObj });
		}
	};

	logout = () => {
		Swal.fire({
			title: 'Are you sure you want to logout?',
			type: 'warning',
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Yes, Logout'
		}).then(res => {
			if (res.value) {
				this.props.logoutUser();
			}
		});
	};

	toggleMenu = () => {
		this.setState({ menuVisible: !this.state.menuVisible });
	};

	viewContributions = (material) => {
		let query = "?material=" + material;
		if (this.state.district) query += "&district=" + this.state.district;

		fetch(process.env.REACT_APP_API_URL + '/contributions' + query, {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
			.then(data => {
				this.setState({
					contributions: data.contributions,
					selectedContributionMaterial: material,
					showContributionModal: true
				});
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	};

	closeContributionModal = () => {
		this.setState({ contributions: [], selectedContributionMaterial: null, showContributionModal: false });
	};

	render() {
		return (
			<div className="landing-page">
				<div className="banner">
					{this.props.userData ? (
						<div className={this.state.menuVisible ? "menu-container to-right" : "menu-container to-left"}>
							<div className="arrow" onClick={this.toggleMenu}><i className="fas fa-chevron-left"></i></div>
							<a href="/dashboard"><i className="fas fa-laptop"></i></a>
							<i className="fas fa-sign-out-alt" onClick={this.logout}></i>
						</div>
					) : (null)}
					<div className="banner-container">
						<div className="black-text">COMBATING</div>
						<div className="black-text">COVID,</div>
						<div className="red-text">TOGETHER</div>
						<div className="black-text small">AN INITIATIVE OF</div>
						<div className="logos-container">
							<img src="/images/MSINS.png" width="200" height="80" style={{ padding: "15px 5px 0 0" }} />
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
							<div>We are currently in the midst of a pandemic. And we are aware that our healthcare capacity is not well-equipped to handle this burden. Built in collaboration with <span className="red-text"><a className="red-text" href="https://msins.in/" target="_blank">Maharashtra State Innovation Society, a body of the Government of Maharashtra</a>, the various district hospitals and <a className="red-text" href="https://letsendorse.com/" target="_blank">LetsEndorse</a></span>, this platform serves to bring forth the real-time gaps in the existing public health system and solicit collective support to bridge the same.</div>
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
							<Select showSearch size="large" value={this.state.districts} onChange={this.districtChange} style={{ width: 150 }}>
								<Option value="">All</Option>
								{this.state.districts.map(function (district, index) {
									return (
										<Option value={district.name} key={index}>{district.name}</Option>
									)
								})}
							</Select>
						</div>
						<div className="last-updated-container">
							<span className="black-text">Last Updated:</span>
							<span className="red-text">{moment().format('HH:mm') + ' | ' + moment().format('DD MMMM YYYY')}</span>
						</div>
					</div>
					<button className="btn interest-btn" onClick={this.express}>Express Interest To Contribute</button>
					<div className="requirements-container">
						<div className="heading">
							<div className="column-1">Requirement</div>
							<div className="column-2">Indicative Unit Cost (INR){/* <span className="btn" title="The price range is based on the vendors who have been identified by Maharashtra State Innovation Society. However, this is not an endorsed or fixed price.">?</span>*/}</div>
							<div className="column-3">Status (Progress of Fulfillment)</div>
							{this.props.userData ? (
								<div className="column-4">View Contribution History</div>
							) : (null)}
						</div>
						{!this.state.requirements.length ? (
							<div className="no-materials">
								<span className="title">No requirements available currently!</span>
								<span className="sub-title">Please wait until requirements are added.</span>
							</div>
						) : (null)}
						{this.state.requirements.map((requirement, index) => {
							return (
								<div className="req-row" key={index}>
									<div className="column-1" title={requirement.materialDesc}>{requirement._id}</div>
									<div className="column-2">
										{requirement.unit_min_price && requirement.unit_max_price ? (
											<span>{requirement.unit_min_price + ' - ' + requirement.unit_max_price}</span>
										) : (
												requirement.unit_min_price ? (
													requirement.unit_min_price
												) : (
														requirement.unit_max_price
													)
											)}
									</div>
									<div className="column-3">
										<div className="box">
											<div className="box-filled" style={parseInt(requirement.fullfilled_qnty / requirement.required_qnty * 100) > 100 ? { width: "100%" } : { width: parseInt(requirement.fullfilled_qnty / requirement.required_qnty * 100) + "%" }}><span>{requirement.fullfilled_qnty}</span></div>
											<span className="box-total">{requirement.required_qnty}</span>
										</div>
									</div>
									{this.props.userData ? (
										<div className="column-4">
											<button className="btn view-contribution-btn" onClick={this.viewContributions.bind(this, requirement._id)}>View</button>
										</div>
									) : (null)}
								</div>
							)
						})}
					</div>
					<note style={{ marginTop: 10, display: 'block' }}>
						<b>Note:</b>
						<span> The price range is based on the vendors who have been identified by Maharashtra State Innovation Society. However, this is not an endorsed or fixed price.</span>
					</note>
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
						<div>Once you gauge the gaps, you can click on "<span className="red-text">EXPRESS INTEREST TO CONTRIBUTE</span>" button, mention the scale of your contribution, recommend any supplier, and our task-force team shall get in touch with you to channelize your support in the most appropriate manner.</div>
						<div>To check how your contribution has reached the last mile, you can click on the hyperlinked name of the item and you would see the entire list of contributions in realtime.</div>
						<div>To know further, get in touch with us at <a href="mailto:support@letsendorse.com" target="_blank" className="red-text">support@letsendorse.com</a>.</div>
					</div>
				</div>
				<div className="footer-container">
					<div>PLATFORM AND UPDATES POWERED BY</div>
					<img src="https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp" width="200" height="70" />
				</div>

				<Modal className="express-interest-modal" show={this.state.showInterestModal}
					onHide={this.closeInterestModal} size="lg" aria-labelledby="contained-modal-title-lg">
					<Modal.Header className="add-partner-modal-header">
						<Modal.Title className="modal-header-custom">PLEDGING CONTRIBUTION TO COMBAT
                            COVID-19</Modal.Title>
					</Modal.Header>
					<Modal.Body className="express-interest-modal-body">
						<Row>
							<Col md={6}>
								<label className="control-label is-imp">Districts</label>
								<Select size="large" mode="multiple" style={{ width: "100%" }}
									value={this.state.newContribution.districts}
									onChange={this.onChangeHandler.bind(this, 'districts')}
									placeholder="Select District(s)">
									<Option value="Any">Any District</Option>
									{this.state.districts.map((district, index) => {
										return (
											<Option value={district.name} key={index}
												disabled={this.state.newContribution.districts.indexOf('Any') > -1 ? true : false}>{district.name}</Option>
										)
									})}
								</Select>
								{this.state.errorObj.districts ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.districts}</div>
								) : (null)}
							</Col>
							<Col md={6}>
								<label className="control-label is-imp">Materials</label>
								<Select size="large" mode="multiple" style={{ width: "100%" }}
									value={this.state.newContribution.materials}
									onChange={this.onChangeHandler.bind(this, 'materials')}
									placeholder="Select Material(s)">
									<Option value="Any">Any Material</Option>
									{this.state.materials.map((material, index) => {
										return (
											<Option value={material.name} key={index}
												disabled={this.state.newContribution.materials.indexOf('Any') > -1 ? true : false}>{material.name}</Option>
										)
									})}
								</Select>
								{this.state.errorObj.materials ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.materials}</div>
								) : (null)}
							</Col>
							<Col md={12}>
								<label className="control-label is-imp">Total Contribution (in-kind/financial)
                                    (INR)</label>
								<input className="form-control" type="number" value={this.state.newContribution.amount}
									onChange={this.onChangeHandler.bind(this, 'amount')}
									placeholder="Total Contribution (in-kind/financial) (INR)" />
								{this.state.errorObj.amount ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.amount}</div>
								) : (null)}
							</Col>
							<Col md={6} className="radio-container">
								<input type="radio" id="contribute_as_individual" value="individual"
									name="contribute_as"
									onChange={this.onChangeHandler.bind(this, 'contribute_as')} />
								<label className="control-label" htmlFor="contribute_as_individual">I am contributing in
                                    my individual capacity.</label>
							</Col>
							<Col md={6} className="radio-container">
								<input type="radio" id="contribute_as_organization" value="organization"
									name="contribute_as"
									onChange={this.onChangeHandler.bind(this, 'contribute_as')} />
								<label className="control-label" htmlFor="contribute_as_organization">I am contributing
                                    on behalf of my organization.</label>
							</Col>
							{this.state.errorObj.contribute_as ? (
								<Col md={12}>
									<div style={{ color: 'red' }}>{this.state.errorObj.contribute_as}</div>
								</Col>
							) : (null)}
							<Col md={4}>
								<label className="control-label is-imp">Full Name</label>
								<input className="form-control" type="text"
									value={this.state.newContribution.contributer_info.name}
									onChange={this.onChangeHandler.bind(this, 'contributer_info_name')}
									placeholder="Full Name" />
								{this.state.errorObj.name ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.name}</div>
								) : (null)}
							</Col>
							<Col md={4}>
								<label className="control-label is-imp">Phone</label>
								<input className="form-control" type="text"
									value={this.state.newContribution.contributer_info.phone}
									onChange={this.onChangeHandler.bind(this, 'contributer_info_phone')}
									placeholder="Phone Number" />
								{this.state.errorObj.phone ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.phone}</div>
								) : (null)}
							</Col>
							<Col md={4}>
								<label className="control-label is-imp">Email</label>
								<input className="form-control" type="email"
									value={this.state.newContribution.contributer_info.email}
									onChange={this.onChangeHandler.bind(this, 'contributer_info_email')}
									placeholder="Email Id" />
								{this.state.errorObj.email ? (
									<div style={{ color: 'red' }}>{this.state.errorObj.email}</div>
								) : (null)}
							</Col>
							{this.state.newContribution.contribute_as === 'organization' ? (
								<Col md={6}>
									<label className="control-label is-imp">Organization</label>
									<input className="form-control" type="text"
										value={this.state.newContribution.contributer_info.organization}
										onChange={this.onChangeHandler.bind(this, 'contributer_info_organization')}
										placeholder="Organization Name" />
									{this.state.errorObj.organization ? (
										<div style={{ color: 'red' }}>{this.state.errorObj.organization}</div>
									) : (null)}
								</Col>
							) : (null)}
							{this.state.newContribution.contribute_as === 'organization' ? (
								<Col md={6}>
									<label className="control-label is-imp">Designation</label>
									<input className="form-control" type="text"
										value={this.state.newContribution.contributer_info.designation}
										onChange={this.onChangeHandler.bind(this, 'contributer_info_designation')}
										placeholder="Designation" />
									{this.state.errorObj.designation ? (
										<div style={{ color: 'red' }}>{this.state.errorObj.designation}</div>
									) : (null)}
								</Col>
							) : (null)}
							<Col md={12}>
								<label className="control-label">Message</label>
								<textarea className="form-control" value={this.state.newContribution.message}
									onChange={this.onChangeHandler.bind(this, 'message')}
									placeholder="Enter your message here"></textarea>
							</Col>
							<Col md={12}>
								<label className="control-label">If you have a supplier of choice, kindly mention the
                                    same</label>
								<input className="form-control" type="text"
									value={this.state.newContribution.preffered_supplier}
									onChange={this.onChangeHandler.bind(this, 'preffered_supplier')} />
							</Col>
						</Row>
						<div className="text-center footer-container">
							<button className="btn contribute-btn" onClick={this.contribute}>I Contribute</button>
							<note>By clicking on "I Contribute", I am granting the permission to the task-force to reach
							me.
                            </note>
						</div>
					</Modal.Body>
				</Modal>

				<Modal className="sharing-modal" show={this.state.showSharingModal} onHide={this.closeSharingModal}
					size="lg" aria-labelledby="contained-modal-title-lg">
					<Modal.Body className="sharing-modal-body">
						<Row>
							<Col md={12} className="text-center text-container">
								<img className="mb20" src="/images/hands.png" width="120" />
								<h2>WE SINCERELY THANK YOU FOR DECIDING TO CONTRIBUTE TOWARDS STRENGTHENING THE HEALTH
                                    INFRASTRUCTURE TO FIGHT COVID-19</h2>
								<h3>We shall get in touch with you shortly to process the contribution</h3>
								{/*<h4>Share about your contribution and motivate others</h4>*/}
							</Col>

							{/*<Col md={12} className="share-buttons">
								<FacebookShareButton url="http://covid.letsendorse.com" quote="Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit." hashtag={["#Covid-19", "#Corona", "#Maharashtra", "#LetsEndorse"]}>
									<img src="/images/facebook.png" height="46" />
								</FacebookShareButton>

								<TwitterShareButton title="Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse" url="http://covid.letsendorse.com" hashtags={["Covid-19", "Corona", "Maharashtra", "LetsEndorse"]}>
									<img src="/images/twitter.png" width="125" />
								</TwitterShareButton>

								<LinkedinShareButton title="Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse" url="http://covid.letsendorse.com" source="http://covid.letsendorse.com" summary="Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit.">
									<img        src="/images/linkedin.png" height="46" style={{borderRadius: 5}} />
								</LinkedinShareButton>

								<WhatsappShareButton title="Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse" url="http://covid.letsendorse.com">
									<img src="/images/whatsapp.png" height="48" />
								</WhatsappShareButton>
							</Col>*/}
							<div className="quote">Stay safe ! Stay home !</div>
						</Row>
					</Modal.Body>
				</Modal>

				<Modal className="contribution-modal" show={this.state.showContributionModal}
					onHide={this.closeContributionModal} size="lg" aria-labelledby="contained-modal-title-lg">
					<Modal.Body className="contribution-modal-body">
						<h3 className="text-center">{this.state.selectedContributionMaterial}</h3>
						<Row>
							<Table striped bordered responsive>
								<thead>
									<tr>
										<th>District(s)</th>
										<th>Material(s)</th>
										<th style={{ width: "300" }}>Total Contribution (in-kind/financial) (INR)</th>
										<th>Contributed As</th>
										<th>Full Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Organization</th>
										<th>Designation</th>
										<th>Message</th>
										<th>Preffered Supplier</th>
										<th>Submitted On</th>
									</tr>
								</thead>
								<tbody>
									{this.state.contributions.map((contribution, index) => {
										return (
											<tr>
												<td>{contribution.districts.join(', ')}</td>
												<td>{contribution.materials.join(', ')}</td>
												<td style={{ width: "300" }}>{contribution.amount}</td>
												<td className="contributed-as">{contribution.contribute_as}</td>
												<td>{contribution.contributer_info.name}</td>
												<td>{contribution.contributer_info.email}</td>
												<td>{contribution.contributer_info.phone}</td>
												<td>{contribution.contributer_info.organization ? contribution.contributer_info.organization : 'N/A'}</td>
												<td>{contribution.contributer_info.designation ? contribution.contributer_info.designation : 'N/A'}</td>
												<td>{contribution.message}</td>
												<td>{contribution.preffered_supplier}</td>
												<td>{moment(contribution.timestamp).format('DD/MM/YYYY')}</td>
											</tr>
										)
									})}
								</tbody>
							</Table>
							{!this.state.contributions.length ? (
								<div className="no-contribution">No contributions have been made yet!</div>
							) : (null)}
						</Row>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}