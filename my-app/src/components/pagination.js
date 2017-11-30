import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
const pageCount = 100;
const pageRangeDisplayed = 5;
const marginPagesDisplayed = 2;

class Pagination extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="flex-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          onPageChange={this.props.onPageChange}
        />
      </div>
    );
  }
}

export default Pagination;
