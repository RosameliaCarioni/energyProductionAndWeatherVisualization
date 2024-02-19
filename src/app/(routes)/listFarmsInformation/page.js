"use client";
import ListOfFarms from "@/components/ListOfFarmsComponent"
import DatePickerComponent from "@/components/DatePickerComponent";
import React, { useState } from 'react';

export default function ListFarmsInformation(){

    const [selectedDate, setSelectedDate] = useState('2021-06-19');

    function handleDayChange(newDay) {
        setSelectedDate(newDay);
    }


    return(
        <div className="nav-margin">
            <h1> List of farms </h1>
            <DatePickerComponent onDateChange={handleDayChange}/>
            <ListOfFarms date={selectedDate}/>
        </div>
    )

}