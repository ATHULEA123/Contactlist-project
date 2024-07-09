import React, { useState, useEffect } from "react";

function Header({
  formVisible,
  searchTerm,
  setSearchTerm,
  limit,
  setLimit,
  totalPages,
}) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e) => {
    setDebouncedSearchTerm(e.target.value.trim());
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    console.log(totalPages);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(debouncedSearchTerm);
    }, 500); //500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className="header">
      <div className="container">
        <div className="mainsection">
          <button className="btn" onClick={formVisible}>
            Create
          </button>
          <div className="main">
            <h1>CONTACT LIST</h1>
          </div>
          <div className="searchbar">
            <select
              className="form-select selct"
              aria-label="select example"
              id="floatingselect"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <span id="totalemployeee"> OF {totalPages}</span>
            <input
              className="search"
              name="myInput"
              placeholder="search here"
              value={debouncedSearchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

