import React, { useState } from "react";

const Search = ({ items, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filteredItems = items.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    onSearch(filteredItems);
  };
  ////// comment  ///////////
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
