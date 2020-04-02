import React, {Component} from 'react';
import {apiBaseUrl} from './config.jsx'
import { authHeader } from '../helpers';

export default class DhsRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: []
        }
    }

    componentDidMount() {
        this.getRequest();
    }

    getRequest = () => {
        fetch(apiBaseUrl + '/dhs_requirements', {
            method: 'GET',
            headers: authHeader()
        }).then(data => data.json())
            .then(data => {
                this.setState({materials: data.materials});
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
                {!this.state.materials.length ? (
                    <div className="no-materials"> Request not found</div>
                ) : (null)}
                {this.state.materials.map((material, index) => {
                    return (
                        <div className="material-row" key={index}>
                             <div className="column-2" >{item.name}</div>
                                <div className="column-2">{item.itemsRequested}</div>
                                <div className="column-2">{item.itemsApproved}</div>
                                <div className="column-2">{item.itemsReceived}</div>
                                <div className="column-2">{item.ordersPlaced}</div>
                                <div className="column-2">{item.ordersDispatched}</div>
                                <div className="column-2">{item.remainingRequirement}</div>
                                <div className="column-2">
                                    <button className="btn column-btn"
                                        onClick={this.viewHistory.bind(this, item._id)}>View
                                    </button>
                                </div>
                                <div className="column-2">{item.itemsReceivedOwnEffort}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
