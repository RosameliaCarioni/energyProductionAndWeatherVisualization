/**
 * Retrieves the wind speed from the wind_speed_data.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the farm data.
 */

import wind_speed from '@/data/wind_speed_data.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ wind_speed: wind_speed.data})
}