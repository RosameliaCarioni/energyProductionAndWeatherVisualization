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
    <div className="rounded-lg" style={{ display: 'flex', alignItems: 'center'}}>
      {/* Date Picker */}
      <input
        className='datepicker-input rounded-md'
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />

    </div>
  );
}

export default DatePickerComponent;
