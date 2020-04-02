import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class HaffkineAllocateItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Allocations: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/allocations', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                this.setState({ Allocations: data.data });

            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }


    Allocation = (districtId) => {
        window.location.pathname = "/procurer-order/" + districtId;
    };

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">Allocate Items</h2>
                <div className="heading">

                    <div className="column-2">Units</div>
                    <div className="column-2">Districts</div>
                    <div className="column-2">Date of Allocation</div>
                    <div className="column-2">Status</div>
                    <div className="column-2">Dispatch ID</div>
                    <div className="column-2">Dispatch Date</div>
                    <div className="column-2">Comments</div>
                    <div className="column-2">Dispatch</div>

                </div>
                {!this.state.Allocations.length ? (
                    <div className="no-districts">Inventories not found</div>
                ) : (null)}
                {this.state.Allocations.map((Allocation, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{Allocation.units}</div>
                            <div className="column-2">{Allocation.district}</div>
                            <div className="column-2">{Allocation.allocationedDate}</div>
                            <div className="column-2">{Allocation.status}</div>
                            <div className="column-2">{Allocation.dispatchId}</div>
                            <div className="column-2">{Allocation.dispatchedDate}</div>
                            <div className="column-2">{Allocation.comment}</div>
                            <div className="column-2">

                                <button className="btn manage-district-btn"
                                    onClick={this.Allocation.bind(this, Allocation._id)}>Dispatch
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
