/**
 * Retrieves energy production of farms from the energy_production.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the farm data.
 */

import energy_production from '@/data/energy_production_data.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ energy_production: energy_production.data})
}