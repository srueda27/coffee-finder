import { fecthCoffeeStore, fecthCoffeeStores } from "@/lib/coffee-stores";
import Link from "next/link";
import Image from "next/image";
import { coffee_store } from "@/types";
import { createCoffeeStore } from "@/lib/airtable";
import Upvote from "@/components/upvote.client";
import { redirect } from "next/navigation";
import { getDomain } from "@/utils";

const caliLongLat = "3.43722,-76.5225";
// const torontoLongLat = "43.651070,-79.347015"

async function getData(
  id: string,
  imgId: string
): Promise<coffee_store | undefined> {
  const coffeeStoresMap = await fecthCoffeeStore(id, imgId);

  if (!coffeeStoresMap) return;

  const coffeeStore = await createCoffeeStore(coffeeStoresMap, id);

  return coffeeStore && coffeeStore[0].fields;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const coffeeStores = (await fecthCoffeeStores(6, caliLongLat)) || [];

  return coffeeStores.map((coffeeStore: coffee_store) => ({
    id: `${coffeeStore.id}`,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ idx: string }>;
}) {
  const { id } = await params;
  const { idx } = await searchParams;

  const coffeeStoresMap = await fecthCoffeeStore(id, idx);
  const { name = "" } = coffeeStoresMap || {};

  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${id}?idx=${idx}`,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ idx: string }>;
}) {
  const { id } = await params;
  const { idx } = await searchParams;

  const coffeeStore = await getData(id, idx);
  // if (!coffeeStore) throw new Error('something went wrong OLI');
  if (!coffeeStore) redirect("/not-found");

  return (
    <div className="h-full pb-40">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="col-span-2">
          <div className="mb-2 mt-12 text-lg font-bold">
            <Link href="/">← Volver a Inicio</Link>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="my-4">
              <h1 className="text-4xl">
                {(coffeeStore && coffeeStore.name) || ""}
              </h1>
            </div>
            <div className="col-span-2 grid md:grid-cols-2 gap-2 my-4">
              <Image
                src={(coffeeStore && coffeeStore.imgUrl) || ""}
                width={740}
                height={360}
                className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
                alt={"Coffee Store Image"}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAABdUlEQVR42u3UQQEAAAQEMPpnkfGI4bGFWFcyBXBaCIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEACAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAPlkQXquQn3IerAAAAABJRU5ErkJggg=="
                placeholder="blur"
              />
              <div className={`glass rounded-lg p-4 flex flex-col h-fit`}>
                <div className="flex">
                  <Image
                    src="/static/icons/places.svg"
                    width="24"
                    height="24"
                    alt="places icon"
                  />
                  <p className="pl-2">
                    {(coffeeStore && coffeeStore.address) || ""}
                  </p>
                </div>
                <Upvote
                  votes={(coffeeStore && coffeeStore.voting) || 0}
                  coffee_store_id={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
