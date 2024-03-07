"use client";
import ListOfFarms from "@/components/ListOfFarmsComponent";
import DatePickerComponent from "@/components/DatePickerComponent";
import React, { useState } from "react";
import PriceAreaComponent from "@/components/PriceAreaComponent";
import SearchComponent from "@/components/SearchComponent";

export default function ListFarmsInformation() {
  const [selectedDate, setSelectedDate] = useState("2021-11-25");
  const [selectedPriceArea, setSelectedPriceArea] = useState();


  function handleDayChange(newDay) {
    setSelectedDate(newDay);
  }

  const handlePriceAreaChange = (newPriceArea) => {
    setSelectedPriceArea(newPriceArea);
  };

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (query) => {
    setSearchInput(query);
  };

  return (
    <div className="ml-16 py-5">
      <p>LIST VIEW</p>
      <h1>Wind farms</h1>
      <DatePickerComponent onDateChange={handleDayChange} />
      <SearchComponent onSearchChange={handleSearchInputChange} />
      <PriceAreaComponent onPriceAreaChange={handlePriceAreaChange} />
      <ListOfFarms date={selectedDate} selectedPriceArea={selectedPriceArea} searchInput={searchInput} />
    </div>
  );
}
