import { coffee_store, gps_point } from "@/types";
import { getCoffeePhoto, getCoffeePhotos } from "./unsplash";

export const fecthCoffeeStores = async (): Promise<coffee_store[] | undefined> => {
  // mapbox api
  try {
    const overPassURL = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="cafe"](around:10000,3.4712874196221435,-76.50939615440562);out 20;`;

    const response = await fetch(overPassURL)
    const json = await response.json()

    const data = json.elements.filter((point: gps_point) => point.tags["addr:street"])
    const photos = await getCoffeePhotos()

    return data.map((point: gps_point, idx: number) => transformData(point, photos!, idx));
  } catch (error) {
    console.log('Error while fetching coffee stores ', error)
  }
}

const transformData = (point: gps_point, photos: { imgUrl: string, imgId: string }[] | string, idx = 0): coffee_store => {
  return {
    name: point.tags.name,
    id: point.id,
    address: `${point.tags["addr:street"]}${point.tags["addr:housenumber"] ? ' # ' + point.tags["addr:housenumber"] : ''}`,
    imgUrl: typeof photos === 'string' ? photos : photos[idx].imgUrl,
    imgId: typeof photos === 'string' ? photos : photos[idx].imgId
  }
}

export const fecthCoffeeStore = async (id: string, imgId: string): Promise<coffee_store | undefined> => {
  const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(${id});out;`

  try {
    const response = await fetch(url)
    const json = await response.json()

    const photo = await getCoffeePhoto(imgId)

    return json.elements[0] ? transformData(json.elements[0], photo!.urls.small) : undefined
  } catch (error) {
    console.log(`Error while fetching coffee store id: ${id}`, error)
  }
}