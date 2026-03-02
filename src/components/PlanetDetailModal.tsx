import React from "react";

interface PlanetDetailModalProps {
  planet: Planet;
  onClose: () => void;
}

const PlanetDetailModal = ({ planet, onClose }: PlanetDetailModalProps) => {
  const items = [
    {
      name: "Rotation Period",
      value: planet.rotation_period,
    },
    {
      name: "Orbital Period",
      value: planet.orbital_period,
    },
    {
      name: "Diameter",
      value: planet.diameter,
    },
    {
      name: "Gravity",
      value: planet.gravity,
    },
    {
      name: "Surface Water",
      value: planet.surface_water,
    },
  ];

  return (
    <>
      <div className={`modal modal-open`}>
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-4">{planet.name}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.name}>
                <strong>{item.name}:</strong> {item.value}
              </li>
            ))}
          </ul>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetDetailModal;
