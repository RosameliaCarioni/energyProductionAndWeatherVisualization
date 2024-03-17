import React from "react";

function SimpleListOfFarmsComponent({onSelectPlant, plantsArray, energyData, hoverInfo, onHoverPlant }) {

    const handlePlantClick = (plant) => {
        onSelectPlant(plant);
        onHoverPlant(undefined);
    }
    const handlePlantHover = (plant) => {
        onHoverPlant(plant);
    }
    return (
        <div className="list-container mx-auto max-w-4xl rounded-lg shadow mr-4 mt-8">
            <ul className="divide-y divide-gray-200">
                <li className={`flex justify-between items-center p-3 bg-lightgray rounded-md`} >
                    <span className="font-medium">Plant name{' '}</span>
                    <span className="font-medium">Energy production</span>
                    <span className="font-medium">{' '}Capacity</span>
                </li>
                {plantsArray?.map((plant, index) => (
                    <li
                        key={plant.id}
                        className={`flex justify-between items-center p-3 transition duration-150 ease-in-out cursor-pointer ${
                            hoverInfo && (plant.id === hoverInfo.id) ? "bg-blue-10" : "hover:bg-blue-10"
                        }`}
                        onClick={() => handlePlantClick(plant)}
                        onMouseEnter={() =>{
                            handlePlantHover(plant)
                          }}
                          onMouseLeave={() => handlePlantHover(undefined)}
                    >
                        <span className="w-33 text-left font-medium">{plant.name}{' '}</span>
                        <span className="w-33 text-center text-gray-500">
                        {/* Ensure energyData are defined and access the correct hour's data */}
                        {' '}    {energyData[index] !== undefined ? (energyData[index] < 10 ? `0${energyData[index].toFixed(2)}` : energyData[index].toFixed(2)) : 'Loading...'} MW
                        </span>
                        <span className="w-33 text-right text-gray-500">{' '}{plant.capacity_kw / 1000} MW</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SimpleListOfFarmsComponent;
