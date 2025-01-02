import React, { createContext, useContext, useState, useEffect } from "react";

type LocationContextType = {
  longLat: string | null;
  setLongLat: React.Dispatch<React.SetStateAction<string | null>>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [longLat, setLongLat] = useState<string | null>(null);

  useEffect(() => {
    console.log("Updated longLat in context: ", longLat);
  }, [longLat]);

  return (
    <LocationContext.Provider value={{ longLat, setLongLat }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};