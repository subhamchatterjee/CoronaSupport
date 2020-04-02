import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class HaffkineViewInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Inventory: []
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
                this.setState({ Inventory: data.data });
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


    Inventories = (districtId) => {
        window.location.pathname = "/procurer-order/" + districtId;
    };

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">VIEW INVENTORY</h2>
                <div className="heading">

                    <div className="column-2">Item</div>
                    <div className="column-2">Units Received</div>
                    <div className="column-2">Units Issued</div>
                    <div className="column-2">Balance Units</div>
                    <div className="column-2">Issue Units</div>

                </div>
                {!this.state.Inventory.length ? (
                    <div className="no-districts">Inventories not found</div>
                ) : (null)}
                {this.state.Inventory.map((Inventories, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{Inventories.name}</div>
                            <div className="column-2">{Inventories.unitsReceived}</div>
                            <div className="column-2">{Inventories.unitsIssued}</div>
                            <div className="column-2">{Inventories.balanceUnits}</div>
                            <div className="column-2">

                                <button className="btn manage-district-btn"
                                    onClick={this.Inventories.bind(this, Inventories._id)}>Allocate
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
