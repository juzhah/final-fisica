import React from 'react'
import * as XLSX from 'xlsx'

const COLORS = ['#60A5FA', '#34D399', '#FBBF24']

function exportToExcel(data, accelerations) {
  const headers = [
    't (s)',
    ...accelerations.map(a => `Pos. a=${a} (m)`),
    ...accelerations.map(a => `Vel. a=${a} (m/s)`),
  ]
  const rows = data.map(row => [
    row.t,
    ...accelerations.map((_, idx) => row[`pos${idx}`]),
    ...accelerations.map((_, idx) => row[`vel${idx}`]),
  ])
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Simulación')
  XLSX.writeFile(wb, 'simulacion-aceleracion.xlsx')
}

export default function DataTable({ data, accelerations }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Tabla de Datos
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {data.length} muestras &middot; &Delta;t = 0.1 s
          </span>
          <button
            onClick={() => exportToExcel(data, accelerations)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exportar Excel
          </button>
        </div>
      </div>

      <div
        className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-800"
        style={{ maxHeight: '420px' }}
      >
        <table className="w-full text-xs min-w-max">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                t (s)
              </th>
              {accelerations.map((a, idx) => (
                <th
                  key={`ph-${idx}`}
                  className="px-4 py-3 text-right font-semibold border-b border-gray-200 dark:border-gray-700"
                  style={{ color: COLORS[idx] }}
                >
                  Pos. a={a} (m)
                </th>
              ))}
              {accelerations.map((a, idx) => (
                <th
                  key={`vh-${idx}`}
                  className="px-4 py-3 text-right font-semibold border-b border-gray-200 dark:border-gray-700"
                  style={{ color: COLORS[idx] }}
                >
                  Vel. a={a} (m/s)
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/10 ${
                  i % 2 === 1 ? 'bg-gray-50/60 dark:bg-gray-800/30' : ''
                }`}
              >
                <td className="px-4 py-2 font-mono font-medium text-gray-700 dark:text-gray-300">
                  {row.t.toFixed(1)}
                </td>
                {accelerations.map((_, idx) => (
                  <td
                    key={`p-${idx}`}
                    className="px-4 py-2 text-right font-mono text-gray-600 dark:text-gray-400"
                  >
                    {row[`pos${idx}`].toFixed(2)}
                  </td>
                ))}
                {accelerations.map((_, idx) => (
                  <td
                    key={`v-${idx}`}
                    className="px-4 py-2 text-right font-mono text-gray-600 dark:text-gray-400"
                  >
                    {row[`vel${idx}`].toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
