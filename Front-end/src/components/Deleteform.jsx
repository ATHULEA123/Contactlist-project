import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact,fetchContacts } from '../components/redux/contactSlice'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function DeleteForm({ deleteformvisible, contactId }) {
  console.log(contactId);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        dispatch(fetchContacts()); // Refresh the contact list after deletion
        deleteformvisible(); // Hide the delete form after deletion
      })
      .catch((error) => {
        console.error('Failed to delete contact: ', error);
      });
  };

  return (
    <div>
      <div className='container delete_container'>
        <div className='deletepage'>
          <h2><FontAwesomeIcon className='warning_icons' icon={faTriangleExclamation} style={{ color: "red" }} />Delete Contact</h2>
          <p>Are you sure you want to delete this contact?</p>
          <div className='delete_btn'>
            <button className='btn_delete' onClick={handleDelete} >Yes</button>
            <button className='btn_delete cancel_btn' onClick={deleteformvisible}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteForm;
