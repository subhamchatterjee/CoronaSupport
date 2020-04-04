import moment from 'moment';
import Swal from 'sweetalert2';
import React, {Component} from 'react';
import {Select} from 'antd';
import {apiBaseUrl} from './config.jsx'

const {Option} = Select;
const readCookie = require('../cookie.js').readCookie;

moment.locale('en');

export default class ManageUsersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roles: [],
			users: [],
			districts: [],
			editUser: null,
			DORoleId: null
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

		fetch(apiBaseUrl + '/api/v1/user-roles', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			if (data.status === 'ok') {
				let DORoleId = '';
				for(let i = 0; i < data.data.length; i++) {
					if(data.data[i].name === 'REQUESTOR') DORoleId = data.data[i]._id;
				}
				this.setState({ roles: data.data, DORoleId });
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
		fetch(apiBaseUrl + '/api/v1/users', {
			method: 'GET',
			headers: {
				'Auth': readCookie('access_token')
			}
		}).then(data => data.json())
		.then(data => {
			if(data.status === 'ok') this.setState({ users: data.data, editUser: null });
		}).catch(err => {
			console.log(err);
			// Swal.fire(
			//   'Oops!',
			//   'An error occured! Please try again in sometime.',
			//   'error'
			// );
		});
	}

	editUser = (index, user) => {
		this.setState({ editUser: user._id });
	}

	handleChange = (index, type, value) => {
		let users = this.state.users;
		if (value.target) value = value.target.value;
		users[index][type] = value;
		if(type === 'roleId') users[index]['districtIds'] = [];
		this.setState({ users });
	}

	addUser = () => {
		let valid = true, users = this.state.users;
		if (users.length) {
			if (!users[users.length - 1].fullName || !users[users.length - 1].email || !users[users.length - 1].role || !users[users.length - 1].status) valid = false;
		}

		if (valid) {
			users.push({
				_id: '0',
				fullName: '',
				email: '',
				phone: '',
				role: '',
				districts: [],
				status: ''
			});

			this.setState({users, editUser: '0'});
		}
	}

	saveUser = (index, user) => {
		let userObj = {
			fullName: user.fullName,
			status: user.status
		}, error = false, requirement = this.state.requirement;

		if(user.districtIds) {
			if(typeof user.districtIds === 'object' && Array.isArray(user.districtIds)) userObj['districtIds'] = user.districtIds;
			else userObj['districtIds'] = [user.districtIds];
		}

		if (user.roleId === this.state.DORoleId && !user.districtIds.length) error = 'districts';
		else if (!user.fullName) error = 'fullName';
		else if (!user.status) error = 'status';

		if (parseInt(user._id) === 0) {
			if (!user.roleId) error = 'role';
			else if (!user.email) error = 'email';

			if (!error) {
				userObj['roleId'] = user.roleId;
				userObj['email'] = user.email;
				userObj['phone'] = user.phone;
			}
		}

		if (!error) {
			let url = apiBaseUrl + '/api/v1/user/' + user._id, method = 'PUT';
			if (parseInt(user._id) === 0) {
				method = 'POST';
				url = apiBaseUrl + '/api/v1/user';
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
				if(data.status === 'ok') {
					this.refreshUsers();
					let title = 'User successfully updated.';
					if (parseInt(user._id) === 0) title = 'User added successfully.';
					Swal.fire({title, type: 'success'});
				} else {
					Swal.fire('', data.message, 'error');
				}
			}).catch(err => {
				console.log(err);
				this.refreshUsers();
				// Swal.fire(
				//   'Oops!',
				//   'An error occured! Please try again in sometime.',
				//   'error'
				// );
			});
		} else {
			if (error === 'fullName') Swal.fire('', 'Please enter correct Name', 'error');
			else if (error === 'role') Swal.fire('', 'Please select a correct Role', 'error');
			else if (error === 'email') Swal.fire('', 'Please enter correct Email', 'error');
			else if (error === 'districts') Swal.fire('', 'Please select a correct District', 'error');
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
					<div className="column column-7">EDIT/SAVE</div>
				</div>
				{!this.state.users.length ? (
					<div className="no-items">User(s) not found</div>
				) : (null)}
				{this.state.users.map((user, index) => {
					return (
						<div className="item-row" key={index}>
							{this.state.editUser === user._id ? (
								<div className="column column-1">
									<input className="form-control" type="text" value={user.fullName} onChange={this.handleChange.bind(this, index, 'fullName')} placeholder="Enter Fullname"/>
								</div>
							) : (
								<div className="column column-1">{user.fullName}</div>
							)}
							{this.state.editUser === '0' && this.state.editUser === user._id ? (
								<div className="column column-2">
									<input className="form-control" type="email" value={user.email} onChange={this.handleChange.bind(this, index, 'email')} placeholder="Enter Email"/>
								</div>
							) : (
								<div className="column column-2">{user.email}</div>
							)}
							{this.state.editUser === '0' && this.state.editUser === user._id ? (
								<div className="column column-3">
									<input className="form-control" type="text" value={user.phone} onChange={this.handleChange.bind(this, index, 'phone')} placeholder="Enter Phone"/>
								</div>
							) : (
								<div className="column column-3">{user.phone}</div>
							)}
							{this.state.editUser === '0' && this.state.editUser === user._id ? (
								<div className="column column-4">
									<Select size="large" value={user.roleId} onChange={this.handleChange.bind(this, index, 'roleId')} style={{width: "100%"}}>
										<Option value="">Select Role</Option>
										{this.state.roles.map((role, index) => {
											return (
												<Option value={role._id} key={index}>{role.label}</Option>
											)
										})}
									</Select>
								</div>
							) : (
								<div className="column column-4">{user.role.label}</div>
							)}
							{this.state.editUser === user._id && user.roleId === this.state.DORoleId ? (
								<div className="column column-5">
									<Select size="large" value={user.districtIds} onChange={this.handleChange.bind(this, index, 'districtIds')} style={{width: "100%"}}>
										{this.state.districts.map((district, dIndex) => {
											return (
												<Option value={district._id} key={dIndex}>{district.name}</Option>
											)
										})}
									</Select>
								</div>
							) : (
								<div className="column column-5">
									{user.districts.map((district, index) => {
										if(typeof district === 'string') {
											if(index) return ', ' + district;
											else return district;
										} else {
											if(index) return ', ' + district.name;
											else return district.name;
										}
									})}
								</div>
							)}
							{this.state.editUser === user._id ? (
								<div className="column column-6">
									<Select size="large" value={user.status} onChange={this.handleChange.bind(this, index, 'status')} style={{width: "100%"}}>
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
									<button className="btn column-btn" disabled={this.state.editUser} onClick={this.editUser.bind(this, index, user)}>Edit</button>
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
