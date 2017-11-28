import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';
import {Link} from 'react-router';

class patientById extends Component {
  constructor() {
    super();
    this.formatBirthDate = this.formatBirthDate.bind(this);
    this.renderPatient = this.renderPatient.bind(this);
  }

  componentWillMount() {
    this.props.fetchById(this.props.patientId);
  }

  formatBirthDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`;
  }

  renderPatient(patientData) {
    let formattedDateOfBirth;
    if (patientData && patientData.dateOfBirth) {
      console.log(patientData.dateOfBirth);
      formattedDateOfBirth = this.formatBirthDate(patientData.dateOfBirth);
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
            <th>Active: </th>
            <td>
              {patientData.active}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    let {patientData} = this.props;

    if (!patientData) {
      return (
        <div className="flex-container">
          <LoadingIndicator />
        </div>
      );
    } else {
      return (
        <div className="flex-container">
          {this.renderPatient(patientData)}
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.searchPatients.patientData);
  return {
    patientId: ownProps.params.id,
    patientData: state.searchPatients.patientData,
  };
}

export default connect(mapStateToProps, actions)(patientById);
