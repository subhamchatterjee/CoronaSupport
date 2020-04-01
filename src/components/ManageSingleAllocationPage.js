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
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
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

    handleReqChange = (index, type, value) => {
        let district = this.state.district;
        if (value.target) value = parseInt(value.target.value);
        district.allocations[index][type] = value;
        this.setState({ district });
    };

    saveAllocation = () => {

    };

    editAllocation = (req_id) => {
        this.setState({ editAllocation: req_id });
    };

    addAllocation = () => {
        let valid = true, district = this.state.district;
        if (district.allocations.length) {
            if (!district.allocations[district.allocations.length - 1].material || !district.allocations[district.allocations.length - 1].units) valid = false;
        }

        if (valid) {
            district.allocations.push({
                district: '',
                dispatchedDate: '',
                material: '',
                units: '',
                allocationedDate: ''
            });

            this.setState({ district, editAllocation: '0' });
        }
    };


    render() {
        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE ALLOCATIONS PAGE</h2>
                <div className="heading">
                    <div className="column-2">District</div>
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
                            <div className="column-2">
                                <input className="form-control" type="text" value={allocation.district}
                                    onChange={this.handleReqChange.bind(this, index, 'district')} />
                            </div>

                            <div className="column-2">
                                <input className="form-control" type="text" value={allocation.dispatchedDate}
                                    onChange={this.handleReqChange.bind(this, index, 'dispatchedDate')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={allocation.material}
                                    onChange={this.handleReqChange.bind(this, index, 'material')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="number" value={allocation.units}
                                    onChange={this.handleReqChange.bind(this, index, 'units')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={allocation.allocationedDate}
                                    onChange={this.handleReqChange.bind(this, index, 'allocationedDate')} />
                            </div>

                            <div className="column-2">
                                {this.state.editAllocation === allocation._id ? (
                                    <button className="btn save-requirement-btn"
                                        onClick={this.saveAllocation.bind(this, allocation)}>Save</button>
                                ) : (
                                        <button className="btn edit-requirement-btn"
                                            disabled={this.state.editAllocation}
                                            onClick={this.editAllocation.bind(this, allocation._id)}>Edit</button>
                                    )}
                            </div>
                        </div>

                    )
                })}
                <div className="add-material-container">
                    <button className="btn add-material-btn" onClick={this.addAllocation}
                        disabled={this.state.editAllocation}>
                        <i className="fa fa-plus"></i>
                            Add Allocation
                        </button>
                </div>
            </div>
        );
    }
}
