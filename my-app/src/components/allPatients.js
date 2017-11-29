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

    this.state = {
      searchTerm: '',
      patients: [],
    };
  }

  componentWillMount() {
    this.fetchPatients();
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
    let page = data.selected + 1;
    console.log(page);
    this.fetchPatients(page);
  };

  fetchPatients = (page = 1) => {
    axios
      .get('/patient', {params: {page: page}})
      .then(response => {
        this.setState({patients: response.data.content});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let {patients, filteredPatients} = this.props;

    if (this.state.patients.length === 0) {
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
              {this.state.patients.map(this.renderPatients)}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={100}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            hrefBuilder={this.hrefBuilder}
          />
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

// <div class="container" id="content" />
// <ul className="pagination">
//   <li className="page-item">
//     <a className="page-link" href="?page=1">
//       1
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=2">
//       2
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=3">
//       3
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       4
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       5
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       6
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       7
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       8
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       9
//     </a>
//   </li>
//   <li className="page-item">
//     <a className="page-link" href="?page=4">
//       10
//     </a>
//   </li>
// </ul>
