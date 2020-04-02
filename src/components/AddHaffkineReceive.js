import moment from 'moment';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { authHeader } from '../helper/auth-header';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;


export default class AddHaffkineReceive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            materials: [],
            newRequestId: null
        }
    }


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


        fetch(apiBaseUrl + '/api/v1/orders', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTcyMTkwMiwiZXhwIjoxNTg4MzEzOTAyfQ.dXALb-NgbO57Bo5iya3osu2FW73OnUfEdVFRRl4uijg',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                this.setState({ orders: data.data });

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
        fetch(apiBaseUrl + '/api/v1/requirements', {
            method: 'GET',
            headers: {
                'Auth': readCookie('access_token')
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
    // HaffkineReceive = (districtId) => {
    //     window.location.pathname = "/procurer-request/" + districtId;
    // };

    saveHaffkineReceive = () => {
        let request = {
            materialId: this.state.requests[0].materialId,
            required_qnty: this.state.requests[0].required_qnty,
            districtId: this.state.requests[0].districtId
        }, error = false;

        if (!this.state.requests[0].materialId) error = 'material';
        else if (!this.state.requests[0].required_qnty) error = 'required_qnty';

        if (!error) {
            fetch(apiBaseUrl + '/api/v1/requirement', {
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
            else if (error === 'required_qnty') Swal.fire('', 'Please enter correct requested units', 'error');
        }
    }


    addHaffkineReceive = () => {
        let requests = this.state.requests;
        requests.unshift({
            _id: '0',
            materialId: '',
            required_qnty: '',
            districtId: this.props.userData.districts[0]._id
        });

        this.setState({ requests, newRequestId: '0' });
    }

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">RECEIVE ITEMS</h2>
                <div className="table-buttons">
                    {this.state.newRequestId ? (
                        <button className="btn save-button" onClick={this.saveHaffkineReceive}>
                            <i className="fas fa-check"></i>Save Haffkine Receive
                        </button>
                    ) : (
                            <button className="btn btn-alt add-button" onClick={this.addHaffkineReceive}>
                                <i className="fas fa-plus"></i>Add Haffkine Receive
                            </button>
                        )}
                </div>
                <div className="heading">
                    <div className="column-2">Order ID</div>
                    <div className="column-2">Item</div>

                    <div className="column-2">Units Ordered</div>
                    <div className="column-2">Ordered Date</div>
                    <div className="column-2">Expected date of receipt</div>
                    <div className="column-2">Funder(select all that apply)</div>
                    <div className="column-2">Order Value</div>
                    <div className="column-2">Comments about the order/ supplier</div>
                    <div className="column-2">District preference(If any)</div>
                    <div className="column-2">Receipt status(Haffkine)</div>
                    <div className="column-2">Date of Receipt</div>
                    <div className="column-2">Units Recieved</div>

                </div>
                {!this.state.orders.length ? (
                    <div className="no-districts">Order Listings not found</div>
                ) : (null)}





                {this.state.orders.map((order, index) => {
                    return (
                        <div className="item-row" key={index}>
                            <div className="column-2">{order.orderId}</div>

                            <div className="column column-1">
                                {this.state.newRequestId === order._id ? (
                                    <Select showSearch size="large" value={order.materialId} onChange={this.handleNewReqChange.bind(this, index, 'materialId')} style={{ width: "100%" }} placeholder="Select Material">
                                        {this.state.materials.map(function (material, index) {
                                            return (
                                                <Option value={material._id} key={index}>{material.name}</Option>
                                            )
                                        })}
                                    </Select>
                                ) : order.material}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="number" value={order.orderedUnits} onChange={this.handleNewReqChange.bind(this, index, 'orderedUnits')} placeholder="Enter order Units" />
                                ) : request.orderedUnits}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="date" value={order.orderedDate} onChange={this.handleNewReqChange.bind(this, index, 'orderedDate')} placeholder="Enter order Date" />
                                ) : request.orderedDate}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.expectedDateOfReceipt} onChange={this.handleNewReqChange.bind(this, index, 'expectedDateOfReceipt')} placeholder="Enter order expected Date Of Receipt" />
                                ) : request.expectedDateOfReceipt}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.funder} onChange={this.handleNewReqChange.bind(this, index, 'funder')} placeholder="Enter funder" />
                                ) : request.funder}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.amount} onChange={this.handleNewReqChange.bind(this, index, 'amount')} placeholder="Enter amount" />
                                ) : request.amount}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.comment} onChange={this.handleNewReqChange.bind(this, index, 'comment')} placeholder="Enter comment" />
                                ) : request.comment}
                            </div>
                            <div className="column-2">{order.district}</div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.status} onChange={this.handleNewReqChange.bind(this, index, 'status')} placeholder="Enter order status" />
                                ) : request.status}
                            </div>
                            <div className="column column-2">
                                {this.state.newRequestId === order._id ? (
                                    <input className="form-control" type="text" value={order.receivedUnits} onChange={this.handleNewReqChange.bind(this, index, 'receivedUnits')} placeholder="Enter order received Units" />
                                ) : request.receivedUnits}
                            </div>

                        </div>
                    )
                })}






            </div>
        );
    }
}
