import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header.jsx";
import SimulationChart from "./components/SimulationChart.jsx";
import DataTable from "./components/DataTable.jsx";
import AccelerationInputs from "./components/AccelerationInputs.jsx";
import { generateSimulationData } from "./utils/simulation.js";
import CarAnimation from "./components/CarAnimation.jsx";

const DEFAULT_ACCELERATIONS = [2, 5, 9.8];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [accelerations, setAccelerations] = useState(DEFAULT_ACCELERATIONS);

  // Sync dark class on <html> with state
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const data = useMemo(
    () => generateSimulationData(accelerations),
    [accelerations],
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <AccelerationInputs
          accelerations={accelerations}
          onUpdate={setAccelerations}
        />

        <CarAnimation accelerations={accelerations} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SimulationChart
            data={data}
            accelerations={accelerations}
            type="position"
            isDark={isDark}
          />
          <SimulationChart
            data={data}
            accelerations={accelerations}
            type="velocity"
            isDark={isDark}
          />
        </div>

        <DataTable data={data} accelerations={accelerations} />
      </main>

      <footer className="text-center py-6 text-xs text-gray-400 dark:text-gray-600">
        Física Clásica &mdash; x = ½·a·t² &nbsp;|&nbsp; v = a·t
      </footer>
    </div>
  );
}
