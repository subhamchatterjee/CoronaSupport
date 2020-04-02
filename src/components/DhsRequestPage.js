import React, { Component } from 'react';
import { apiBaseUrl } from './config.jsx'


export default class DhsRequestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dhsrequests: []
        }
    }

    componentDidMount() {
        this.getRequest();
    }

    getRequest = () => {
        fetch(apiBaseUrl + '/api/v1/requirements', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                this.setState({ dhsrequests: data.data });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    };

    editMaterial = (materialId) => {
        window.location.pathname = "/edit-material/" + materialId;
    };

    manageMaterial = (materialId) => {
        window.location.pathname = "/manage-material/" + materialId;
    };

    render() {
        return (
            <div className="manage-materials-page">
                <h2 className="text-center">MANAGE REQUESTS</h2>
                <div className="heading">
                    <div className="column-2">Item</div>
                    <div className="column-2">Requested Unit</div>
                    <div className="column-2">Requested Date</div>
                    <div className="column-2">Requested Status</div>
                    <div className="column-2">Approved Units</div>
                    <div className="column-2">District</div>
                    <div className="column-2">Approve</div>
                </div>
                {!this.state.dhsrequests.length ? (
                    <div className="no-materials"> Request not found</div>
                ) : (null)}
                {this.state.dhsrequests.map((item, index) => {
                    return (
                        <div className="material-row" key={index}>
                            <div className="column-2" >{item.material}</div>
                            <div className="column-2">{item.required_qnty}</div>
                            <div className="column-2">{item.approvedAt}</div>

                            <div className="column-2">{item.status}</div>
                            <div className="column-2">{item.approved_qnty}</div>
                            <div className="column-2">{item.district}</div>

                            <div className="column-2">
                                <button className="btn column-btn"
                                >Approve
                                    </button>
                            </div>

                        </div>

                    )
                })
                }
            </div >
        );
    }
}
