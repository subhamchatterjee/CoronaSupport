import React, { Component } from 'react';
// import { apiBaseUrl } from './config.jsx'

export default class ManageMaterialsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: []
        }
    }

    componentDidMount() {
        this.getMaterials();
    }

    getMaterials = () => {
        fetch(process.env.REACT_APP_API_URL + '/materials', {
            method: 'GET'
        }).then(data => data.json())
            .then(data => {
                this.setState({ materials: data.materials });
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
                <h2 className="text-center">MANAGE MATERIALS PAGE</h2>
                <div className="heading">
                    <div className="column-1">Name of the material</div>
                    <div className="column-2">Manage Requirement and Fulfillment</div>
                    <div className="column-3">Edit Material Information</div>
                </div>
                {!this.state.materials.length ? (
                    <div className="no-materials">Material not found</div>
                ) : (null)}
                {this.state.materials.map((material, index) => {
                    return (
                        <div className="material-row" key={index}>
                            <div className="column-1">{material.name}</div>
                            <div className="column-2">
                                <button className="btn manage-material-btn"
                                    onClick={this.manageMaterial.bind(this, material._id)}>Manage
                                </button>
                            </div>
                            <div className="column-3">
                                <button className="btn edit-material-btn"
                                    onClick={this.editMaterial.bind(this, material._id)}>Edit
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
