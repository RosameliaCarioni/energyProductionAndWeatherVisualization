/**
 * Retrieves a farm based on the provided ID and YEAR and Month and Day and Hour.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.Hour - The Hour of production
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the farm, or an error response.
 */

//import energy_production from '@/data/energy_production_data.json'
import energy_production from '@/data/farms_data.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const farms = energy_production.data.filter(item => (item.id === params.id) && (item.Year === params.Year) && (item.Month === params.Month) && (item.Day === params.Day) && (item.Hour === params.Hour))
    if (farms.length === 0) {
      return new NextResponse('not found', { status: 404 })
    }

    return NextResponse.json({
      farms // Return all matching farms
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
