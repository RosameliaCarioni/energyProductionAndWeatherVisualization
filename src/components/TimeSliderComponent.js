import React, { useState } from 'react';

function TimeSlider({ onTimeChange, onDateChange }) {
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2021-11-25");

  const sliderWidth = '500px';

  function handleChange(event) {
    const newValue = event.target.value;
    setValue(newValue);
    if (onTimeChange) {
      onTimeChange(newValue);
    }
  }

  function handleDateChange(event) {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
        onDateChange(newDate)
    }
  }

  // Generate labels for every third hour
  const labels = Array.from({ length: 24 }, (_, i) => i );
  return (
    <div className='bg-dark p-4 rounded-md flex h-70p'>
      {/* Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ marginRight: '20px' }} // Add some spacing between the date picker and the slider
      />
      
      {/* Time Slider */}
      <div style={{ position: 'relative', width: sliderWidth }}>
        <input
          type="range"
          min="0"
          max="23"
          value={value}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', position: 'absolute', width: '100%', left: 0 }}>
          {labels.map(label => (
            <span key={label} style={{ userSelect: 'none', position: 'absolute', left: `calc(${(label / 24) * 100}% + 10px)`, transform: 'translateX(-50%)' }}>
              {label}
            </span>
          ))}
          <span style={{ userSelect: 'none', position: 'absolute', right: '-30px' }}>[PH]</span>
        </div>
      </div>
    </div>
  );
}

export default TimeSlider;
