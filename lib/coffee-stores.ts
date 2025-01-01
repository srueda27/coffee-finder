import { coffee_store, gps_point } from "@/types";
import { getCoffeePhoto, getCoffeePhotos } from "./unsplash";

const overPassURL = "https://overpass-api.de/api/interpreter";
const overPassURL_2 = "https://overpass.kumi.systems/api/interpreter";

export const fecthCoffeeStores = async (limit: number, longLat: string): Promise<coffee_store[] | []> => {
  const parameters = `data=[out:json];node["amenity"="cafe"](around:10000,${longLat});out ${limit * 3};`

  let json = await fetchUrl(`${overPassURL}?${parameters}`)

  if (!json) json = await fetchUrl(`${overPassURL_2}?${parameters}`)

  const data = json.elements.filter((point: gps_point) => point.tags["addr:street"]) as gps_point[]
  const photos = await getCoffeePhotos()

  return data.map((point: gps_point, idx: number) => transformData(point, photos!, idx)).slice(0, limit);
}

const fetchUrl = async (url: string) => {
  try {
    const response = await fetch(url)
    const json = await response.json()

    return json
  } catch (error) {
    console.log(`Error while fetching ${url} `, error)
    return undefined
  }
}

const transformData = (point: gps_point, photos: { imgUrl: string, imgId: string }[] | string, idx = 0): coffee_store => {
  return {
    name: point.tags.name,
    id: point.id,
    address: `${point.tags["addr:street"]}${point.tags["addr:housenumber"] ? ' # ' + point.tags["addr:housenumber"] : ''}`,
    imgUrl: typeof photos === 'string' ? photos : photos[idx].imgUrl,
    imgId: typeof photos === 'string' ? photos : photos[idx].imgId,
  }
}

export const fecthCoffeeStore = async (id: string, imgId: string): Promise<coffee_store | undefined> => {
  const parameters = `data=[out:json];node(${id});out;`

  let json = await fetchUrl(`${overPassURL}?${parameters}`)

  if (!json) json = await fetchUrl(`${overPassURL_2}?${parameters}`)

  const photo = await getCoffeePhoto(imgId)

  return json.elements[0] ? transformData(json.elements[0], [{ imgUrl: photo!.urls.small, imgId }]) : undefined
}