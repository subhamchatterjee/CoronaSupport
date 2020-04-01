import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class ProcurerOrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
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

    procurerOrder = (districtId) => {
        window.location.pathname = "/procurer-order/" + districtId;
    };

    handleReqChange = (index, type, value) => {
        let district = this.state.district;
        if (value.target) value = parseInt(value.target.value);
        district.orders[index][type] = value;
        this.setState({ district });
    };

    saveOrder = () => {

    };

    editOrder = (req_id) => {
        this.setState({ editOrder: req_id });
    };
    addOrder = () => {
        let valid = true, district = this.state.district;
        if (district.orders.length) {
            if (!district.orders[district.orders.length - 1].material || !district.orders[district.orders.length - 1].orderedUnits) valid = false;
        }

        if (valid) {
            district.orders.push({
                orderId: '',
                district: '',
                material: '',
                orderedUnits: '',
                orderedDate: '',
                receivedUnits: '',
                amount: '',
                status: ''
            });

            this.setState({ district, editAllocation: '0' });
        }
    };

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE ORDERS PAGE</h2>
                <div className="heading">
                    <div className="column-2">Order ID</div>
                    <div className="column-2">District</div>
                    <div className="column-2">Material Name</div>
                    <div className="column-2">Ordered Units</div>
                    <div className="column-2">Ordered Date</div>
                    <div className="column-2">Received Units</div>
                    <div className="column-2">Amount</div>
                    <div className="column-2">Status</div>
                    <div className="column-2">Action</div>
                </div>
                {!this.state.orders.length ? (
                    <div className="no-districts">Order Listings not found</div>
                ) : (null)}
                {this.state.orders.map((order, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.orderId}
                                    onChange={this.handleReqChange.bind(this, index, 'orderId')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.district}
                                    onChange={this.handleReqChange.bind(this, index, 'district')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.material}
                                    onChange={this.handleReqChange.bind(this, index, 'material')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.orderedUnits}
                                    onChange={this.handleReqChange.bind(this, index, 'orderId')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.orderedDate}
                                    onChange={this.handleReqChange.bind(this, index, 'orderedDate')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.receivedUnits}
                                    onChange={this.handleReqChange.bind(this, index, 'receivedUnits')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.amount}
                                    onChange={this.handleReqChange.bind(this, index, 'amount')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={order.status}
                                    onChange={this.handleReqChange.bind(this, index, 'status')} />
                            </div>


                            <div className="column-2">
                                {this.state.editOrder === order._id ? (
                                    <button className="btn save-requirement-btn"
                                        onClick={this.saveOrder.bind(this, order)}>Save</button>
                                ) : (
                                        <button className="btn edit-requirement-btn"
                                            disabled={this.state.editOrder}
                                            onClick={this.editOrder.bind(this, order._id)}>Edit</button>
                                    )}
                            </div>
                        </div>
                    )
                })}
                <div className="add-material-container">
                    <button className="btn add-material-btn" onClick={this.addOrder}
                        disabled={this.state.editOrder}>
                        <i className="fa fa-plus"></i>
                            Add Order
                        </button>
                </div>
            </div>
        );
    }
}
