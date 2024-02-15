/**
 * Retrieves a farm based on the provided ID and YEAR.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.Year - The year of production
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the farm, or an error response.
 */

import energy_production from '@/data/energy_production_data.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const farms = energy_production.data.filter(item => (item.id === params.id) && (item.Year === params.Year))
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
