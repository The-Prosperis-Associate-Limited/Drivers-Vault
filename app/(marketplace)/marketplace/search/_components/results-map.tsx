"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  center: [number, number];
}

// No pins yet — drivers carry no coordinates, only state and LGA. The map gives
// the searched area, nothing more.
export const ResultsMap = function ({ center }: Props) {
  return (
    // Leaflet's internal panes carry triple-digit z-indexes; isolating the map
    // keeps them from stacking above dialog overlays.
    <div className="isolate z-0 h-full">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full min-h-[480px] w-full rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
