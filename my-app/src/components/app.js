import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';

class App extends Component {
  constructor() {
    super();
    this.renderPatients = this.renderPatients.bind(this);
    this.onSubmitCriteria = this.onSubmitCriteria.bind(this);
    this.onCriteriaChange = this.onCriteriaChange.bind(this);
    this.onSubmitId = this.onSubmitId.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  //Renders individual record
  renderPatients(patient) {
    return (
      <div className="patient" key={patient.identifiers[0].value}>
        <div className="row">
          {patient.lastName}
          {patient.firstName}
          {patient.dateOfBirth}
        </div>
      </div>
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

          <div>
            {filteredPatients.map(this.renderPatients)}
          </div>
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

          <div>
            {patients.map(this.renderPatients)}
          </div>
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

export default connect(mapStateToProps, actions)(App);
