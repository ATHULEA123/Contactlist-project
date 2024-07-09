import React, { useState, useEffect, Suspense, useCallback } from "react";
import { fetchContacts } from "../components/redux/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import Lazyloading from "./Lazyloading";

const LazyHeader = React.lazy(() => import("./Header"));
const LazyTables = React.lazy(() => import("./Tables"));
const LazyFooter = React.lazy(() => import("./Footer"));
const LazyForm = React.lazy(() => import("./Form"));
const LazyDeleteForm = React.lazy(() => import("./Deleteform"));

function Mainlayout() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [contactId, setContactId] = useState(null);
  const contacts = useSelector((state) => state.contacts.items);
  const [editingContact, setEditingContact] = useState(null);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.contacts.total);
  const totalPages = useSelector((state) => state.contacts.totalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  

  const fetchMemoized = useCallback(() => {
    dispatch(fetchContacts({ page, limit, searchTerm }))
      .then((result) => {
        console.log(result);
      });
  }, [dispatch, page, limit, searchTerm]);

  useEffect(() => {
    fetchMemoized();
  }, [fetchMemoized]);

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
    if(newPage != page){
      setPage(newPage);
    }
   
  };

  const handleLimitChange = (newLimit) => {
    if(newLimit != limit){
      setLimit(newLimit);
      setPage(1);
    }
    
    
  };

  return (
    <>
      <Suspense fallback={<Lazyloading />}>
        <LazyHeader
          formVisible={formVisible}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          limit={limit}
          setLimit={handleLimitChange}
          totalPages={total}
        />

        <LazyTables
          formVisible={formVisible}
          deleteformvisible={deleteformvisible}
          currentPage={page}
          limit={limit}
        />

        <LazyFooter
          totalPages={totalPages}
          currentPage={page}
          limit={limit}
          onPageChange={handlePaginationChange}
        />

        {isFormVisible && <div className="overlay" onClick={hideForm}></div>}
        {isFormVisible && (
          <LazyForm formVisible={hideForm} initialContactData={editingContact} />
        )}

        {visible && <div className="overlay" onClick={hideDeleteForm}></div>}
        {visible && (
          <LazyDeleteForm deleteformvisible={hideDeleteForm} contactId={contactId} />
        )}
      </Suspense>
    </>
  );
}

export default Mainlayout;



