import React from "react";

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">
            Simulación de Aceleración Uniforme
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Movimiento Uniformemente Acelerado &mdash; Física Clásica
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium border border-blue-200 dark:border-blue-800">
              Sistemas &amp; Programación
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
