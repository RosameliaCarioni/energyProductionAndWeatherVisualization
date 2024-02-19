import React, { useState } from 'react';

function DatePickerComponent({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState('2021-06-19'); // State to manage the selected date

  function handleDateChange(event) {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
        onDateChange(newDate)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
      {/* Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ marginRight: '20px' }} // Add some spacing between the date picker and the slider
      />

    </div>
  );
}

export default DatePickerComponent;
