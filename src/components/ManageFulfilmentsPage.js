import moment from 'moment';
import Swal from 'sweetalert2';
import React, {Component} from 'react';
import {DatePicker, Select} from 'antd';
import {apiBaseUrl} from './config.jsx';
import enUS from 'antd/lib/locale-provider/en_US';

const {Option} = Select;
const readCookie = require('../cookie.js').readCookie;

moment.locale('en');

export default class ManageFulfilmentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirement: null,
            editFulfilment: null,
            selectedRequirement: null,
            showFulfilmentModal: false
        }
    }

    componentDidMount() {
        fetch(apiBaseUrl + '/requirement/' + this.props.match.params.requirementId, {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                let requirement = data.requirement;
                fetch(apiBaseUrl + '/fulfilments?requirement_id=' + this.props.match.params.requirementId, {
                    method: 'GET',
                    headers: {
                        'Auth': readCookie('access_token')
                    }
                }).then(data => data.json())
                    .then(data => {
                        requirement.fulfilments = data.fulfilments;
                        this.setState({requirement});
                    }).catch(err => {
                    console.log(err);
                    // Swal.fire(
                    //   'Oops!',
                    //   'An error occured! Please try again in sometime.',
                    //   'error'
                    // );
                });
            }).catch(err => {
            console.log(err);
        });
    }

    addFulfilment = () => {
        let valid = true, requirement = this.state.requirement;
        if (requirement.fulfilments.length) {
            if (!requirement.fulfilments[requirement.fulfilments.length - 1].date || !requirement.fulfilments[requirement.fulfilments.length - 1].units || !requirement.fulfilments[requirement.fulfilments.length - 1].status || !requirement.fulfilments[requirement.fulfilments.length - 1].fulfilled_by) valid = false;
        }

        if (valid) {
            requirement.fulfilments.push({
                _id: '0',
                date: '',
                units: '',
                status: '',
                fulfilled_by: ''
            });
            this.setState({requirement, editFulfilment: '0'});
        }
    };

    editFulfilment = (index, fulfilment_id) => {
        let requirement = this.state.requirement;
        requirement.fulfilments[index].date = moment(requirement.fulfilments[index].date, 'DD/MM/YYYY');
        this.setState({requirement, editFulfilment: fulfilment_id});
    };

    handleFulfilmentChange = (index, type, value) => {
        let requirement = this.state.requirement;
        if (value.target) value = value.target.value;
        if (type === 'units') value = parseInt(value);
        requirement.fulfilments[index][type] = value;
        this.setState({requirement});
    };

    saveFulfilment = (index, fulfilment) => {
        let fulfilmentObj = {
            date: fulfilment.date,
            units: fulfilment.units,
            status: fulfilment.status,
            fulfilled_by: fulfilment.fulfilled_by
        }, error = false, requirement = this.state.requirement;

        if (!fulfilment.date || !moment(fulfilment.date, 'DD/MM/YYYY').isValid()) error = 'date';
        else if (!fulfilment.units) error = 'units';
        else if (!fulfilment.status || ['Order Placed', 'Dispatched', 'Deployed'].indexOf(fulfilment.status) < 0) error = 'status';
        else if (!fulfilment.fulfilled_by) error = 'fulfilled_by';

        fulfilmentObj.requirement_id = requirement._id;
        fulfilmentObj.date = moment(fulfilmentObj.date).format('DD/MM/YYYY');
        if (!error) {
            let url = apiBaseUrl + '/update-fulfilment/' + fulfilment._id, method = 'PUT';
            if (parseInt(fulfilment._id) === 0) {
                method = 'POST';
                url = apiBaseUrl + '/add-fulfilment';
            }

            fetch(url, {
                method,
                headers: {
                    'Auth': readCookie('access_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fulfilmentObj)
            }).then(data => data.json())
                .then(data => {
                    fulfilment.date = fulfilmentObj.date;
                    requirement.fulfilments[index] = fulfilment;
                    this.setState({requirement, editFulfilment: null});
                    let title = 'Fulfilment successfully updated.';
                    if (parseInt(fulfilment._id) === 0) title = 'Fulfilment added successfully.';
                    Swal.fire({title, type: 'success'});
                }).catch(err => {
                console.log(err);
                fulfilment.date = '';
                requirement.fulfilments[index] = fulfilment;
                this.setState({requirement, editFulfilment: null});
                // Swal.fire(
                //   'Oops!',
                //   'An error occured! Please try again in sometime.',
                //   'error'
                // );
            });
        } else {
            if (error === 'date') Swal.fire('', 'Please select a correct Date', 'error');
            else if (error === 'units') Swal.fire('', 'Please enter correct fulfilled units', 'error');
            else if (error === 'status') Swal.fire('', 'Please select a correct Status', 'error');
            else if (error === 'fulfilled_by') Swal.fire('', 'Please enter correct fulfilled by value', 'error');
        }
    };

    render() {
        if (this.state.requirement !== null) {
            return (
                <div className="manage-single-material-page">
                    <h2 className="text-center">Manage Fulfilments Page</h2>
                    <h2 className="text-center">
                        {this.state.requirement.material + ' - ' + this.state.requirement.district + ' - ' + this.state.requirement.required_qnty + ' needed'}
                    </h2>
                    <div className="heading">
                        <div className="column-1">Date</div>
                        <div className="column-2">Units</div>
                        <div className="column-3">Fulfilled By</div>
                        <div className="column-4">Status</div>
                        <div className="column-5">EDIT / SAVE</div>
                    </div>
                    {!this.state.requirement.fulfilments.length ? (
                        <div className="no-materials">Fulfilments not found</div>
                    ) : (null)}
                    {this.state.requirement.fulfilments.map((fulfilment, index) => {
                        return (
                            <div className="material-row" key={index}>
                                {this.state.editFulfilment === fulfilment._id ? (
                                    <div className="column-1">
                                        <DatePicker locale={enUS} size="large" style={{width: "100%"}}
                                                    format="DD/MM/YYYY" value={fulfilment.date} type="date"
                                                    onChange={this.handleFulfilmentChange.bind(this, index, 'date')}/>
                                    </div>
                                ) : (
                                    <div className="column-1">{fulfilment.date}</div>
                                )}
                                {this.state.editFulfilment === fulfilment._id ? (
                                    <div className="column-2">
                                        <input className="form-control" type="number" value={fulfilment.units}
                                               onChange={this.handleFulfilmentChange.bind(this, index, 'units')}/>
                                    </div>
                                ) : (
                                    <div className="column-2">{fulfilment.units}</div>
                                )}
                                {this.state.editFulfilment === fulfilment._id ? (
                                    <div className="column-3">
                                        <input className="form-control" type="text" value={fulfilment.fulfilled_by}
                                               onChange={this.handleFulfilmentChange.bind(this, index, 'fulfilled_by')}/>
                                    </div>
                                ) : (
                                    <div className="column-3">{fulfilment.fulfilled_by}</div>
                                )}
                                {this.state.editFulfilment === fulfilment._id ? (
                                    <div className="column-4">
                                        <Select size="large" value={fulfilment.status}
                                                onChange={this.handleFulfilmentChange.bind(this, index, 'status')}
                                                style={{width: "100%"}}>
                                            <Option value="">Select Status</Option>
                                            <Option value="Order Placed">Order Placed</Option>
                                            <Option value="Dispatched">Dispatched</Option>
                                            <Option value="Deployed">Deployed</Option>
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="column-4">{fulfilment.status}</div>
                                )}
                                <div className="column-5">
                                    {this.state.editFulfilment === fulfilment._id ? (
                                        <button className="btn save-requirement-btn"
                                                onClick={this.saveFulfilment.bind(this, index, fulfilment)}>Save</button>
                                    ) : (
                                        <button className="btn edit-requirement-btn"
                                                disabled={this.state.editFulfilment}
                                                onClick={this.editFulfilment.bind(this, index, fulfilment._id)}>Edit</button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div className="add-district-container">
                        <button className="btn add-district-btn" onClick={this.addFulfilment}
                                disabled={this.state.editFulfilment}>
                            <i className="fa fa-plus"></i>
                            Add Fulfilment
                        </button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
