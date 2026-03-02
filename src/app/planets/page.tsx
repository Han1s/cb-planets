"use client";

import React from "react";
import { usePlanets } from "@/context/PlanetsContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePlanets } from "@/actions/revalidatePlanets";

interface PlanetsPageProps {
  searchParams: { page?: string };
}

const PAGE_SIZE = 10;

const Page = (props: PlanetsPageProps) => {
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

  return (
    <div>
      {paginatedPlanets.map((planet) => (
        <div key={planet.name}>{planet.name}</div>
      ))}

      <div style={{ marginTop: 20 }}>
        {page > 1 && <Link href={`/planets?page=${page - 1}`}>← Previous</Link>}

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <Link href={`/planets?page=${page + 1}`}>Next →</Link>
        )}
      </div>

      <button className={"btn brn-prinmary"} onClick={refreshPlanetsHandler}>
        Refresh planets
      </button>
    </div>
  );
};

export default Page;
