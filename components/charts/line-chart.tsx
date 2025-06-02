"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface DataPoint {
  date: string
  amount: number
  label?: string
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
  showDots?: boolean
  animate?: boolean
}

export function LineChart({
  data,
  width = 400,
  height = 200,
  color = "#10b981",
  showDots = true,
  animate = true,
}: LineChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  if (!data || data.length === 0) return null

  const padding = 20
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxAmount = Math.max(...data.map((d) => d.amount))
  const minAmount = Math.min(...data.map((d) => d.amount))
  const amountRange = maxAmount - minAmount || 1

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = padding + ((maxAmount - point.amount) / amountRange) * chartHeight
    return { x, y, ...point }
  })

  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? "M" : "L"
    return `${path} ${command} ${point.x} ${point.y}`
  }, "")

  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <line
            key={index}
            x1={padding}
            y1={padding + ratio * chartHeight}
            x2={width - padding}
            y2={padding + ratio * chartHeight}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={animate ? { opacity: 0 } : {}}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : {}}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Data points */}
        {showDots &&
          points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? 6 : 4}
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
              initial={animate ? { scale: 0 } : {}}
              animate={animate ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
      </svg>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-10"
          style={{
            left: points[hoveredPoint].x - 40,
            top: points[hoveredPoint].y - 50,
          }}
        >
          <div className="font-medium">${points[hoveredPoint].amount.toFixed(2)}</div>
          <div className="text-xs opacity-75">{points[hoveredPoint].date}</div>
        </motion.div>
      )}
    </div>
  )
}
