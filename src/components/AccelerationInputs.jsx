import React, { useState } from 'react'

const COLORS = ['#60A5FA', '#34D399', '#FBBF24']
const DEFAULT = [2, 5, 9.8]

export default function AccelerationInputs({ accelerations, onUpdate }) {
  const [inputs, setInputs] = useState(accelerations.map(String))
  const [error, setError] = useState('')

  const handleChange = (idx, value) => {
    const next = [...inputs]
    next[idx] = value
    setInputs(next)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = inputs.map(v => parseFloat(v))
    if (parsed.some(v => isNaN(v) || v <= 0 || !isFinite(v))) {
      setError('Ingresa valores de aceleración positivos y válidos para las tres entradas.')
      return
    }
    setError('')
    onUpdate(parsed)
  }

  const handleReset = () => {
    setInputs(DEFAULT.map(String))
    setError('')
    onUpdate(DEFAULT)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Parámetros de Simulación
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Define las tres aceleraciones y ejecuta la simulación
          </p>
        </div>
        <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">
          <span className="text-blue-500">x</span> = ½·a·t²&nbsp;&nbsp;
          <span className="text-emerald-500">v</span> = a·t
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {inputs.map((val, idx) => (
            <div key={idx}>
              <label
                className="flex items-center gap-1.5 text-sm font-medium mb-1.5"
                style={{ color: COLORS[idx] }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                Aceleración {idx + 1}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  min="0.01"
                  value={val}
                  onChange={e => handleChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">m/s²</span>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mb-4">
            &#9888; {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Ejecutar Simulación
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            Restablecer
          </button>
        </div>
      </form>
    </div>
  )
}
