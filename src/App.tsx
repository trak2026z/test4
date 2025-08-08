import React from "react";
import { EpicPhoto } from "./components/EpicPhoto";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="text-3-lg font-bold text-white text-center pt-6">
        NASA EPIC – zdięcie dnia
      </h1>
      <EpicPhoto />
    </div>
  );
}
