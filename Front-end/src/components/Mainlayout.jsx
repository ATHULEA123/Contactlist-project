import React, { useState, useEffect } from "react";
import Header from "./Header";
import Tables from "./Tables";
import Footer from "./Footer";
import Form from "./Form";
import Deleteform from "./Deleteform";
import { fetchContacts } from "../components/redux/contactSlice";
import { useSelector, useDispatch } from "react-redux";

function Mainlayout() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [contactId, setContactId] = useState(null);
  const contacts = useSelector((state) => state.contacts.items);
  const [editingContact, setEditingContact] = useState(null);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.contacts.total);
  const totalPages = useSelector((state) => state.contacts.totalPages); // Total pages from Redux state
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10); // Default limit
  const [page, setPage] = useState(1); // Default page

  useEffect(() => {
    dispatch(fetchContacts({ page, limit, searchTerm }));
  }, [dispatch, page, limit, searchTerm]);

  const formVisible = (id) => {
    if (id) {
      const contactToEdit = contacts.find((contact) => contact._id === id);
      setEditingContact(contactToEdit);
    } else {
      setEditingContact(null);
    }
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
    setEditingContact(null);
  };

  const deleteformvisible = (id) => {
    setContactId(id);
    setVisible(true);
  };

  const hideDeleteForm = () => {
    setVisible(false);
  };

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };
  return (
    <>
    
      <Header
        formVisible={formVisible}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        limit={limit}
        setLimit={handleLimitChange}
        totalPages={total}
      />

      <Tables
        formVisible={formVisible}
        deleteformvisible={deleteformvisible}
        currentPage={page}
        limit={limit}
      />

      <Footer
        totalPages={totalPages}
        currentPage={page}
        limit={limit}
        onPageChange={handlePaginationChange}
      />

      {isFormVisible && <div className="overlay" onClick={hideForm}></div>}
      {isFormVisible && (
        <Form formVisible={hideForm} initialContactData={editingContact} />
      )}

      {visible && <div className="overlay" onClick={hideDeleteForm}></div>}
      {visible && (
        <Deleteform deleteformvisible={hideDeleteForm} contactId={contactId} />
      )}
    </>
  );
}

export default Mainlayout;
