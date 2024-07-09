import React from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Footer({ totalPages, currentPage, onPageChange, limit }) {
  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1;  // react-paginate uses zero-based index
    onPageChange(selectedPage);
  };

  return (
    <div className='footer'>
      <div className='container'>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={limit}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          // forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
}

export default Footer;




