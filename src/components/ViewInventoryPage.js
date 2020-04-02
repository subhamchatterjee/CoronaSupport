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

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center"> VIEW INVENTORY</h2>
                <div className="heading">
                    <div className="column-2">Order ID</div>
                    <div className="column-2">Item</div>
                    <div className="column-2">Units Ordered </div>
                    <div className="column-2">Units Issued </div>
                    <div className="column-2">Balance Units</div>
                    
                </div>
                {!this.state.orders.length ? (
                    <div className="no-districts">Order Listings not found</div>
                ) : (null)}
                {this.state.orders.map((order, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{order.orderId}</div>
                            <div className="column-2">{order.district}</div>
                            <div className="column-2">{order.material}</div>
                            <div className="column-2">{order.orderedUnits}</div>
                            <div className="column-2">{order.orderedDate}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}