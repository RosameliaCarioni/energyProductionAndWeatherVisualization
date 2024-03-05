import React from 'react';

const EnergyProductionLegendComponent = () => {
  // Define the color stops for the discrete options
  const options = [
    { color: '#e51f1f', label: '0% - 20%' },
    { color: '#f2a134', label: '21% - 40%' },
    { color: '#f7e379', label: '41% - 60%' },
    { color: '#bbdb44', label: '61% - 80%' },
    { color: '#3BCA6D', label: '81% - 99%' },
    { color: '#44ce1b', label: '100%' },
  ];

  return (
    <div style={{ width: '50%', backgroundColor: '#000', padding: '10px', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        Plant Production Levels
      </div>
      <div className="legend-container" style={{ display: 'flex', alignItems: 'center', height: '30px' }}>
        {options.map((option, index) => (
          <span key={index} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: '10px', lineHeight: '1', backgroundColor: option.color }}>
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EnergyProductionLegendComponent;
