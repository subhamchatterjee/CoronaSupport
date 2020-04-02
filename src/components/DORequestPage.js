import React, { Component } from 'react';
// import { process.env.REACT_APP_API_URL } from './config.jsx'
import { authHeader } from '../helper/auth-header'
import { apiBaseUrl } from './config.jsx'


export default class DORequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/api/v1/requirements', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlN2ZiNmZjODY5ZjExNmY0ZjljNTdkMSIsImlhdCI6MTU4NTYyOTc2MiwiZXhwIjoxNTg4MjIxNzYyfQ.0KhUsFtn73yNq712KVKuHHl4zKlF2Q5B1ODm1lLu03w',
                'Content-Type': 'application/json'
            }

        }).then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({ requests: data.data });
                // console.log(requests)
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
                {!this.state.requests.length ? (
                    <div className="no-districts">Request Listings not found</div>
                ) : (null)}
                {this.state.requests.map((request, index) => {
                    return (
                        <div className="district-row" key={index}>
                            <div className="column-2">{request.material}</div>
                            <div className="column-2">{request.required_qnty}</div>
                            <div className="column-2">{request.updatedAt}</div>
                            <div className="column-2">{request.status}</div>
                            <div className="column-2">{request.approved_qnty}</div>
                            <div className="column-2">{request.approvedAt}</div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
