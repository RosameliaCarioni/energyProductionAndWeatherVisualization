import React from 'react';

const EnergyAfterIceLossLegendComponent = () => {
  // Define the color stops for the discrete options
  const options = [
    { color: '#3BCA6D', label: '0% - 30%' }, // Minimal energy loss
    { color: '#bbdb44', label: '31% - 50%' }, // Low energy loss
    { color: '#f7e379', label: '51% - 70%' }, // Moderate energy loss
    { color: '#f2a134', label: '71% - 90%' }, // High energy loss
    { color: '#e51f1f', label: '91% - 100%' }, // Very high energy loss 
  ];

  return (
    <div style={{ width: '50%', backgroundColor: '#000', padding: '10px', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        Percentage of Energy loss due to Icing
      </div>
      <div className="legend-container" style={{ display: 'flex', alignItems: 'center', height: '30px' }}>
        {options.map((option, index) => (
          <span key={index} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: '16px', lineHeight: '1', backgroundColor: option.color }}>
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EnergyAfterIceLossLegendComponent;
