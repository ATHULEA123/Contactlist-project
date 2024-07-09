import React, { useState, useEffect } from "react";
import "./style.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  addContact,
  fetchContacts,
  updateContact,
} from "../components/redux/contactSlice";

const Form = ({ formVisible, initialContactData }) => {

  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    salutation: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "Male",
  });

  useEffect(() => {
    if (initialContactData) {
      setContact(initialContactData);
    }
  }, [initialContactData]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialContactData) {
     
      dispatch(
        updateContact({ id: initialContactData._id, updatedContact: contact })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchContacts());
          formVisible(); // Close the form after successful update
        })
        .catch((error) => {
          console.error("Failed to update contact: ", error);
        });
    } else {
      dispatch(addContact(contact))
        .unwrap()
        .then(() => {
          dispatch(fetchContacts());
          formVisible(); 
          <Popup onClick={handleSubmit} position="right center">
          <div>Popup content here !!</div>
        </Popup>// Close the form after successful creation
        })
        .catch((error) => {
          console.error("Failed to save contact: ", error);
        });
       
    }
  };

  return (
    <section className="form_container">
      <header>
        Form
        <FontAwesomeIcon
          className="close_icon"
          onClick={formVisible}
          icon={faXmark}
        />
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="column">
          <div className="input-box">
            <label>Salutation</label>
            <select
              name="salutation"
              value={contact.salutation}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mr.s</option>
              <option value="Miss">Ms.</option>
              <option value="Miss">Dr.</option>
            </select>
          </div>
          <div className="input-box">
            <label>First Name</label>
            <input
              required
              placeholder="Enter first name"
              type="text"
              name="firstname"
              value={contact.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Last Name</label>
            <input
              required
              placeholder="Enter last name"
              type="text"
              name="lastname"
              value={contact.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input
              required
              placeholder="Enter phone number"
              type="number"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Email</label>
            <input
              required
              placeholder="Enter email"
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="gender-box">
          <label>Gender</label>
          <div className="gender-option">
            <div className="gender">
              <input
                name="gender"
                value="Male"
                checked={contact.gender === "Male"}
                onChange={handleChange}
                id="check-male"
                type="radio"
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input
                name="gender"
                value="Female"
                checked={contact.gender === "Female"}
                onChange={handleChange}
                id="check-female"
                type="radio"
              />
              <label htmlFor="check-female">Female</label>
            </div>
          </div>
        </div>
        <div className="submit_button">
          <button className="btn">Submit</button>
        </div>
      </form>
    </section>
    
  );
};

export default Form;
