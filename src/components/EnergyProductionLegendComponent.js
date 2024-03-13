import React from 'react';

const EnergyProductionLegendComponent = () => {
  // Define the color stops for the discrete options
  const options = [
    { color: '#fc6e51', label: '0% - 20%' }, 
    { color: '#fcb941', label: '21% - 40%' }, 
    { color: '#fed766', label: '41% - 60%' }, 
    { color: '#b8e986', label: '61% - 80%' }, 
    { color: '#60a917', label: '81% - 100%' }, // Bproducing at full capacity 


  ];


  return (
    <div className="bg-dark mb-2 custom-border" style={{ width: '380px', padding: '10px'}}>
      <div className="text-sm" style={{ marginBottom: '1px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        % Of Energy Produced In Relation To Capacity
      </div>
      <div className="legend-container" style={{ display: 'flex', alignItems: 'center', height: '30px' }}>
        {options.map((option, index) => (
          <span className="text-xs" key={index} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', lineHeight: '1', backgroundColor: option.color }}>
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EnergyProductionLegendComponent;
