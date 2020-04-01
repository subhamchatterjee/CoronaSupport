import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'

export default class ProcurerRequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirements: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/requirement', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                this.setState({ requirements: data.districts });
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

    render() {
        return (
            <div className="manage-districts-page">
                <h2 className="text-center">MANAGE REQUEST PAGE</h2>
                <div className="heading">
                    <div className="column-2">Material Id</div>
                    <div className="column-2">District Id</div>
                    <div className="column-2">Required Quantity</div>
                    <div className="column-2">Action</div>
                </div>
                {!this.state.requirements.length ? (
                    <div className="no-districts">Districts not found</div>
                ) : (null)}
                {this.state.requirements.map((requirement, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{requirement.materialId}</div>
                            <div className="column-2">{requirement.districtId}</div>
                            <div className="column-2">{requirement.required_qnty}</div>
                            <div className="column-2">
                                <button className="btn manage-district-btn"
                                    onClick={this.procurerRequest.bind(this, requirement._id)}>Manage
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
