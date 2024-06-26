import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { fetchContacts } from './redux/contactSlice';
import { useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';

function Footer({ totalPages, currentPage, onPageChange, limit }) {
  const dispatch = useDispatch();

  const handlePageChange = (data) => {
    console.log( data.selected);
    const selectedPage = data.selected + 1;  // react-paginate uses zero-based index
    onPageChange(selectedPage);
    dispatch(fetchContacts({ page: selectedPage, limit, searchTerm: '' }));
  };

  useEffect(() => {
    dispatch(fetchContacts({ page: currentPage, limit, searchTerm: '' }));
  }, [currentPage, limit, dispatch]);

  return (
    <div className='footer'>
      <div className='container'>
     
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
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



