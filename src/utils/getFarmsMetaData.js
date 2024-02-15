import { endpoint } from '@/utils/endpoint'


export async function getFarmsData() {
    const response = await fetch(`${endpoint}/farmsMetaData`)
  
    if (!response.ok) {
      throw new Error('Failed to fetch data about farms locations')
    }
    return response
  }

export async function getFarmsMeta() {
    const latitudes = await getFarmsLatitude()
    const longitudes = await getFarmsLongitude()
    const ids = await getFarmsID()
    const names = await getFarmsName()
    const capacities = await getFarmsCapacity()

    let farmsMetaArray = [];

    for (let i = 0; i < ids.length; i++) {
        farmsMetaArray.push({
            id: ids[i],
            name: names[i],
            longitude: longitudes[i],
            latitude: latitudes[i],
            capacity_kw: capacities[i]
        });
    }

    return farmsMetaArray;
}

export async function getFarmsLatitude() {
    const response = await getFarmsData()
    const data = await response.json()
    return (data.farms_meta_data).map(item => item.latitude); 
}

export async function getFarmsLongitude() {
    const response = await getFarmsData()
    const data = await response.json()
    return (data.farms_meta_data).map(item => item.longitude); 
}

export async function getFarmsID() {
    const response = await getFarmsData()
    const data = await response.json()
    return (data.farms_meta_data).map(item => item.id); 
}

export async function getFarmsName() {
    const response = await getFarmsData()
    const data = await response.json()
    return (data.farms_meta_data).map(item => item.name_plant); 
}

export async function getFarmsCapacity() {
    const response = await getFarmsData()
    const data = await response.json()
    return (data.farms_meta_data).map(item => item.capacity_kw); 
}