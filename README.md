# Energy Production and Weather Visualization

Welcome to the Energy Production and Weather Visualization repository! This project, developed in collaboration with [Rebase Energy](https://www.rebase.energy/) and the [Information Visualization course at KTH](https://www.kth.se/student/kurser/kurs/DH2321?l=en), offers a dynamic platform to energy traders for farm management by integrating geospatial insights, energy analytics, and weather data to improve decision making in power trading. Our platform is designed to empower users with comprehensive insights, enabling informed decisions which maximize market opportunities and minimize risks.

For more information and to experience the platform, visit our [website](https://weather-visualization-rebase.vercel.app/).

## Contributors

This project is the result of the collaborative efforts of a student team with diverse skills and backgrounds. 
**Group Members:** 
- Rosamelia Carioni - [Github](https://github.com/RosameliaCarioni)
- Danina Jansson - [Github](https://github.com/DaninaJansson)
- Ellin Lundqvist - [Github](https://github.com/elinlqv)
- Samuel Söderberg - [Github](https://github.com/sasoder)
- Mischa Rauch - [Github](https://github.com/MischaRauch)

For more details about the team, and contributions visit our [About page](https://weather-visualization-rebase.vercel.app/about).

## Getting Started

### To generate the API keys needed for local project execution, follow these steps:
1. Create an account on [MapBox](https://www.mapbox.com/) and [WeatherLayers](https://weatherlayers.com/demo.html) and create access keys for each.
2. Save these keys with the following names on the project root level in a file called `.env.local` `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN= 'your_mapbox_token'` `NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN= 'your_weatherlayers_token'`.

### To run the project:
1. Clone the repository to your local machine.
2. Make sure the npm package manager is installed on your machine. 
3. Install dependencies using `npm install`.
4. Change the endpoint in `src/utils/endpoint.js` to `http://localhost:3000/api`. 
5. Run the development server with `npm run dev`.
6. Visit `http://localhost:3000` to access the application.

## Features

- **Interactive Map:** Visualize and sort wind farms based on energy production, capacity, and location. Apply filters by price areas and select different weather models and layers, such as temperature, wind speed, and relative humidity.

- **List Farms Information:** Access detailed performance metrics of wind farms, with capabilities to sort and filter based on specific criteria such as price areas.


## Project structure 
### `src`:
- **App:** Contains the main application logic.
  - **routes:** URL addresses to pages. Each file within a route directory contains a `page.js` document serving as a page.
  - **api:** Endpoints for data requests.
  - **page.js:** Serves as the HomePage.
  - **styling:** Includes `global.css` for global styles and `layout.js` for layout definitions.
- **Components:** Folder containing all React components used in the application.
- **Data:** JSON files containing project data.
- **Utils:** Contains methods for API data handling and server endpoint configuration.

### `public`:
- **assets:**
  - **weather_data:** Images for weather data visualizations, including humidity, temperature, and wind speed.
  - **images:** Developer team profile pictures.
  - **icons:** Navigation icons.

## Data

This project utilizes data from multiple sources. The pre-processing of the data can be [found here](https://github.com/rebase-energy/NVE-Wind-Power-Production-in-Norway](https://github.com/RosameliaCarioni/NVE-Wind-Power-Production-in-Norway):

- **Farms Data (`src/data/farms_data.json`):** Combines energy production of farms and weather forecasts for those specific locations. The energy production data was obtained from the [NVE Wind Power Production in Norway](https://github.com/rebase-energy/NVE-Wind-Power-Production-in-Norway) and the weather forecasts were provided by [Rebase Energy](https://www.rebase.energy/).
- **Farm Metadata (`src/data/farms_meta_data.json`):** Details each Norwegian wind farm's location, production capacity, name, and other characteristics. The data was retrieved from [NVE Wind Power Production in Norway](https://github.com/rebase-energy/NVE-Wind-Power-Production-in-Norway).
- **Global Energy Pricing Areas (`src/data/world.json`):** Information on energy price areas across countries, obtained from [ElectricityMaps](https://github.com/electricitymaps/electricitymaps-contrib/tree/master/web/geo).
- **Weather Data (`public/assets/weather_data`):** Three folders can be found under this. They each include 24 images depicting daily weather predictions for humidity, temperature, and wind speed.
- **Weather Legends (`src/data/temperature_legend_data.json`, `windspeed_legend_data.json`, `humidity_legend_data.json`):** Describe the map and legend colour codes for various weather conditions.
- **Team Information (`src/data/team_data.json`):** Contains details about our project team.


## Technology Stack

- React and Next.js for the project structure
- JavaScript for the frontend
- MapBox for the world map
- Weatherlayers for visualizing weather data
- Chart.js for creating customizable charts
- Vercel to deploy our project



## Acknowledgments

Special thanks to our professor [Mario Romero](https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAADoHHcB82kx1734f-HuZhngWj8iIWY8ZXs&keywords=mario%20romero&origin=RICH_QUERY_SUGGESTION&position=0&searchId=99bed06d-720d-4bd8-aa6c-cceb65fb9d20&sid=dit&spellCorrectionEnabled=false) and [Rebase Energy](https://www.rebase.energy/) for the opportunity to work in this project and guidance throughout the process.

## License
TODO 
This project is licensed under the MIT License - see the LICENSE file for details.






