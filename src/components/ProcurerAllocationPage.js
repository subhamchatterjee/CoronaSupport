import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class ProcurerAllocationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allocations: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/allocations', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTcyMTkwMiwiZXhwIjoxNTg4MzEzOTAyfQ.dXALb-NgbO57Bo5iya3osu2FW73OnUfEdVFRRl4uijg',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({ allocations: data.data });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    procurerAllocation = (districtId) => {
        window.location.pathname = "/procurer-allocation/" + districtId;
    };

    render() {
        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE ALLOCATIONS PAGE</h2>
                <div className="heading">
                    <div className="column-2">Dispatched Id</div>
                    <div className="column-2">Dispatched Date</div>
                    <div className="column-2">Material</div>
                    <div className="column-2">Units</div>
                    <div className="column-2">Allocation Date</div>
                    <div className="column-2">Action</div>

                </div>



                {!this.state.allocations.length ? (
                    <div className="no-districts">Allocation Listings not found</div>
                ) : (null)}
                {this.state.allocations.map((allocation, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{allocation.dispatchId}</div>
                            <div className="column-2">{allocation.dispatchedDate}</div>
                            <div className="column-2">{allocation.material}</div>
                            <div className="column-2">{allocation.units}</div>
                            <div className="column-2">{allocation.allocationedDate}</div>
                            <div className="column-2">
                                <button className="btn manage-district-btn"
                                    onClick={this.procurerAllocation.bind(this, allocation._id)}>Manage
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
