import React, { useState }  from 'react';


const ModelSelectComponent = () => {
 // Initialize state to the first model or a default value
 const [selectedModel, setSelectedModel] = useState('DWD_ICON-EU');

 // Handle changing the selected model
 const handleChange = (event) => {
   setSelectedModel(event.target.value);
 };

 return (
    <div>
      <select id="model-select" value={selectedModel} onChange={handleChange}>
        {/* No default "Choose a model" option, starts with "DWD_ICON-EU" */}
        <option value="DWD_ICON-EU">DWD_ICON-EU</option>
        <option value="DWD_ICON-D2">DWD_ICON-D2</option>
        <option value="NCEP_GFS">NCEP_GFS</option>
      </select>
    </div>
  );
}

export default ModelSelectComponent;
