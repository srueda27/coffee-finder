import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby-coffe-stores.client";
import { fecthCoffeeStores } from "@/lib/coffee-stores";
import { coffee_store } from "@/types";

const caliLongLat = "3.43722,-76.5225"
// const torontoLongLat = "43.651070,-79.347015"

async function getData() {
  return await fecthCoffeeStores(6, caliLongLat);
}

export default async function Home() {
  const data = await getData();

  /* const coffeeStores = [
    {
      name: "Café Condor",
      imgUrl:
        "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Café Irlandes",
      imgUrl:
        "https://media.istockphoto.com/id/1854521028/es/foto/cafeter%C3%ADa-de-panader%C3%ADa-moderna.webp?a=1&b=1&s=612x612&w=0&k=20&c=vvcu7n9veN9INanS5Gq2SMVVV0_87PFjFftF8qF395w=",
    },
    {
      name: "Café Condor",
      imgUrl:
        "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Café Irlandes",
      imgUrl:
        "https://media.istockphoto.com/id/1854521028/es/foto/cafeter%C3%ADa-de-panader%C3%ADa-moderna.webp?a=1&b=1&s=612x612&w=0&k=20&c=vvcu7n9veN9INanS5Gq2SMVVV0_87PFjFftF8qF395w=",
    },
    {
      name: "Café Condor",
      imgUrl:
        "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Café Irlandes",
      imgUrl:
        "https://media.istockphoto.com/id/1854521028/es/foto/cafeter%C3%ADa-de-panader%C3%ADa-moderna.webp?a=1&b=1&s=612x612&w=0&k=20&c=vvcu7n9veN9INanS5Gq2SMVVV0_87PFjFftF8qF395w=",
    },
  ]; */

  return (
    <div className="mb-16">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Cafeterías en Cali
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {data?.map((coffeeStore: coffee_store) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}?idx=${coffeeStore.imgId}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
