type point = {
  id: string
  tags: {
    'addr:street'?: string
    'addr:housenumber'?: string
    name: string
  }
}

export type coffee_store = {
  name: string;
  id: string;
  address: string;
  imgUrl: string;
}

export const fecthCoffeeStores = async (): Promise<coffee_store[] | undefined> => {
  // mapbox api
  try {

    // const proximityBogota = "-74.09822061261895,4.638180180471011"
    // const proximityNYC = "-73.990593,40.740121"
    // const proximityCali = "-76.50939615440562,3.4712874196221435"

    // const url = `https://api.mapbox.com/search/searchbox/v1/category/coffee_shop?access_token=${process.env.MAPBOX_PUBLIC_TOKEN_API}&language=en&limit=5&proximity=${proximityNYC}`
// const url = "https://api.mapbox.com/search/searchbox/v1/suggest?q=cafete&language=es&limit=10&proximity=-76.50939615440562,3.4712874196221435&session_token=08b93e6a-dd3b-4741-8940-3c2df48035af&access_token=pk.eyJ1Ijoic3J1ZWRhMjciLCJhIjoiY201NDlhaTZzMnNvcjJxcHB1eGxyZGx4NSJ9.JbN60AHol4Y8EfEaEjnGwg"
// const url2 = `https://api.mapbox.com/search/searchbox/v1/suggest?q=cafeteria&language=en&poi_category=coffee_shop,food_and_drink&proximity=-76.51732907122643,3.4739736210780165&session_token=042b5282-a0b9-4868-8194-03d8dafb0847&access_token=pk.eyJ1Ijoic3J1ZWRhMjciLCJhIjoiY201NDlhaTZzMnNvcjJxcHB1eGxyZGx4NSJ9.JbN60AHol4Y8EfEaEjnGwg`
const overPassURL = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="cafe"](around:10000,3.4712874196221435,-76.50939615440562);out 20;`;

// const response = await fetch(url);
const response = await fetch(overPassURL)
const json = await response.json()

// console.log(json)
// console.log(json.suggestions.filter((point: { feature_type: string; }) => point.feature_type == 'poi'))

// console.log(json.elements)

const data = json.elements.filter((point: point) => point.tags["addr:street"])

return data.map((point: point) => transformData(point));
  } catch (error) {
  console.log('Error while fetching coffee stores ', error)
}
}

const transformData = (point: point): coffee_store => {
  return {
    name: point.tags.name,
    id: point.id,
    address: `${point.tags["addr:street"]}${point.tags["addr:housenumber"] ? ' # ' + point.tags["addr:housenumber"] : ''}`,
    imgUrl: 'https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D'
  }
}

/* after getting the json() from the response there is an 'elements' property where each place is stored. Each place has an id, how could I get the data from a place based on that id?
And example of one of the elements in .elements 
{
    type: 'node',
    id: 4750563324,
    lat: 3.4611617,
    lon: -76.5329756,
    tags: {
      'addr:housenumber': '17-11',
      'addr:street': 'Avenida 9N',
      amenity: 'cafe',
      brand: 'Juan Valdez Café',
      'brand:wikidata': 'Q6301102',
      'brand:wikipedia': 'en:Juan Valdez Café',
      cuisine: 'coffee_shop',
      name: 'Juan Valdez Café',
      'name:es': 'Juan Valdez Café',
      shop: 'coffee',
      takeaway: 'yes',
      website: 'https://juanvaldez.com/'
    }
  } */