import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class HaffkineReceivePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receives: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/v1/requestor/received-items', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTcyMTkwMiwiZXhwIjoxNTg4MzEzOTAyfQ.dXALb-NgbO57Bo5iya3osu2FW73OnUfEdVFRRl4uijg',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                this.setState({ receives: data.data });

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
                <h2 className="text-center">RECEIVE ITEMS</h2>
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
                {!this.state.receives.length ? (
                    <div className="no-districts">Order Listings not found</div>
                ) : (null)}
                {this.state.receives.map((receive, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{receive.orderId}</div>
                            <div className="column-2">{receive.Item}</div>
                            <div className="column-2">{receive.orderedUnits}</div>
                            <div className="column-2">{receive.orderedDate}</div>
                            <div className="column-2">{receive.expectedDate}</div>
                            <div className="column-2">{receive.funder}</div>
                            <div className="column-2">{receive.orderValue}</div>
                            <div className="column-2">{receive.comments}</div>
                            <div className="column-2">{receive.districtPreference}</div>
                            <div className="column-2">{receive.receiptStatus}</div>
                            <div className="column-2">{receive.dateOfReciept}</div>
                            <div className="column-2">{receive.unitsRecieved}</div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
