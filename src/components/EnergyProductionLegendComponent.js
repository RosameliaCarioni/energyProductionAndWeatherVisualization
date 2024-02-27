// import React from 'react';

// const EnergyProductionLegendComponent = () => {
//   // Define the color steps and labels
//   const colorSteps = [
//     { color: '#e51f1f', label: 'Not Producing' },
//     { color: '#f2a134', label: 'Very Low' },
//     { color: '#f7e379', label: 'Low' },
//     { color: '#bbdb44', label: 'Medium' },
//     { color: '#3BCA6D', label: 'High' },
//     { color: '#44ce1b', label: 'Producing > Capacity' },
//   ];

//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       {colorSteps.map((step, index) => (
//         <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
//           <div style={{ width: '20px', height: '20px', backgroundColor: step.color }}></div>
//           <span style={{ fontSize: '12px', marginTop: '5px' }}>{step.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EnergyProductionLegendComponent;

import React from 'react';

const EnergyProductionLegendComponent = () => {
  // Define the color stops for the gradient
  const gradientColors = [
    '#e51f1f', // Not Producing
    '#f2a134', // Very Low
    '#f7e379', // Low
    '#bbdb44', // Medium
    '#3BCA6D', // High
    '#44ce1b', // Producing > Capacity
  ];

  // Create a gradient string
  const gradientString = `linear-gradient(to right, ${gradientColors.join(', ')})`;

  return (
    <div className="mb-2" style={{ display: 'flex', alignItems: 'center', width: '50%', height: '30px', background: gradientString }}>
      {gradientColors.map((color, index) => (
        <span key={index} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', fontSize: '10px', lineHeight: '1' }}>
          {/* Conditional rendering for the label based on the index */}
          {index === 0 && 'Not Producing'}
          {index === 1 && 'Very Low'}
          {index === 2 && 'Low'}
          {index === 3 && 'Medium'}
          {index === 4 && 'High'}
          {index === 5 && 'Producing > Capacity'}
        </span>
      ))}
    </div>
  );
};

export default EnergyProductionLegendComponent;

