import GraphComponent from "@/components/GraphComponent";
import { getProduction } from "@/utils/getFarmsProduction";
import { getWindSpeed } from "@/utils/getWindSpeed";

export default async function Graphs() {
  //fetching the plant data
  //const energyData = await getProduction(6, 2021, 6, 19);
  //console.log("Energydata:", energyData);
  //fetching the wind data
  //const windData = await getWindSpeed(6, 2021, 6, 19);
  //console.log("Winddata:", windData);

  return (
    <div>
      <h1>First graph</h1>
      <GraphComponent graphValues={energyData} chartTitle="Energy Output" />
      <h1>Second graph</h1>
      <GraphComponent graphValues={windData} chartTitle="Windspeed" />
    </div>
  );
}
