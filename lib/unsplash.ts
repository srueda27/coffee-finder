import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
})


export const getCoffeePhotos = async () => {
  try {
    const response = await unsplash.search.getPhotos({
      query: 'coffee shop',
      page: 1,
      perPage: 10
    })


    return response.response?.results.map(img => ({
      imgUrl: img.urls.small,
      imgId: img.id
    }))
  } catch (error) {
    throw new Error('Error happened during getting photos: ' + error)
  }
}

export const getCoffeePhoto = async (imgId: string) => {
  try {
    const response = await unsplash.photos.get({ photoId: imgId })


    return response.response
  } catch (error) {
    throw new Error('Error happened during getting one photo: ' + error)
  }
}