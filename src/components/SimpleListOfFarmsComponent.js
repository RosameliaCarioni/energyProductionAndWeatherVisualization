import React from "react";

function SimpleListOfFarmsComponent({onSelectPlant, plantsArray, hoverInfo, onHoverPlant }) {

    const handlePlantClick = (plant) => {
        onSelectPlant(plant);
        onHoverPlant(undefined);
    }
    const handlePlantHover = (plant) => {
        onHoverPlant(plant);
    }
    return (
        <div className="list-container mx-auto max-w-4xl rounded-lg shadow mr-4">
            <h1>All Farms</h1>
            <ul className="divide-y divide-gray-200">
                {plantsArray?.map((plant) => (
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
                        <span className="font-medium">{plant.name}{' '}</span>
                        <span className="text-gray-500">{' '}{plant.capacity_kw} KW</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SimpleListOfFarmsComponent;
