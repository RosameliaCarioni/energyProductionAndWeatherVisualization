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
    <div className="datepicker-container" style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
      {/* Date Picker */}
      <input
        className='datepicker-input'
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />

    </div>
  );
}

export default DatePickerComponent;
