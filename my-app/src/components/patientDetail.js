import React, {Component} from 'react';
import LoadingIndicator from 'react-loading-indicator';
import {Link} from 'react-router';
import axios from 'axios';

class patientById extends Component {
  constructor() {
    super();
    this.formatBirthDate = this.formatBirthDate.bind(this);
    this.renderPatient = this.renderPatient.bind(this);
    this.fetchById = this.fetchById.bind(this);

    this.state = {
      patientData: {},
    };
  }

  componentWillMount() {
    this.fetchById(this.props.params.id);
  }

  formatBirthDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`;
  }

  fetchById(id) {
    axios
      .get(`/patient/${id}`)
      .then(response => this.setState({patientData: response.data}))
      .catch(err => {
        console.log(err);
      });
  }

  renderPatient(patientData) {
    let formattedDateOfBirth;
    let zipCode;
    let phone;

    if (patientData && patientData.dateOfBirth) {
      formattedDateOfBirth = this.formatBirthDate(patientData.dateOfBirth);
    }

    if (patientData && patientData.addresses) {
      zipCode = patientData.addresses[0].zipCode;
    }

    if (patientData && patientData.telecoms) {
      phone = patientData.telecoms[0].value;
    }

    return (
      <table className="table_individual_patient">
        <tbody>
          <tr>
            <th>Title: </th>
            <td>
              {patientData.prefix}
            </td>
          </tr>
          <tr>
            <th>First Name: </th>
            <td>
              {patientData.firstName}
            </td>
          </tr>
          <tr>
            <th>Last Name: </th>
            <td>
              {patientData.lastName}
            </td>
          </tr>
          <tr>
            <th>Date of Birth: </th>
            <td>
              {formattedDateOfBirth}
            </td>
          </tr>
          <tr>
            <th>Gender: </th>
            <td>
              {patientData.gender}
            </td>
          </tr>
          <tr>
            <th>Zip code: </th>
            <td>
              {zipCode}
            </td>
          </tr>
          <tr>
            <th>Contant phone: </th>
            <td>
              {phone}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    if (this.state.patientData.length === 0) {
      return (
        <div className="flex-container">
          <LoadingIndicator />
        </div>
      );
    } else {
      return (
        <div className="flex-container">
          {this.renderPatient(this.state.patientData)}
        </div>
      );
    }
  }
}

export default patientById;
