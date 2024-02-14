import { endpoint } from '@/utils/endpoint'

export async function getFarmDataByID(id) {
    const response = await fetch(`${endpoint}/farmsMetaData/${id}`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farm location given id: ',id)
    }
    const formatted_data = await response.json()
    return formatted_data.farm
  }