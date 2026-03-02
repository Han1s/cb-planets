"use client";

import React from "react";
import { usePlanets } from "@/context/PlanetsContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PlanetsPageProps {
  searchParams: { page?: string };
}

const PAGE_SIZE = 10;

const Page = (props: PlanetsPageProps) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const { planets } = usePlanets();

  const totalPages = Math.ceil(planets.length / 10);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedPlanets = planets.slice(startIndex, endIndex);

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
    </div>
  );
};

export default Page;
