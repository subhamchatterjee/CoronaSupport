import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class AdminOrderPage extends Component {
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



    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE ORDERS PAGE</h2>
                <div className="heading">
                    <div className="column-2">Order ID</div>
                    <div className="column-2">Item</div>
                    <div className="column-2">Units Ordered</div>
                    <div className="column-2">Ordered Units</div>
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
                        <div className="district-row" key={index}>
                            <div className="column-2">{order.orderId}</div>
                            <div className="column-2">{order.Item}</div>
                            <div className="column-2">{order.orderedUnits}</div>
                            <div className="column-2">{order.orderedDate}</div>
                            <div className="column-2">{order.expectedDate}</div>
                            <div className="column-2">{order.funder}</div>
                            <div className="column-2">{order.orderValue}</div>
                            <div className="column-2">{order.comments}</div>
                            <div className="column-2">{order.districtPreference}</div>
                            <div className="column-2">{order.receiptStatus}</div>
                            <div className="column-2">{order.dateOfReciept}</div>
                            <div className="column-2">{order.unitsRecieved}</div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
