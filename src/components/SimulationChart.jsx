import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'

const COLORS = ['#60A5FA', '#34D399', '#FBBF24']

function CustomTooltip({ active, payload, label, unit, isDark }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg border p-3 text-xs shadow-xl"
      style={{
        backgroundColor: isDark ? '#111827' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        color: isDark ? '#f9fafb' : '#111827',
      }}
    >
      <p className="font-semibold mb-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
        t = {Number(label).toFixed(1)} s
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.stroke }}
          />
          <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{entry.name}:</span>
          <span className="font-mono font-medium ml-auto pl-3">
            {Number(entry.value).toFixed(2)} {unit}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SimulationChart({ data, accelerations, type, isDark }) {
  const isPos = type === 'position'
  const prefix = isPos ? 'pos' : 'vel'
  const title = isPos ? 'Posición vs Tiempo' : 'Velocidad vs Tiempo'
  const yLabel = isPos ? 'Posición (m)' : 'Velocidad (m/s)'
  const unit = isPos ? 'm' : 'm/s'

  const gridColor = isDark ? '#1f2937' : '#f3f4f6'
  const axisColor = isDark ? '#374151' : '#d1d5db'
  const tickColor = isDark ? '#6b7280' : '#9ca3af'
  const labelColor = isDark ? '#9ca3af' : '#6b7280'

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="t"
            type="number"
            domain={[0, 10]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tick={{ fill: tickColor, fontSize: 11 }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
            label={{
              value: 'Tiempo (s)',
              position: 'insideBottom',
              offset: -18,
              fill: labelColor,
              fontSize: 12,
            }}
          />
          <YAxis
            tick={{ fill: tickColor, fontSize: 11 }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
            tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)}
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 15,
              fill: labelColor,
              fontSize: 12,
            }}
            width={60}
          />
          <Tooltip
            content={(props) => <CustomTooltip {...props} unit={unit} isDark={isDark} />}
          />
          <Legend
            wrapperStyle={{ paddingTop: 8, fontSize: 12 }}
            formatter={(value) => (
              <span style={{ color: isDark ? '#d1d5db' : '#374151' }}>{value}</span>
            )}
          />
          {accelerations.map((a, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={`${prefix}${idx}`}
              stroke={COLORS[idx]}
              name={`a = ${a} m/s²`}
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 4, strokeWidth: 0 }}
              animationDuration={500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
