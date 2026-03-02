"use client";

import React from "react";
import { usePlanets } from "@/context/PlanetsContext";

interface PlanetsPageProps {
  searchParams: { page?: string };
}

const Page = ({ searchParams }: PlanetsPageProps) => {
  const { planets } = usePlanets();

  console.log(planets[0]);

  return (
    <div>
      {planets.map((planet) => (
        <div key={planet.name}>{planet.name}</div>
      ))}
    </div>
  );
};

export default Page;
