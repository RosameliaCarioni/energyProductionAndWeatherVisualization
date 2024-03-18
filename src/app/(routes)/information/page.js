import '../../../../src/output.css';

export default function Information() {
    return (
        <div className='relative'>
            <div className="w-full py-12 flex items-center justify-center">
                <div className="max-w-screen-md flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center justify-center">
                        <h1>How to use</h1>
                        <p>This page contains information on how to use this application.</p>
                        
                        <div className='flex items-center jusitfy-center mt-8'>
                            <h2 className='mr-4'>Map</h2>
                            <img src="/assets/icons/map-w.svg" alt="map icon" />
                        </div>
                        
                        <h3 className='mt-4'>Left Hand-Side</h3>
                        <p>The left hand-side contains a list view of all graphs with filtering and sorting options as well as an aggregation graph showing the combined energy outcome.</p>
                        
                        <div className="flex flex-col w-full mt-4">
                            <h4 className='text-left'>Aggregation Graph</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>You can find a graph displaying the energy production of all farms combined per pour hour. In addition to this, you can also see the aggregated maximum capacity of production. You can select the different features you want to hide from the graph by clicking  on their names. lastly, this graph gets updated based on the filters that are applied on price area.</p>
                                <img className="w-33" src="/assets/images/aggregategraph.png" alt="aggregate graph"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-right'>Search, Filtering And Sorting</h4>
                            <div className='flex justify-between items-center'>
                                <img className="mr-4 w-33" src="/assets/images/filterandsort-map.png" alt="filter and sort in map view"/>
                                <p className='text-right'>The search bar can be used to find a specific plant based on it’s name. Additionally, multiple sorting options can be found with the option to sort them in Ascending or Descending order. The user is also able to filter the list of farms based on the price area to which they belong. This hides the markers in the map that do not belong to this price area.</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-left'>Detailed Plant View</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>Once a plant is slected more information about the plant appears. A selection button “Chose Graphs” can be found at the top right. This anables the user to select which graphs to show. The options include the following graphs: aggregated energy production, energy production for specific plant, wind speed, humidity, temperature, and the percentage of energy loss due to icing.</p>
                                <img className="w-33" src="/assets/images/detailplantgraph.png" alt="detail plant graph"/>
                            </div>
                        </div>
                        
                        <h3 className='mt-24'>Right Hand-Side</h3>
                        <p>On the right you can see the map of Norway which has by default some pre-defined parameters displayed on it. In order to change these, you must look into:</p>
                        
                        <div className="flex flex-col w-full mt-4">
                            <h4 className='text-left'>Model Used To Generate Predictions</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>The weather model that is used to generate the predictions of energy production can be selected with the “Weather model” dropdown list. It’s use is for demonstration purposes. The logic for this is not implement. </p>
                                <img className="w-33" src="/assets/images/weathermodel.png" alt="weather model legend"/>
                            </div>
                            
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-right'>Weather Characteristics On Map</h4>
                            <div className='flex justify-between items-center'>
                                <div className='w-33 mr-4 flex items-center justify-center'>
                                    <img className="h-200px" src="/assets/images/weatherlegends.png" alt="weather explaining legends"/>
                                </div>
                                <p className='text-right w-66'>The Selection box “Weather Layer” allows to select which weather characteristics to display in the map. If the name has a turquoise color, it means that that characteristic is chosen and you can see it’s effect on the map. You can choose to not display any weather layer by deselecting the one that is currently selecting. The legend of colors underneath it relates to the weather characteristics.</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-left'>Colour Coding Of Farm Locations</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>The color of the markers is defined by the % of energy they produce at a given time, or by % of energy loss due to icing events. In order to choose which event you want to visualize you can switch between “Energy Production” and “Ice Loss”. </p>
                                <img className="w-33" src="/assets/images/plantmarkerlegend.png" alt="map marker color legend"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-right'>Date And Time</h4>
                            <div className='flex justify-between items-center'>
                                <img className="w-33 mr-4" src="/assets/images/timeslider.png" alt="timeslider"/>
                                <p className='text-right'>To change the date for which you are interested in visualizing the production of energy and weather conditions you can click on the calendar icon and a pop up window will allow you to change the day, month and year. To change the time you can either drag the red buttom or click on the specific power hour that you would like to choose.</p>
                            </div> 
                        </div>

                        <div className='flex items-center jusitfy-center mt-24'>
                            <h2 className='mr-4'>List</h2>
                            <img src="/assets/icons/list-w.svg" alt="list icon" />
                        </div>

                        <div className="flex flex-col w-full mt-2">
                            <h4 className='text-left'>Date</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>To change the date for which you are interested in visualizing data you can click on the calendar icon and a pop up window will allow you to change the day, month and year. During 2021 the energy data and iceloss data is available, the weather data is only available for 25.11.2021, which is the default day.</p>
                                <img className="w-33" src="/assets/images/date.png" alt="date picker"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-right'>Search Bar</h4>
                            <div className='flex justify-between items-center'>
                                <img className="w-33 mr-4" src="/assets/images/search.png" alt="search function"/>
                                <p className='text-right'>One way to find a specific power plant is by typing it’s name into the search bar. </p>
                            </div> 
                        </div>

                        <div className="flex flex-col w-full mt-12">
                            <h4 className='text-left'>Price Area filter</h4>
                            <div className='flex justify-between items-center'>
                                <p className='text-left mr-4'>You can filter the displayed data based energy price areas. The selected area is highlighted by a turquoise color.</p>
                                <img className="w-33" src="/assets/images/pricearea-list.png" alt="price area filtering in list view"/>
                            </div>
                        </div>

                        <div className='flex flex-col items-center jusitfy-center mt-24'>
                            <h2 className='mr-4'>Tools</h2>
                            <p>This project was built using <b>React</b> and <b>Next.js</b> and utilizes <b>JavaScript</b> as front-end. The weather animations are built on top of <b>MapBox</b> and <b>WeatherLayers</b>, whereas the seen graphs are built with chart.js. Deployment of this project was achieved with <b>Vercel</b>.</p>
                        </div>

                    </div>
                </div>
            </div>
            <img className='w-full' src="/assets/images/lineImg.svg" alt="line background" />
            <div className='absolute bottom-0 flex w-full items-center justify-center'>
                <p>IVIS 2024</p>
            </div>
        </div>
    )
}
