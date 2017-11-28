import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';
import {Link} from 'react-router';

class allPatients extends Component {
  constructor() {
    super();
    this.renderPatients = this.renderPatients.bind(this);
    this.onSubmitCriteria = this.onSubmitCriteria.bind(this);
    this.onCriteriaChange = this.onCriteriaChange.bind(this);
    this.onSubmitId = this.onSubmitId.bind(this);
    this.formatBirthDate = this.formatBirthDate.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  formatBirthDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`;
  }

  //Renders individual record
  renderPatients(patient) {
    let formattedDateOfBirth = this.formatBirthDate(patient.dateOfBirth);
    return (
      <tr key={patient.identifiers[0].value}>
        <td>
          <Link to={`/patient/${patient.identifiers[0].value}`}>
            {patient.lastName}
          </Link>
        </td>
        <td>
          <Link to={`/patient/${patient.identifiers[0].value}`}>
            {patient.firstName}
          </Link>
        </td>
        <td>
          {formattedDateOfBirth}
        </td>
      </tr>
      // </Link>
    );
  }

  onSubmitCriteria(evt) {
    evt.preventDefault();
    this.props.filterPatients(this.state.searchTerm);
  }

  onSubmitId(evt) {
    evt.preventDefault();
    this.props.selectId(this.state.selectedSeason);
  }

  onCriteriaChange(evt) {
    this.setState(
      {
        searchTerm: evt.target.value,
      },
      () => {
        this.props.filterPatients(this.state.searchTerm);
      }
    );
  }

  render() {
    let {patients, filteredPatients} = this.props;

    if (!patients) {
      return (
        <div className="flex-container">
          <LoadingIndicator />
        </div>
      );
    } else if (filteredPatients.length > 0) {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitCriteria}>
              <label className="brown_title">Search&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onCriteriaChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.props.fetchPatients}>
              Refresh
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(this.renderPatients)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitCriteria}>
              <label className="brown_title">Search&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onCriteriaChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.props.fetchPatients}>
              Refresh
            </button>
          </div>

          <table className="table_all_patients">
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(this.renderPatients)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state.searchPatients);
  return {
    patients: state.searchPatients.patients,
    filteredPatients: state.searchPatients.filteredPatients,
  };
}

export default connect(mapStateToProps, actions)(allPatients);
