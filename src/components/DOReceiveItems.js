import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'
import { authHeader } from '../helper/auth-header'


export default class DORecieveItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receive: []
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
                this.setState({ receive: data.data });
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
                <h2 className="text-center">RECEIVE ITEMS</h2>
                <div className="heading">
                    <div className="column-2">Dispatch Number</div>
                    <div className="column-2">Dispatch Date</div>
                    <div className="column-2">Items</div>
                    <div className="column-2">Units Dispatched</div>
                    <div className="column-2">Units Received</div>
                    <div className="column-2">Comments</div>
                    <div className="column-2">Received and added to stock</div>
                </div>
                {!this.state.receive.length ? (
                    <div className="no-districts">Requirement Listings not found</div>
                ) : (null)}
                {this.state.receive.map((received, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{received.dispatchNumber}</div>
                            <div className="column-2">{received.dispatchDate}</div>
                            <div className="column-2">{received.items}</div>
                            <div className="column-2">{received.unitsDipatched}</div>
                            <div className="column-2">{received.unitsReceived}</div>
                            <div className="column-2">{received.comments}</div>
                            <div className="column-2">{received.Recieved}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
