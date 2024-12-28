import { fecthCoffeeStore, fecthCoffeeStores } from "@/lib/coffee-stores";
// import { fecthCoffeeStore } from "@/lib/coffee-stores";
import Link from "next/link";
import Image from "next/image";
import { coffee_store } from "@/types";

async function getData(id: string): Promise<coffee_store | undefined> {
  return await fecthCoffeeStore(id);
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const coffeeStores = await fecthCoffeeStores();

  return coffeeStores!.map((coffeeStore: coffee_store) => ({
    id: `${coffeeStore.id}`,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const coffeeStore = await getData(id);

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">
              {(coffeeStore && coffeeStore.name) || ""}
            </h1>
          </div>
          <Image
            src={(coffeeStore && coffeeStore.imgUrl) || ""}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAABdUlEQVR42u3UQQEAAAQEMPpnkfGI4bGFWFcyBXBaCIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEACAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAPlkQXquQn3IerAAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          <div className="mb-4 flex">
            <Image src="" width="24" height="24" alt="places icon" />
            <p className="pl-2">{(coffeeStore && coffeeStore.address) || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
