"use client";

import Banner from "@/components/banner.client";
import { useTrackLocation } from "@/hooks/use-track-location";
import { coffee_store } from "@/types";
import Card from "./card.server";
import { useEffect, useState } from "react";

export default function NearbyCoffeeStores() {
  const [coffeStores, setCoffeStores] = useState<coffee_store[] | []>([]);

  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function getCoffeStoresByLocation() {
      try {
        const limit = 3;
        const response = await fetch(
          `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
        );
        const coffeStoresByLocation = await response.json();
        setCoffeStores(coffeStoresByLocation);
      } catch (error) {
        console.error(error);
      }
    }

    getCoffeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
      {longLat && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Cafeterías cercanas
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeStores.map((coffeeStore: coffee_store) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}?idx=${coffeeStore.imgId}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
