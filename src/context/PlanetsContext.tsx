"use client";

import { createContext, useContext } from "react";

type PlanetsContextType = {
  planets: Planet[];
};

const PlanetsContext = createContext<PlanetsContextType | null>(null);

export function PlanetsProvider({
  planets,
  children,
}: {
  planets: Planet[];
  children: React.ReactNode;
}) {
  return (
    <PlanetsContext.Provider value={{ planets }}>
      {children}
    </PlanetsContext.Provider>
  );
}

export function usePlanets() {
  const context = useContext(PlanetsContext);
  if (!context) {
    throw new Error("usePlanets must be used inside PlanetsProvider");
  }
  return context;
}
