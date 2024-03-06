import React from 'react';

const EnergyAfterIceLossLegendComponent = () => {
  const options = [
    { color: '#3BCA6D', label: '0% - 30%' }, // Minimal energy loss
    { color: '#bbdb44', label: '31% - 50%' }, // Low energy loss
    { color: '#f7e379', label: '51% - 70%' }, // Moderate energy loss
    { color: '#f2a134', label: '71% - 90%' }, // High energy loss
    { color: '#e51f1f', label: '91% - 100%' }, // Very high energy loss 
  ];

  return (
    <div className="bg-dark mb-2 custom-border" style={{ width: '380px', padding: '10px'}}>
      <div style={{ marginBottom: '1px', fontSize: '14px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        % Of Energy Loss Due To Icing
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

export default EnergyAfterIceLossLegendComponent;
