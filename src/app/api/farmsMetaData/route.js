/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the characters data.
 */

import farms_meta_data from '@/data/farms_meta_data.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ farms_meta_data: farms_meta_data.data })
}