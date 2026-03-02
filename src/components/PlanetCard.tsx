import React from "react";

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard = ({ planet }: PlanetCardProps) => {
  const populationNumber = isNaN(Number(planet.population))
    ? "Unknown"
    : new Intl.NumberFormat().format(Number(planet.population));

  const fields = [
    {
      name: "Climate",
      value: planet.climate,
    },
    {
      name: "Terrain",
      value: planet.terrain,
    },
    {
      name: "Population",
      value: populationNumber,
    },
  ];

  return (
    <div key={planet.name} className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{planet.name}</h2>
        {fields.map((field) => {
          return (
            <p key={field.name}>
              <strong>{field.name}:</strong> {field.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PlanetCard;
