import moment from 'moment';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { authHeader } from '../helper/auth-header';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class HaffkineViewInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            Inventory: [],
            materials: [],
            newRequestId: null
        }
    }

    // componentDidMount() {
    //     fetch(apiBaseUrl + '/api/v1/inventory', {
    //         method: 'GET',
    //         // headers: authHeader,
    //         headers: {
    //             'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(data => data.json())
    //         .then(data => {
    //             this.setState({ Inventory: data.data });
    //             console.log(this.state.data.orders)
    //         }).catch(err => {
    //             console.log(err);
    //             // Swal.fire(
    //             //   'Oops!',
    //             //   'An error occured! Please try again in sometime.',
    //             //   'error'
    //             // );
    //         });
    // }


    // Inventories = (districtId) => {
    //     window.location.pathname = "/procurer-order/" + districtId;
    // };



    componentDidMount() {
        this.getRequests();

        fetch(apiBaseUrl + '/materials', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                if (data.status === 'ok') this.setState({ materials: data.material });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    getRequests = () => {
        fetch(apiBaseUrl + '/api/v1/inventory', {
            // method: 'GET',
            // headers: {
            //     'Auth': readCookie('access_token')
            // }
            method: 'GET',
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                if (data.status === 'ok') this.setState({ requests: data.data, newRequestId: null });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    addRequest = () => {
        let requests = this.state.requests;
        requests.unshift({
            _id: '0',
            materialId: '',
            unitsReceived: ''
            // districtId: this.props.userData.districts[0]._id
        });

        this.setState({ requests, newRequestId: '0' });
    }

    handleNewReqChange = (index, type, value) => {
        let requests = this.state.requests;
        if (type === 'unitsReceived') value = parseInt(value.target.value);
        requests[index][type] = value;
        this.setState({ requests });
    }

    saveRequest = () => {
        let request = {
            materialId: this.state.requests[0].materialId,
            unitsReceived: this.state.requests[0].unitsReceived
            // districtId: this.state.requests[0].districtId
        }, error = false;

        if (!this.state.requests[0].materialId) error = 'material';
        else if (!this.state.requests[0].unitsReceived) error = 'unitsReceived';

        if (!error) {
            fetch(apiBaseUrl + '/api/v1/inventory', {
                method: 'POST',
                headers: {
                    'Auth': readCookie('access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }).then(data => data.json())
                .then(data => {
                    this.setState({ newRequestId: null });
                    this.getRequests();
                    Swal.fire({ title: 'Request successfully added.', type: 'success' });
                }).catch(err => {
                    console.log(err);
                    this.setState({ newRequestId: null });
                    // Swal.fire(
                    //   'Oops!',
                    //   'An error occured! Please try again in sometime.',
                    //   'error'
                    // );
                });
        } else {
            if (error === 'material') Swal.fire('', 'Please select a correct Material', 'error');
            else if (error === 'unitsReceived') Swal.fire('', 'Please enter correct requested units', 'error');
        }
    }

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">VIEW INVENTORY</h2>
                <div className="table-buttons" >
                    {this.state.newRequestId ? (
                        <button className="btn save-button" onClick={this.saveRequest}>
                            <i className="fas fa-check"></i>Save Request
                        </button>
                    ) : (
                            <button className="btn btn-alt add-button" onClick={this.addRequest}>
                                <i className="fas fa-plus"></i>Add Request
                            </button>
                        )}
                </div>
                <div className="heading">

                    <div className="column-2">Item</div>
                    <div className="column-2">Units Received</div>
                    <div className="column-2">Units Issued</div>
                    <div className="column-2">Balance Units</div>


                </div>
                {!this.state.requests.length ? (
                    <div className="no-district">Requested Items not found</div>
                ) : (null)}
                {this.state.requests.map((request, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">
                                {this.state.newRequestId === request._id ? (
                                    <Select showSearch size="large" value={request.materialId} onChange={this.handleNewReqChange.bind(this, index, 'materialId')} style={{ width: "100%" }} placeholder="Select Material">
                                        {this.state.materials.map(function (material, index) {
                                            return (
                                                <Option value={material._id} key={index}>{material.name}</Option>
                                            )
                                        })}
                                    </Select>
                                ) : request.name}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === request._id ? (
                                    <input className="form-control" type="number" value={request.unitsReceived} onChange={this.handleNewReqChange.bind(this, index, 'unitsReceived')} placeholder="Enter Requested Units" />
                                ) : request.unitsReceived}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === request._id ? (
                                    <input className="form-control" type="number" value={request.unitsIssued} onChange={this.handleNewReqChange.bind(this, index, 'unitsIssued')} placeholder="Enter Issue Units" />
                                ) : request.unitsIssued}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === request._id ? (
                                    <input className="form-control" type="number" value={request.balanceUnits} onChange={this.handleNewReqChange.bind(this, index, 'balanceUnits')} placeholder="Enter Issue Units" />
                                ) : request.balanceUnits}
                            </div>

                            {/* <div className="column-2">

                                <button className="btn manage-district-btn"
                                    onClick={this.Inventories.bind(this, Inventories._id)}>Allocate
                                </button>
                            </div> */}

                        </div>
                    )
                })}
            </div>
        );
    }
}
