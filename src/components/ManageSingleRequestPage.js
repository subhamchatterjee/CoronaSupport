import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Select } from 'antd';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class ManageSingleRequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: [],
            district: null,
            editRequirement: null,
            selectedRequirement: null,
            showFulfilmentModal: false
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/requirement', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                this.setState({ materials: data.materials });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });

        fetch(apiBaseUrl + '/district/' + this.props.match.params.districtId, {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                let district = data.district;
                fetch(apiBaseUrl + '/requirements?district=' + district.name, {
                    method: 'GET'
                }).then(data => data.json())
                    .then(data => {
                        district.requirements = data.requirements;
                        this.setState({ district });
                    }).catch(err => {
                        console.log(err);
                        // Swal.fire(
                        //   'Oops!',
                        //   'An error occured! Please try again in sometime.',
                        //   'error'
                        // );
                    });
            }).catch(err => {
                console.log(err);
            });
    }

    manageFulfilment = (req_id) => {
        window.location.pathname = "/fulfilments/" + req_id;
    };

    addMaterial = () => {
        let valid = true, district = this.state.district;
        if (district.requirements.length) {
            if (!district.requirements[district.requirements.length - 1].material || !district.requirements[district.requirements.length - 1].required_qnty) valid = false;
        }

        if (valid) {
            district.requirements.push({
                _id: '0',
                material: '',
                required_qnty: '',
                fullfilled_qnty: ''
            });

            this.setState({ district, editRequirement: '0' });
        }
    };

    editRequirement = (req_id) => {
        this.setState({ editRequirement: req_id });
    };

    handleReqChange = (index, type, value) => {
        let district = this.state.district;
        if (value.target) value = parseInt(value.target.value);
        district.requirements[index][type] = value;
        this.setState({ district });
    };

    saveRequirement = (req) => {
        let requirement = {
            material: req.material,
            required_qnty: req.required_qnty
        }, error = false, district = this.state.district;

        if (district.requirements.length > 1) {
            for (let i = 0; i < district.requirements.length; i++) {
                if (req._id !== district.requirements[i]._id && req.material === district.requirements[i].material) error = 'material';
            }
        }
        if (!req.material) error = 'material';
        else if (!req.required_qnty) error = 'required_qnty';

        requirement['district'] = district.name;

        if (!error) {
            let url = apiBaseUrl + '/update-requirement/' + req._id, method = 'PUT';
            if (parseInt(req._id) === 0) {
                method = 'POST';
                url = apiBaseUrl + '/add-requirement';
            }
            fetch(url, {
                method,
                headers: {
                    'Auth': readCookie('access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requirement)
            }).then(data => data.json())
                .then(data => {
                    this.setState({ editRequirement: null });
                    let title = 'Requirement successfully updated.';
                    if (parseInt(req._id) === 0) title = 'Requirement added successfully.';
                    Swal.fire({ title, type: 'success' });
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
            if (error === 'material') Swal.fire('', 'Please select a correct Material', 'error');
            else if (error === 'required_qnty') Swal.fire('', 'Please enter correct required units', 'error');
        }
    };

    render() {
        if (this.state.district !== null) {
            return (
                <div className="manage-single-district-page">
                    <h2 className="text-center">{this.state.district.name}</h2>
                    <div className="heading">
                        <div className="column-1">Material</div>
                        <div className="column-2">Required Units</div>
                        <div className="column-3">Fulfilled Units</div>
                        <div className="column-4">Manage Fulfilments</div>
                        <div className="column-5">EDIT / SAVE Required Units</div>
                    </div>
                    {!this.state.district.requirements.length ? (
                        <div className="no-districts">Requirements not found</div>
                    ) : (null)}
                    {this.state.district.requirements.map((req, index) => {
                        return (
                            <div className="district-row" key={index}>
                                {this.state.editRequirement === req._id ? (
                                    <div className="column-1">
                                        <Select showSearch size="large" value={req.material}
                                            onChange={this.handleReqChange.bind(this, index, 'material')}
                                            style={{ width: "100%" }}>
                                            {this.state.materials.map(function (material, index) {
                                                return (
                                                    <Option value={material.name} key={index}>{material.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                ) : (
                                        <div className="column-1">{req.material}</div>
                                    )}
                                {this.state.editRequirement === req._id ? (
                                    <div className="column-2">
                                        <input className="form-control" type="number" value={req.required_qnty}
                                            onChange={this.handleReqChange.bind(this, index, 'required_qnty')} />
                                    </div>
                                ) : (
                                        <div className="column-2">{req.required_qnty}</div>
                                    )}
                                <div className="column-3">{req.fullfilled_qnty}</div>
                                <div className="column-4">
                                    <button className="btn add-fulfilment-btn" disabled={this.state.editRequirement}
                                        onClick={this.manageFulfilment.bind(this, req._id)}>Manage
                                    </button>
                                </div>
                                <div className="column-5">
                                    {this.state.editRequirement === req._id ? (
                                        <button className="btn save-requirement-btn"
                                            onClick={this.saveRequirement.bind(this, req)}>Save</button>
                                    ) : (
                                            <button className="btn edit-requirement-btn"
                                                disabled={this.state.editRequirement}
                                                onClick={this.editRequirement.bind(this, req._id)}>Edit</button>
                                        )}
                                </div>
                            </div>
                        )
                    })}
                    <div className="add-material-container">
                        <button className="btn add-material-btn" onClick={this.addMaterial}
                            disabled={this.state.editRequirement}>
                            <i className="fa fa-plus"></i>
                            Add Material
                        </button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
