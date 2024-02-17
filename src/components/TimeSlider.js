import React, { useState } from 'react';

function TimeSlider({ onTimeChange, onDateChange }) {
  const [value, setValue] = useState(12);
  const [selectedDate, setSelectedDate] = useState('2021-06-19'); // State to manage the selected date
  const sliderWidth = '25%';

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
  const labels = Array.from({ length: 8 }, (_, i) => i * 3);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
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
        </div>
        <div style={{ marginTop: '40px' }}>Selected Hour: {value}</div>
      </div>
    </div>
  );
}

export default TimeSlider;
