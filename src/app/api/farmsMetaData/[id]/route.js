/**
 * Retrieves a character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import farms_meta_data from '@/data/farms_meta_data.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const farm = farms_meta_data.data.find(item => item.id === params.id)
    if (!farm) {
      return new NextResponse('not found', { status: 404 })
    }


    return NextResponse.json({
      farm
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}