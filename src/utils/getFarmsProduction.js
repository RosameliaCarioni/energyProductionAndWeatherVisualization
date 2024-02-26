import { endpoint } from '@/utils/endpoint'

  export async function getProduction(id, Year, Month, Day) {
      const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
    
      if (!response.ok) {
        throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
      }
      const formatted_data = await response.json()
      const energyProductions = formatted_data.farms.map(item => item.EnergyProduction);
      return energyProductions
    }


  export async function getProductionInHour(id, Year, Month, Day, Hour) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const energyProductions = formatted_data.farms.filter(item => item.Hour === Hour.toString()).map(item => item.EnergyProduction);
    return energyProductions
  }


  export async function getProductionDataSet(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    return formatted_data.farms
  }

  export async function getWindDirection(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const wind_direction = formatted_data.farms.map(item => item.WindDirection_100);
    return wind_direction
  }

  export async function getTemperature(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const temperature = formatted_data.farms.map(item => item.Temperature);
    return temperature
  }

  export async function getRelativeHumidity(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const relative_humidity = formatted_data.farms.map(item => item.RelativeHumidity);
    return relative_humidity
  }

  export async function getWindSpeed(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const wind_speed = formatted_data.farms.map(item => item.WindSpeed_100);
    return wind_speed
  }

  export async function getEnergyAfterIceLoss(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/farmsProduction/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    const energy_after_ice_loss = formatted_data.farms.map(item => item.EnergyAfterIceLoss);
    return energy_after_ice_loss
  }