import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchContacts } from "../components/redux/contactSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Tables({ formVisible, deleteformvisible, currentPage, limit }) {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // },[]);

  return (
    <div className="tables">
      <div className="container">
        <div className="card">
          <table className="tablecol">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{contact.firstname + " " + contact.lastname}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.gender}</td>
                  <td>{contact.email}</td>
                  <td>
                    <button
                      className="deletebtn"
                      onClick={() => deleteformvisible(contact._id)}
                    >
                      Delete
                      <FontAwesomeIcon className="icons" icon={faTrash} />
                    </button>
                    <button
                      className="deletebtn editbtn"
                      onClick={() => formVisible(contact._id)}
                    >
                      Edit
                      <FontAwesomeIcon className="icons" icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tables;
