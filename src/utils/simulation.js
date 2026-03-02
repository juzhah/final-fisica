/**
 * Generates uniform acceleration simulation data.
 * Equations: x = ½·a·t²  |  v = a·t
 * Range: t = 0..10 s, sampled every 0.1 s (101 points)
 */
export function generateSimulationData(accelerations) {
  const data = []
  for (let i = 0; i <= 100; i++) {
    const t = parseFloat((i * 0.1).toFixed(1))
    const point = { t }
    accelerations.forEach((a, idx) => {
      point[`pos${idx}`] = parseFloat((0.5 * a * t * t).toFixed(4))
      point[`vel${idx}`] = parseFloat((a * t).toFixed(4))
    })
    data.push(point)
  }
  return data
}
