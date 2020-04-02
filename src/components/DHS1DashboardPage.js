import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Select } from 'antd';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class DODashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            districts: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/overview', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OWNjNzkwZmM0NTk5MDQ5NWQyZiIsImlhdCI6MTU4NTY3NDc3OSwiZXhwIjoxNTg4MjY2Nzc5fQ.kOoJ5fAuGq2Z8ywy4gMaHoxvdAwoYK5fqx7cbG9ffos',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                if (data.status === 'ok') {
                    this.setState({ items: data.data });
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

    viewHistory = (item_id) => {

    };

    render() {
        return (


            <div className="manage-districts-page">

                <h2 className="text-center">Dashboard</h2>
                <div className="filter">
                    <label className="control-label">District</label>
                    <Select showSearch size="large" value={this.state.district} onChange={this.districtChange}
                        style={{ width: 150 }}>
                        <Option value="">All</Option>
                        {this.state.districts.map(function (district, index) {
                            return (
                                <Option value={district.name} key={index}>{district.name}</Option>
                            )
                        })}
                    </Select>
                </div>
                <div className="heading">
                    <div className="column-2">Item</div>
                    <div className="column-2">Items Requested</div>
                    <div className="column-2">Items Approved</div>
                    <div className="column-2">Items Received (State-Efforts)</div>
                    <div className="column-2">Orders Placed (Not yet received)</div>
                    <div className="column-2">Orders Dispatched</div>
                    <div className="column-2">Remaining requirement</div>
                    <div className="column-2">View History</div>
                    <div className="column-2">Items Received (Own efforts)</div>
                </div>
                {!this.state.items.length ? (
                    <div className="no-districts
                        ">No Items found</div>
                ) : (null)}
                {this.state.items.map((item, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2" >{item.name}</div>
                            <div className="column-2">{item.itemsRequested}</div>
                            <div className="column-2">{item.itemsApproved}</div>
                            <div className="column-2">{item.itemsReceived}</div>
                            <div className="column-2">{item.ordersPlaced}</div>
                            <div className="column-2">{item.ordersDispatched}</div>
                            <div className="column-2">{item.remainingRequirement}</div>
                            <div className="column-2">
                                <button className="btn column-btn"
                                    onClick={this.viewHistory.bind(this, item._id)}>View
                                    </button>
                            </div>
                            <div className="column-2">{item.itemsReceivedOwnEffort}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
