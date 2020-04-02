import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'
import { Select } from 'antd';

const { Option } = Select;

export default class HaffkineViewInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allocates: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/inventory', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                this.setState({ allocates: data.data });
                console.log(this.state.data.orders)
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }
    Allocate = (districtId) => {

    };


    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">ALLOCATE ITEMS</h2>
                <div className="filter">
                    <label className="control-label">Select Items</label>
                    <Select showSearch size="large" value={this.state.allocate} onChange={this.allocateChange}
                        style={{ width: 150 }}>
                        <Option value="">All</Option>
                        {this.state.allocates.map(function (allocate, index) {
                            return (
                                <Option value={allocate.name} key={index}>{allocate.name}</Option>
                            )
                        })}
                    </Select>
                </div>

                <div className="heading">

                    <div className="column-2">Units</div>
                    <div className="column-2">District</div>
                    <div className="column-2">Date Of Allocation</div>
                    <div className="column-2">Status</div>
                    <div className="column-2">Dispatch Id</div>
                    <div className="column-2">Dispatch Date</div>
                    <div className="column-2">Comments</div>
                    <div className="column-2">Dispatch</div>

                </div>
                {!this.state.allocates.length ? (
                    <div className="no-districts">Inventories not found</div>
                ) : (null)}
                {this.state.allocates.map((allocate, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{allocate.name}</div>
                            <div className="column-2">{allocate.unitsReceived}</div>
                            <div className="column-2">{allocate.unitsIssued}</div>
                            <div className="column-2">{allocate.balanceUnits}</div>
                            <div className="column-2">{allocate.name}</div>
                            <div className="column-2">{allocate.unitsReceived}</div>
                            <div className="column-2">{allocate.unitsIssued}</div>

                            <div className="column-2">

                                <button className="btn manage-district-btn"
                                    onClick={this.Allocate.bind(this, allocate._id)}>Dispatch
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
