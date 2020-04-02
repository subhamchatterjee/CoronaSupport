import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'
import { authHeader } from '../helper/auth-header'


export default class DORequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirements: []
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/api/v1/requestor/received-items', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlN2ZiNmZjODY5ZjExNmY0ZjljNTdkMSIsImlhdCI6MTU4NTYyOTc2MiwiZXhwIjoxNTg4MjIxNzYyfQ.0KhUsFtn73yNq712KVKuHHl4zKlF2Q5B1ODm1lLu03w',
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

    render() {
        return (
            <div className="manage-districts-page">
                <h2 className="text-center">REQUEST ITEM </h2>
                <div className="heading">
                    <div className="column-2">Item</div>
                    <div className="column-2">Requested Unit</div>

                    <div className="column-2">Request Date</div>
                    <div className="column-2">Request Status</div>
                    <div className="column-2">Approved Units</div>
                    <div className="column-2">Approval Date</div>
                </div>
                {!this.state.requirements.length ? (
                    <div className="no-districts">Requirement Listings not found</div>
                ) : (null)}
                {this.state.requirements.map((requirement, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{requirement.material}</div>
                            <div className="column-2">{requirement.receivedUnits}</div>

                            <div className="column-2">{requirement.receivedDate}</div>
                            <div className="column-2">{requirement.status}</div>
                            <div className="column-2">{requirement.units}</div>
                            <div className="column-2">{requirement.allocationedDate}</div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
