import React from 'react';

const EnergyAfterIceLossLegendComponent = () => {
  const options = [
   
    { color: '#7bdcb5', label: '0% - 30%' }, // Minimal energy loss 
    { color: '#b8e986', label: '31% - 50%' }, 
    { color: '#fed766', label: '51% - 70%' }, 
    { color: '#fcb941', label: '71% - 90%' }, 
    { color: '#fc6e51', label: '91% - 100%' }, 
  ];

  return (
    <div className="bg-dark mb-2 custom-border" style={{ width: '380px', padding: '10px'}}>
      <div className="text-sm" style={{ marginBottom: '1px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
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
