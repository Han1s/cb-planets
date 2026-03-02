"use client";

import React, { useState } from "react";
import { usePlanets } from "@/context/PlanetsContext";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { revalidatePlanets } from "@/actions/revalidatePlanets";
import PlanetCard from "@/components/PlanetCard";
import PlanetDetailModal from "@/components/PlanetDetailModal";

const PAGE_SIZE = 10;

const Page = () => {
  const [selectedPlanet, setSelectedPlanet] = useState("");

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const router = useRouter();

  const { planets } = usePlanets();

  if (typeof planets === "string") {
    return (
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-4xl text-red-500"}>Oops, something went wrong!</h1>{" "}
        There was an error getting the planets. Please try again later.
      </div>
    );
  }

  const totalPages = Math.ceil(planets.length / 10);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedPlanets = planets.slice(startIndex, endIndex);

  const refreshPlanetsHandler = async () => {
    await revalidatePlanets();
    router.refresh();
  };

  const pageButtonClasses = "btn btn-outline";

  if (page > totalPages) {
    notFound();
  }

  const hasNoPlanets = !paginatedPlanets.length;

  const closeDetailsHandler = () => {
    setSelectedPlanet("");
  };

  const viewDetailsHandler = (planetName: string) => {
    setSelectedPlanet(planetName);
  };

  return (
    <div className={"flex flex-col gap-10"}>
      {selectedPlanet && (
        <PlanetDetailModal
          planet={
            paginatedPlanets.find((planet) => planet.name === selectedPlanet)!
          }
          onClose={closeDetailsHandler}
        />
      )}
      <h1 className={"text text-4xl font-bold text-center"}>
        Planets from Star Wars
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hasNoPlanets ? (
          <div className="text-center mt-10 text-gray-500">
            No planets found.
          </div>
        ) : (
          paginatedPlanets.map((planet: Planet) => (
            <PlanetCard
              planet={planet}
              key={planet.name}
              viewDetails={viewDetailsHandler}
            />
          ))
        )}
      </div>

      {!hasNoPlanets && (
        <>
          <div className="flex justify-center items-center gap-4">
            {page > 1 && (
              <Link
                href={`/planets?page=${page - 1}`}
                className={pageButtonClasses}
              >
                ← Previous
              </Link>
            )}

            <span className="badge badge-lg">
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={`/planets?page=${page + 1}`}
                className={pageButtonClasses}
              >
                Next →
              </Link>
            )}
          </div>

          <div className={"text-center"}>
            <button
              className={"btn btn-accent"}
              onClick={refreshPlanetsHandler}
            >
              Reload planets
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
