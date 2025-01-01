import { fecthCoffeeStores } from "@/lib/coffee-stores";
import { coffee_store } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const longLat = searchParams.get('longLat') || ''
    const limit = searchParams.get('limit') || ''

    let response: coffee_store[] | [] = []
    if (longLat) {
      response = await fecthCoffeeStores(parseInt(limit), longLat);
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('There is an error: ', error)
    return NextResponse.json(`Something went wrong ${error}`, { status: 500 })
  }
}  