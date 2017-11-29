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
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.formatBirthDate = this.formatBirthDate.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchAllPatients = this.fetchAllPatients.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.sortPatients = this.sortPatients.bind(this);
    this.onSortCriteriaChange = this.onSortCriteriaChange.bind(this);

    this.state = {
      allPatients: [],
      searchTerm: '',
      patients: [],
      filteredPatients: null,
      sortCriteria: '',
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

  onLastNameChange(evt) {
    this.setState(
      {
        searchTerm: evt.target.value,
      },
      () => {
        this.filterPatients(this.state.searchTerm);
      }
    );
  }

  handlePageClick = data => {
    const patientsPerPage = 10;
    const page = data.selected;
    const startIndex = page * patientsPerPage;
    const endIndex = page * patientsPerPage + 10;
    const PatientsOnPage = this.state.allPatients.slice(startIndex, endIndex);
    this.setState({patients: PatientsOnPage});
  };

  fetchAllPatients = () => {
    axios
      .get('/patient')
      .then(response => {
        this.setState({
          allPatients: response.data.content,
          patients: response.data.content.slice(0, 10),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  resetFilters = () => {
    this.setState({filteredPatients: null});
  };

  filterPatients = searchTerm => {
    let filteredPatients = this.state.allPatients.filter(patient => {
      return (
        patient.lastName.includes(searchTerm) ||
        patient.firstName.includes(searchTerm) ||
        patient.dateOfBirth.includes(searchTerm) ||
        patient.addresses[0].zipCode.includes(searchTerm)
      );
    });
    this.setState({
      filteredPatients: filteredPatients,
    });
  };

  sortPatients(evt) {
    evt.preventDefault();
    let sortedPatients;

    switch (this.state.sortCriteria) {
      case 'By Last Name Asc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0;
        });
        break;
      case 'By Last Name Desc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.lastName < b.lastName ? 1 : a.lastName > b.lastName ? -1 : 0;
        });
        break;
      case 'By First Name Asc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.firstName < b.firstName
            ? -1
            : a.firstName > b.firstName ? 1 : 0;
        });
        break;
      case 'By First Name Desc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.firstName < b.firstName
            ? 1
            : a.firstName > b.firstName ? -1 : 0;
        });
        break;
      case 'By DOB Asc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.dateOfBirth < b.dateOfBirth
            ? -1
            : a.dateOfBirth > b.dateOfBirth ? 1 : 0;
        });
        break;
      case 'By DOB Desc':
        sortedPatients = this.state.allPatients.sort((a, b) => {
          return a.dateOfBirth < b.dateOfBirth
            ? 1
            : a.dateOfBirth > b.dateOfBirth ? -1 : 0;
        });
        break;
    }

    this.setState({
      allPatients: sortedPatients,
      patients: sortedPatients.slice(0, 10),
    });
  }

  onSortCriteriaChange(evt) {
    this.setState({
      sortCriteria: evt.target.value,
    });
  }

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
            <form>
              <label>
                Search (last Name, first Name, DOB or zip code)&nbsp;&nbsp;
              </label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onLastNameChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.resetFilters}>
              Reset
            </button>
          </div>

          <div className="flex-container">
            <form>
              <label>Sort&nbsp;&nbsp;</label>
              <input list="sorting_options">
                <datalist>
                  <option value="Last Name Asc" />
                  <option value="Last Name Desc" />
                  <option value="First Name Asc" />
                  <option value="First Name Desc" />
                  <option value="DOB Asc" />
                  <option value="DOB Desc" />
                </datalist>
              </input>
            </form>

            <button type="submit" onClick={this.sortPatients}>
              Submit
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
              <label>
                Search (last Name, first Name, DOB or zip code)&nbsp;&nbsp;
              </label>
              <input
                id="Search Title"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onLastNameChange}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            </form>

            <button type="submit" onClick={this.resetFilters}>
              Reset
            </button>
          </div>

          <div className="flex-container">
            <form>
              <label>
                Sort by:&nbsp;&nbsp;
                <input
                  list="sorting_options"
                  value={this.state.sortCriteria}
                  onChange={this.onSortCriteriaChange}
                />&nbsp;&nbsp;
              </label>
              <datalist id="sorting_options">
                <option value="By Last Name Asc" />
                <option value="By Last Name Desc" />
                <option value="By First Name Asc" />
                <option value="By First Name Desc" />
                <option value="By DOB Asc" />
                <option value="By DOB Desc" />
              </datalist>
            </form>

            <button type="submit" onClick={this.sortPatients}>
              Submit
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
              previousLabel={'Previous'}
              nextLabel={'Next'}
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
