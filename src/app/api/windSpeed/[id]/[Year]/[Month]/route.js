/**
 * Retrieves a location based on the provided ID and Year and Month.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.Month - The Month of the farm for which we want to see the wind.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the farm, or an error response.
 */

import wind_speed from '@/data/wind_speed_data.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const location = wind_speed.data.filter(item => (item.id === params.id) && (item.Year === params.Year) && (item.Month === params.Month))
    if (location.length === 0) {
      return new NextResponse('not found', { status: 404 })
    }

    return NextResponse.json({
      location // Return all matching farms
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

