import React, { useState, useEffect, useRef } from 'react'

const COLORS = ['#60A5FA', '#34D399', '#FBBF24']
const EMOJIS = ['🚗', '🚙', '🏎️']

// Real-time duration for a full t=0→10 run (ms), then a pause before reset
const RUN_MS = 8000
const PAUSE_MS = 1500
const CYCLE_MS = RUN_MS + PAUSE_MS
const PHYSICS_MAX_T = 10

export default function CarAnimation({ accelerations }) {
  const [t, setT] = useState(0)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    startRef.current = null // reset whenever accelerations change
  }, [accelerations])

  useEffect(() => {
    const animate = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = (timestamp - startRef.current) % CYCLE_MS
      const physicsT =
        elapsed <= RUN_MS ? (elapsed / RUN_MS) * PHYSICS_MAX_T : PHYSICS_MAX_T
      setT(physicsT)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const maxPos = Math.max(...accelerations.map(a => 0.5 * a * PHYSICS_MAX_T ** 2))

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Animación
        </h3>
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
          t = {t.toFixed(1)} s
        </span>
      </div>

      <div className="space-y-4">
        {accelerations.map((a, idx) => {
          const pos = 0.5 * a * t * t
          const vel = a * t
          const pct = maxPos > 0 ? Math.min((pos / maxPos) * 100, 100) : 0

          return (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-mono font-semibold" style={{ color: COLORS[idx] }}>
                  a = {a} m/s²
                </span>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  {pos.toFixed(1)} m &nbsp;·&nbsp; {vel.toFixed(1)} m/s
                </span>
              </div>

              {/* Track */}
              <div
                className="relative h-11 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
              >
                {/* Colored fill showing covered distance */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: COLORS[idx],
                    opacity: 0.15,
                  }}
                />

                {/* Dashed center line */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />

                {/* Start flag */}
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-sm select-none">🏁</span>

                {/* Finish flag */}
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-sm select-none opacity-40">🏁</span>

                {/* Car emoji */}
                <div
                  className="absolute top-1/2 text-2xl select-none leading-none"
                  style={{
                    left: `${pct}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {EMOJIS[idx]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
