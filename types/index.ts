export type gps_point = {
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
  imgId: string;
  voting: number
}

export type PositionType = {
  coords: {
    latitude: number
    longitude: number
  }
}
