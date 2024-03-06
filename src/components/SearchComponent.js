// SearchComponent.js

import React, { useState } from 'react';

const SearchComponent = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="mb-4" style={{width: '500px'}}>
        <input
            type="text"
            placeholder="Search for plant name..."
            value={searchQuery}
            onChange={handleInputChange}
            className='font-black rounded-md px-1 w-full'
        />
    </div>
  );
};

export default SearchComponent;
