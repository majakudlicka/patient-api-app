import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/fetchData.js';
import LoadingIndicator from 'react-loading-indicator';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class allPatients extends Component {
  constructor() {
    super();
    this.renderPatients = this.renderPatients.bind(this);
    this.onSubmitCriteria = this.onSubmitCriteria.bind(this);
    this.onCriteriaChange = this.onCriteriaChange.bind(this);
    this.onSubmitId = this.onSubmitId.bind(this);
    this.formatBirthDate = this.formatBirthDate.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchPatients = this.fetchPatients.bind(this);
    this.fetchAllPatients = this.fetchAllPatients.bind(this);

    this.state = {
      allPatients: [],
      searchTerm: '',
      patients: [],
      filteredPatients: null,
    };
  }

  componentWillMount() {
    this.fetchAllPatients();
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

  handlePageClick = data => {
    const patientsPerPage = 10;
    const page = data.selected;
    const startIndex = page * patientsPerPage;
    const endIndex = page * patientsPerPage + 10;
    const PatientsOnPage = this.state.Allpatients.slice(startIndex, endIndex);
    this.setState({patients: PatientsOnPage});
    // this.fetchPatients(page);
  };

  fetchPatients = (page = 1) => {
    axios
      .get('/patient', {params: {page: page}})
      .then(response => {
        this.setState({
          patients: response.data.content,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchAllPatients = () => {
    axios
      .get('/patient')
      .then(response => {
        this.setState({
          Allpatients: response.data.content,
          patients: response.data.content.slice(0, 10),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  filterPatients = searchTerm => {
    axios
      .get('/filteredPatient', {params: {lastName: searchTerm}})
      .then(response => {
        this.setState({filetredPatients: response.data.content});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.patients.length === 0) {
      return (
        <div className="flex-container">
          <LoadingIndicator />
        </div>
      );
    } else if (this.state.filteredPatients !== null) {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitCriteria}>
              <label>Search&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onCriteriaChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.filterPatients}>
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
              {this.state.filteredPatients.map(this.renderPatients)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="flex-container">
            <form onSubmit={this.onSubmitCriteria}>
              <label>Search&nbsp;&nbsp;</label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onCriteriaChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.filterPatients}>
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
              {this.state.patients.map(this.renderPatients)}
            </tbody>
          </table>
          <div className="flex-container">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={100}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              onPageChange={this.handlePageClick}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    patients: state.searchPatients.patients,
    filteredPatients: state.searchPatients.filteredPatients,
  };
}

export default connect(mapStateToProps, actions)(allPatients);
