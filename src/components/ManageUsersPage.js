import moment from 'moment';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

moment.locale('en');

export default class ManageUsersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			districts: [],
			editUser: null
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

		this.refreshUsers();
	}

	refreshUsers = () => {
		fetch(apiBaseUrl + '/users', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
			.then(data => {
				this.setState({ users: data.users });
			}).catch(err => {
				console.log(err);
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
	}

	editUser = (user_id) => {
		this.setState({ editUser: user_id });
	}

	handleChange = (index, type, value) => {
		let users = this.state.users;
		if (value.target) value = value.target.value;
		if (type === 'districts') {
			if (value.indexOf('All') > -1) users[index][type] = ['All'];
			else users[index][type] = value;
		} else users[index][type] = value;
		this.setState({ users });
	}

	addUser = () => {
		let valid = true, users = this.state.users;
		if (users.length) {
			if (!users[users.length - 1].name || !users[users.length - 1].email || !users[users.length - 1].phone || !users[users.length - 1].role || !users[users.length - 1].districts.length || !users[users.length - 1].status) valid = false;
		}

		if (valid) {
			users.push({
				_id: '0',
				name: '',
				email: '',
				phone: '',
				role: '',
				districts: [],
				status: ''
			});

			this.setState({ users, editUser: '0' });
		}
	}

	saveUser = (index, user) => {
		let userObj = {
			districts: user.districts,
			status: user.status
		}, error = false, requirement = this.state.requirement;

		if (!user.districts.length) error = 'districts';
		else if (!user.status) error = 'status';

		if (parseInt(user._id) === 0) {
			if (!user.name) error = 'name';
			else if (!user.role) error = 'role';
			else if (!user.email) error = 'email';
			else if (!user.phone) error = 'phone';

			if (!error) {
				userObj['name'] = user.name;
				userObj['role'] = user.role;
				userObj['email'] = user.email;
				userObj['phone'] = user.phone;
			}
		}

		if (!error) {
			let url = apiBaseUrl + '/update-user/' + user._id, method = 'PUT';
			if (parseInt(user._id) === 0) {
				method = 'POST';
				url = apiBaseUrl + '/add-user';
			}

			fetch(url, {
				method,
				headers: {
					'Auth': readCookie('access_token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userObj)
			}).then(data => data.json())
				.then(data => {
					this.refreshUsers();
					this.setState({ editUser: null });
					let title = 'User successfully updated.';
					if (parseInt(user._id) === 0) title = 'User added successfully.';
					Swal.fire({ title, type: 'success' });
				}).catch(err => {
					console.log(err);
					this.setState({ editUser: null });
					// Swal.fire(
					//   'Oops!',
					//   'An error occured! Please try again in sometime.',
					//   'error'
					// );
				});
		} else {
			if (error === 'name') Swal.fire('', 'Please enter correct Name', 'error');
			else if (error === 'role') Swal.fire('', 'Please select a correct Role', 'error');
			else if (error === 'email') Swal.fire('', 'Please enter correct Email', 'error');
			else if (error === 'phone') Swal.fire('', 'Please enter correct Phone Number', 'error');
			else if (error === 'districts') Swal.fire('', 'Please select correct Districts', 'error');
			else if (error === 'status') Swal.fire('', 'Please select a correct Status', 'error');
		}
	}

	render() {
		return (
			<div className="manage-users-page page-container">
				<h2 className="text-center">MANAGE USERS</h2>
				<div className="heading">
					<div className="column column-1">Name</div>
					<div className="column column-2">Email</div>
					<div className="column column-3">Phone</div>
					<div className="column column-4">Role</div>
					<div className="column column-5">Districts</div>
					<div className="column column-6">Status</div>
					<div className="column column-7">Edit</div>
				</div>
				{!this.state.users.length ? (
					<div className="no-items">User(s) not found</div>
				) : (null)}
				{this.state.users.map((user, index) => {
					return (
						<div className="item-row" key={index}>
							{this.state.editUser === '0' ? (
								<div className="column column-1">
									<input className="form-control" type="text" value={user.name} onChange={this.handleChange.bind(this, index, 'name')} placeholder="Enter Fullname" />
								</div>
							) : (
									<div className="column column-1">{user.name}</div>
								)}
							{this.state.editUser === '0' ? (
								<div className="column column-2">
									<input className="form-control" type="email" value={user.email} onChange={this.handleChange.bind(this, index, 'email')} placeholder="Enter Email" />
								</div>
							) : (
									<div className="column column-2">{user.email}</div>
								)}
							{this.state.editUser === '0' ? (
								<div className="column column-3">
									<input className="form-control" type="text" value={user.phone} onChange={this.handleChange.bind(this, index, 'phone')} placeholder="Enter Phone" />
								</div>
							) : (
									<div className="column column-3">{user.phone}</div>
								)}
							{this.state.editUser === '0' ? (
								<div className="column column-4">
									<Select size="large" value={user.role} onChange={this.handleChange.bind(this, index, 'role')} style={{ width: "100%" }}>
										<Option value="">Select Role</Option>
										<Option value="District Officer">District Officer</Option>
										<Option value="DHS (Directorate of Health Services)">DHS (Directorate of Health Services)</Option>
										<Option value="Admin (MSINS)">Admin (MSINS)</Option>
										<Option value="HAFFKINE">HAFFKINE</Option>
									</Select>
								</div>
							) : (
									<div className="column column-4">{user.role}</div>
								)}
							{this.state.editUser === user._id ? (
								<div className="column column-5">
									<Select mode="multiple" size="large" value={user.districts} onChange={this.handleChange.bind(this, index, 'districts')} style={{ width: "100%" }}>
										<Option value="All">All</Option>
										{this.state.districts.map((district, dIndex) => {
											return (
												<Option value={district.name} key={dIndex} disabled={user.districts.indexOf('All') > -1 ? true : false}>{district.name}</Option>
											)
										})}
									</Select>
								</div>
							) : (
									<div className="column column-5">{user.districts.join(', ')}</div>
								)}
							{this.state.editUser === user._id ? (
								<div className="column column-6">
									<Select size="large" value={user.status} onChange={this.handleChange.bind(this, index, 'status')} style={{ width: "100%" }}>
										<Option value="">Select Status</Option>
										<Option value="Active">Active</Option>
										<Option value="Inactive">Inactive</Option>
									</Select>
								</div>
							) : (
									<div className="column column-6">{user.status}</div>
								)}
							<div className="column column-7">
								{this.state.editUser === user._id ? (
									<button className="btn column-btn" onClick={this.saveUser.bind(this, index, user)}>Save</button>
								) : (
										<button className="btn column-btn" disabled={this.state.editUser} onClick={this.editUser.bind(this, index, user._id)}>Edit</button>
									)}
							</div>
						</div>
					)
				})}
				<div className="add-item-container">
					<button className="btn add-item-btn" onClick={this.addUser} disabled={this.state.editUser}>
						<i className="fa fa-plus"></i>
						Add User
					</button>
				</div>
			</div>
		);
	}
}
