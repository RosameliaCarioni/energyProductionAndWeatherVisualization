'use client';
import React, { useState } from 'react';
import TimeSlider from '@/components/TimeSliderComponent'; // Adjust the import path based on your file structure

export default function TimeSliderPage() {
  const [selectedTime, setSelectedTime] = useState(12);
  const [selectedDate, setSelectedDate] = useState('2021-06-19');

  function handleTimeChange(newTime) {
    setSelectedTime(newTime);
  }
  function handleDayChange(newDay) {
    setSelectedDate(newDay);
  }
  console.log("THE TIME IS: ",selectedTime)
  console.log("THE DAY IS: ",selectedDate)

  return (
    <div>
      <TimeSlider onTimeChange={handleTimeChange} onDateChange={handleDayChange} />

    </div>
  );
}
