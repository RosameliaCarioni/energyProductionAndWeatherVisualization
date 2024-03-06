import React from 'react';

const EnergyProductionLegendComponent = () => {
  // Define the color stops for the discrete options
  const options = [
    { color: '#e51f1f', label: '0% - 20%' },
    { color: '#f2a134', label: '21% - 40%' },
    { color: '#f7e379', label: '41% - 60%' },
    { color: '#bbdb44', label: '61% - 80%' },
    { color: '#3BCA6D', label: '81% - 100%' },
  ];

  return (
    <div className="bg-dark mb-2" style={{ width: '380px', padding: '10px', borderRadius: '5px'}}>
      <div style={{ marginBottom: '1px', fontSize: '14px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
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
