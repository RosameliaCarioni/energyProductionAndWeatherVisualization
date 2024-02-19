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
        <div className="list-container mx-auto max-w-4xl p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">All Farms</h2>
            <ul className="divide-y divide-gray-200">
                {plantsArray?.map((plant) => (
                    <li
                        key={plant.id}
                        className={`flex justify-between items-center p-3 rounded-md transition duration-150 ease-in-out ${
                            hoverInfo && (plant.id === hoverInfo.id) ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handlePlantClick(plant)}
                        onMouseEnter={() =>{
                            handlePlantHover(plant)
                          }}
                          onMouseLeave={() => handlePlantHover(undefined)}
                    >
                        <span className="font-medium text-gray-700">{plant.name}{' '}</span>
                        <span className="text-gray-500">{' '}{plant.capacity_kw} KW</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SimpleListOfFarmsComponent;
