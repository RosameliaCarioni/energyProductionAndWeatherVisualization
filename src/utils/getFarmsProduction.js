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