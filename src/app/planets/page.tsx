"use client";

import React from "react";
import { usePlanets } from "@/context/PlanetsContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePlanets } from "@/actions/revalidatePlanets";
import PlanetCard from "@/components/PlanetCard";

const PAGE_SIZE = 10;

const Page = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const router = useRouter();

  const { planets } = usePlanets();

  const totalPages = Math.ceil(planets.length / 10);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedPlanets = planets.slice(startIndex, endIndex);

  const refreshPlanetsHandler = async () => {
    await revalidatePlanets();
    router.refresh();
  };

  const pageButtonClasses = "btn btn-outline";

  return (
    <div className={"flex flex-col gap-10"}>
      <h1 className={"text text-4xl font-bold text-center"}>
        Planets from Star Wars
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPlanets.map((planet: Planet) => (
          <PlanetCard planet={planet} key={planet.name} />
        ))}
      </div>

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
        <button className={"btn btn-accent"} onClick={refreshPlanetsHandler}>
          Refresh planets
        </button>
      </div>
    </div>
  );
};

export default Page;
