import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'
import { authHeader } from '../helper/auth-header'


export default class ProcurerRequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirements: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/requirements', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTcyMTkwMiwiZXhwIjoxNTg4MzEzOTAyfQ.dXALb-NgbO57Bo5iya3osu2FW73OnUfEdVFRRl4uijg',
                'Content-Type': 'application/json'
            }

        }).then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({ requirements: data.data });
                // console.log(requirements)
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    procurerRequest = (districtId) => {
        window.location.pathname = "/procurer-request/" + districtId;
    };




    handleReqChange = (index, type, value) => {
        let district = this.state.district;
        if (value.target) value = parseInt(value.target.value);
        district.requirements[index][type] = value;
        this.setState({ district });
    };

    saveRequirment = () => {

    };

    editRequirment = (req_id) => {
        this.setState({ editAllocation: req_id });
    };
    render() {
        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE REQUEST PAGE</h2>
                <div className="heading">
                    <div className="column-2">District</div>
                    <div className="column-2">Material</div>

                    <div className="column-2">Min Price</div>
                    <div className="column-2">Max Price</div>
                    <div className="column-2">Required Quantity</div>
                    <div className="column-2">Action</div>
                </div>
                {!this.state.requirements.length ? (
                    <div className="no-districts">Requirement Listings not found</div>
                ) : (null)}
                {this.state.requirements.map((requirement, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">
                                <input className="form-control" type="text" value={requirement.district}
                                    onChange={this.handleReqChange.bind(this, index, 'district')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={requirement.material}
                                    onChange={this.handleReqChange.bind(this, index, 'material')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={requirement.unit_min_price}
                                    onChange={this.handleReqChange.bind(this, index, 'unit_min_price')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={requirement.unit_max_price}
                                    onChange={this.handleReqChange.bind(this, index, 'unit_max_price')} />
                            </div>
                            <div className="column-2">
                                <input className="form-control" type="text" value={requirement.required_qnty}
                                    onChange={this.handleReqChange.bind(this, index, 'required_qnty')} />
                            </div>

                            <div className="column-2">
                                {this.state.editRequirment === requirement._id ? (
                                    <button className="btn save-requirement-btn"
                                        onClick={this.saveRequirment.bind(this, requirement)}>Save</button>
                                ) : (
                                        <button className="btn edit-requirement-btn"
                                            disabled={this.state.editRequirment}
                                            onClick={this.editRequirment.bind(this, requirement._id)}>Edit</button>
                                    )}
                            </div>
                        </div>
                    )
                })}

            </div>
        );
    }
}
