// import React, { Component } from 'react';
// import { apiBaseUrl } from './config.jsx'

// export default class HaffkineAllocateItems extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             Allocations: []
//         }
//     }

//     componentDidMount() {
//         fetch(apiBaseUrl + '/api/v1/allocations', {
//             method: 'GET',
//             // headers: authHeader,
//             headers: {
//                 'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
//                 'Content-Type': 'application/json'
//             }
//         }).then(data => data.json())
//             .then(data => {
//                 this.setState({ Allocations: data.data });

//             }).catch(err => {
//                 console.log(err);
//                 // Swal.fire(
//                 //   'Oops!',
//                 //   'An error occured! Please try again in sometime.',
//                 //   'error'
//                 // );
//             });
//     }


//     Allocation = (districtId) => {
//         window.location.pathname = "/procurer-order/" + districtId;
//     };

//     render() {

//         return (
//             <div className="manage-districts-page">
//                 <h2 className="text-center">Allocate Items</h2>
//                 <div className="heading">

//                     <div className="column-2">Units</div>
//                     <div className="column-2">Districts</div>
//                     <div className="column-2">Date of Allocation</div>
//                     <div className="column-2">Status</div>
//                     <div className="column-2">Dispatch ID</div>
//                     <div className="column-2">Dispatch Date</div>
//                     <div className="column-2">Comments</div>
//                     <div className="column-2">Dispatch</div>

//                 </div>
//                 {!this.state.Allocations.length ? (
//                     <div className="no-districts">Inventories not found</div>
//                 ) : (null)}
//                 {this.state.Allocations.map((Allocation, index) => {
//                     return (
//                         <div className="district-row" key={index}>
//                             <div className="column-2">{Allocation.units}</div>
//                             <div className="column-2">{Allocation.district}</div>
//                             <div className="column-2">{Allocation.allocationedDate}</div>
//                             <div className="column-2">{Allocation.status}</div>
//                             <div className="column-2">{Allocation.dispatchId}</div>
//                             <div className="column-2">{Allocation.dispatchedDate}</div>
//                             <div className="column-2">{Allocation.comment}</div>
//                             <div className="column-2">

//                                 <button className="btn manage-district-btn"
//                                     onClick={this.Allocation.bind(this, Allocation._id)}>Dispatch
//                                 </button>
//                             </div>

//                         </div>
//                     )
//                 })}
//             </div>
//         );
//     }
// }



import moment from 'moment';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import React, { Component } from 'react';
import { authHeader } from '../helper/auth-header';
import { apiBaseUrl } from './config.jsx'

const { Option } = Select;
const readCookie = require('../cookie.js').readCookie;

export default class HaffkineAllocateItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            Inventory: [],
            materials: [],
            districts: [],
            newRequestId: null
        }
    }



    // Inventories = (districtId) => {
    //     window.location.pathname = "/procurer-order/" + districtId;
    // };



    componentDidMount() {
        this.getRequests();



        fetch(apiBaseUrl + '/api/v1/overview', {
            method: 'GET',
            // headers: authHeader,
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OWNjNzkwZmM0NTk5MDQ5NWQyZiIsImlhdCI6MTU4NTY3NDc3OSwiZXhwIjoxNTg4MjY2Nzc5fQ.kOoJ5fAuGq2Z8ywy4gMaHoxvdAwoYK5fqx7cbG9ffos',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                if (data.status === 'ok') {
                    this.setState({ districts: data.data });
                }
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    getRequests = () => {
        fetch(apiBaseUrl + '/api/v1/allocations', {
            // method: 'GET',
            // headers: {
            //     'Auth': readCookie('access_token')
            // }
            method: 'GET',
            headers: {
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODM3OTNmNzkwZmM0NTk5MDQ5NWQyZSIsImlhdCI6MTU4NTY3NDgwMSwiZXhwIjoxNTg4MjY2ODAxfQ.8Vh83pZiHERA04EbOwb_MAV2-kLBQcLoBh58SJ_z2EA',
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then(data => {
                if (data.status === 'ok') this.setState({ requests: data.data, newRequestId: null });
            }).catch(err => {
                console.log(err);
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
    }

    addRequest = () => {
        let requests = this.state.requests;
        requests.unshift({
            _id: '0',
            materialId: '',
            units: '',
            comment: ''
            // districtId: this.props.userData.districts[0]._id
        });

        this.setState({ requests, newRequestId: '0' });
    }

    handleNewReqChange = (index, type, value) => {
        let requests = this.state.requests;
        if (type === 'units') value = parseInt(value.target.value);
        if (type === 'comment') value = value.target.value;
        requests[index][type] = value;
        this.setState({ requests });
    }

    saveRequest = () => {
        let request = {
            materialId: this.state.requests[0].materialId,
            units: this.state.requests[0].units,
            comment: this.state.requests[0].comment
            // districtId: this.state.requests[0].districtId
        }, error = false;

        if (!this.state.requests[0].materialId) error = 'material';
        else if (!this.state.requests[0].units) error = 'units';
        else if (!this.state.requests[0].comment) error = 'comment';

        if (!error) {
            fetch(apiBaseUrl + '/api/v1/allocations', {
                method: 'POST',
                headers: {
                    'Auth': readCookie('access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }).then(data => data.json())
                .then(data => {
                    this.setState({ newRequestId: null });
                    this.getRequests();
                    Swal.fire({ title: 'Request successfully added.', type: 'success' });
                }).catch(err => {
                    console.log(err);
                    this.setState({ newRequestId: null });
                    // Swal.fire(
                    //   'Oops!',
                    //   'An error occured! Please try again in sometime.',
                    //   'error'
                    // );
                });
        } else {
            if (error === 'material') Swal.fire('', 'Please select a correct Material', 'error');
            else if (error === 'units') Swal.fire('', 'Please enter correct requested units', 'error');
        }
    }

    render() {

        return (
            <div className="manage-districts-page">
                <h2 className="text-center">VIEW ALLOCATION ITEMS</h2>
                <div className="table-buttons" >
                    {this.state.newRequestId ? (
                        <button className="btn save-button" onClick={this.saveRequest}>
                            <i className="fas fa-check"></i>Save Allocation
                        </button>
                    ) : (
                            <button className="btn btn-alt add-button" onClick={this.addRequest}>
                                <i className="fas fa-plus"></i>Add Allocation
                            </button>
                        )}
                </div>
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
                {!this.state.requests.length ? (
                    <div className="no-district">Requested Items not found</div>
                ) : (null)}
                {this.state.requests.map((request, index) => {
                    return (
                        <div className="district-row" key={index}>

                            <div className="column column-2">
                                {this.state.newRequestId === request._id ? (
                                    <input className="form-control" type="number" value={request.units} onChange={this.handleNewReqChange.bind(this, index, 'units')} placeholder="Enter Requested Units" />
                                ) : request.units}
                            </div>
                            <div className="column-2">
                                {this.state.newRequestId === request._id ? (

                                    <Select showSearch size="large" value={this.state.district} onChange={this.districtChange}
                                        style={{ width: 150 }}>
                                        <Option value="">All</Option>
                                        {this.state.districts.map(function (district, index) {
                                            return (
                                                <Option value={district.name} key={index}>{district.name}</Option>
                                            )
                                        })}
                                    </Select>

                                ) : request.district}
                            </div>
                            <div className="column column-2">{moment(request.allocationedDate).format('DD/MM/YYYY')}</div>
                            <div className="column column-2">{request.status}</div>
                            <div className="column column-2">{request.dispatchId}</div>
                            <div className="column column-2">{moment(request.dispatchedDate).format('DD/MM/YYYY')}</div>
                            <div className="column column-2">
                                {this.state.newRequestId === request._id ? (
                                    <input className="form-control" type="text" value={request.comment} onChange={this.handleNewReqChange.bind(this, index, 'comment')} placeholder="Enter comment" />
                                ) : request.comment}
                            </div>


                            <div className="column-2">

                                <button className="btn manage-district-btn"
                                >Allocate
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        );
    }
}
