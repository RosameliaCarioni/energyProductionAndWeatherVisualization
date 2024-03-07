import React, { useState, useImperativeHandle, forwardRef } from 'react';

const FilterPropertiesComponent = forwardRef(({ onSortOrderChange }, ref) => {
  const [selectedProperty, setSelectedProperty] = useState('Alphabetically');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useImperativeHandle(ref, () => ({
    resetSelectedProperty() {
      // Ensure the setter function is correctly called within its scope
      setSelectedProperty('Alphabetically');
      onSortOrderChange('Alphabetically', sortOrder);
    },
  }));

  const handleChange = (event) => {
    const newSelectedProperty = event.target.value;
    setSelectedProperty(newSelectedProperty);
    // Trigger the sorting immediately upon changing the selection, using the current sortOrder
    onSortOrderChange(newSelectedProperty, sortOrder);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    onSortOrderChange(selectedProperty, newSortOrder); // Call the passed in function to lift the state up to the parent component
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
      <button onClick={handleSortOrderChange} className="ml-2">
        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
});

export default FilterPropertiesComponent;
