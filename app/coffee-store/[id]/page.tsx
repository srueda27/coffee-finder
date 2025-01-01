import { fecthCoffeeStore, fecthCoffeeStores } from "@/lib/coffee-stores";
import Link from "next/link";
import Image from "next/image";
import { coffee_store } from "@/types";

const caliLongLat = "3.43722,-76.5225";
// const torontoLongLat = "43.651070,-79.347015"

async function getData(
  id: string,
  imgId: string
): Promise<coffee_store | undefined> {
  return await fecthCoffeeStore(id, imgId);
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const coffeeStores = (await fecthCoffeeStores(6, caliLongLat)) || [];

  return coffeeStores.map((coffeeStore: coffee_store) => ({
    id: `${coffeeStore.id}`,
  }));
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

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="col-span-2">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="my-4">
              <h1 className="text-4xl">
                {(coffeeStore && coffeeStore.name) || ""}
              </h1>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2 my-4">
              <Image
                src={(coffeeStore && coffeeStore.imgUrl) || ""}
                width={740}
                height={360}
                className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
                alt={"Coffee Store Image"}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAABdUlEQVR42u3UQQEAAAQEMPpnkfGI4bGFWFcyBXBaCIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEACAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAPlkQXquQn3IerAAAAABJRU5ErkJggg=="
                placeholder="blur"
              />
              <div className={`glass rounded-lg p-4 flex h-fit`}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
