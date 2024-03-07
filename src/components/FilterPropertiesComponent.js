import React, { useState, useImperativeHandle, forwardRef } from 'react';

const FilterPropertiesComponent = forwardRef(({ onSortOrderChange }, ref) => {
  const [selectedProperty, setSelectedProperty] = useState('Alphabetically');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useImperativeHandle(ref, () => ({
    resetSelectedProperty() {
      setSelectedProperty('Alphabetically');
      onSortOrderChange('Alphabetically', sortOrder);
    },
  }));

  const handleChange = (event) => {
    const newSelectedProperty = event.target.value;
    setSelectedProperty(newSelectedProperty);
    onSortOrderChange(newSelectedProperty, sortOrder);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    onSortOrderChange(selectedProperty, newSortOrder);
  };

  return (
    <div className="flex justify-between items-center">
      <select id="model-select" value={selectedProperty} onChange={handleChange}>
        <option value="Alphabetically">Alphabetically</option>
        <option value="Energy Production">Energy Production</option>
        <option value="Energy After Ice Loss">Energy After Ice Loss</option>
        <option value="Capacity">Capacity</option>
        <option value="North to South">North to South</option>
        <option value="West to East">West to East</option>
      </select>
      <div className='flex mr-4 rounded-md hover-lightgray px-2'>
        <button onClick={handleSortOrderChange} className="mr-2">
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
        <img src="/assets/icons/sort-w.svg" alt="sorting icon"/>
      </div>
    </div>
  );
});

// Explicitly set a displayName for the component
FilterPropertiesComponent.displayName = 'FilterPropertiesComponent';

export default FilterPropertiesComponent;
