// components/LocationProviderWrapper.tsx
"use client";

import { LocationProvider } from "@/context/Location.context";

export default function LocationProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocationProvider>{children}</LocationProvider>;
}
