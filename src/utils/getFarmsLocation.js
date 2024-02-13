import { endpoint } from '@/utils/endpoint'

export function getAllLatitudes(data){
    //console.log("01 ",data)
    return data.map(item => item.latitude); 
}

export function getAllLongitude(data){
    return data.map(item => item.longitude); 
}

export async function getFarmsData() {
    const response = await fetch(`${endpoint}/farmsMetaData`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farms locations')
    }
    return response
  }

export async function getFarmsLatitude() {
    const response = await getFarmsData()
    const data = await response.json()

    const latitudes = getAllLatitudes(data.farms_meta_data)
    return latitudes
}


export async function getFarmsLongitude() {
    const response = await getFarmsData()
    const data = await response.json()
    
    const longitudes =  getAllLongitude(data.farms_meta_data)
    return longitudes
}
