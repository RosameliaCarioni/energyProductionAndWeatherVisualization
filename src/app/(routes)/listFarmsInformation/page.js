"use client";
import ListOfFarms from "@/components/ListOfFarmsComponent";
import DatePickerComponent from "@/components/DatePickerComponent";
import React, { useState } from 'react';

export default function ListFarmsInformation(){

    const [selectedDate, setSelectedDate] = useState('2021-06-19');

    function handleDayChange(newDay) {
        setSelectedDate(newDay);
    }


    return(
        <div className="ml-24 py-5">
            <p>LIST VIEW</p>
            <h1>Wind farms</h1>
            <DatePickerComponent onDateChange={handleDayChange}/>
            <ListOfFarms date={selectedDate}/>
        </div>
    )

}