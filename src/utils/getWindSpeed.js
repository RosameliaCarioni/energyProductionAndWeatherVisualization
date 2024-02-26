import { endpoint } from '@/utils/endpoint'

  // export async function getWindSpeed(id, Year, Month, Day) {
  //     const response = await fetch(`${endpoint}/windSpeed/${id}/${Year}/${Month}/${Day}`)
    
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
  //     }
  //     const formatted_data = await response.json()
  //     const windSpeed = formatted_data.location.map(item => item.WindSpeed);
  //     return windSpeed
  //   }


  export async function getWindSpeedDataset(id, Year, Month, Day) {
    const response = await fetch(`${endpoint}/windSpeed/${id}/${Year}/${Month}/${Day}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id, ', Year: ',Year, ', Month: ', Month, ', Day: ', Day)
    }
    const formatted_data = await response.json()
    return formatted_data.location
  }