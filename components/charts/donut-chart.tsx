"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface DonutData {
  label: string
  value: number
  color: string
  icon?: React.ReactNode
}

interface DonutChartProps {
  data: DonutData[]
  size?: number
  innerRadius?: number
  animate?: boolean
}

export function DonutChart({ data, size = 200, innerRadius = 60, animate = true }: DonutChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  if (!data || data.length === 0) return null

  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2

  const total = data.reduce((sum, item) => sum + item.value, 0)

  let currentAngle = -90 // Start from top

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = angle > 180 ? 1 : 0

    const x1 = centerX + radius * Math.cos(startAngleRad)
    const y1 = centerY + radius * Math.sin(startAngleRad)
    const x2 = centerX + radius * Math.cos(endAngleRad)
    const y2 = centerY + radius * Math.sin(endAngleRad)

    const innerX1 = centerX + innerRadius * Math.cos(startAngleRad)
    const innerY1 = centerY + innerRadius * Math.sin(startAngleRad)
    const innerX2 = centerX + innerRadius * Math.cos(endAngleRad)
    const innerY2 = centerY + innerRadius * Math.sin(endAngleRad)

    const pathData = [
      `M ${innerX1} ${innerY1}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${innerX2} ${innerY2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
      "Z",
    ].join(" ")

    currentAngle += angle

    return {
      ...item,
      pathData,
      percentage,
      startAngle,
      endAngle,
      index,
    }
  })

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {segments.map((segment, index) => (
          <motion.path
            key={index}
            d={segment.pathData}
            fill={segment.color}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
            initial={animate ? { opacity: 0, scale: 0 } : {}}
            animate={
              animate
                ? {
                    opacity: 1,
                    scale: hoveredSegment === index ? 1.05 : 1,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: animate ? index * 0.1 : 0,
              scale: { duration: 0.2 },
            }}
            whileHover={{ scale: 1.05 }}
          />
        ))}

        {/* Center circle */}
        <circle cx={centerX} cy={centerY} r={innerRadius} fill="white" stroke="#e5e7eb" strokeWidth="2" />

        {/* Center text */}
        <text x={centerX} y={centerY - 5} textAnchor="middle" className="text-sm font-medium fill-gray-900">
          Total
        </text>
        <text x={centerX} y={centerY + 15} textAnchor="middle" className="text-lg font-bold fill-gray-900">
          ${total.toFixed(0)}
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {segments.map((segment, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              hoveredSegment === index ? "bg-gray-50" : ""
            }`}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
            initial={animate ? { opacity: 0, x: -20 } : {}}
            animate={animate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: animate ? 0.8 + index * 0.1 : 0 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <div className="flex items-center space-x-2">
                {segment.icon}
                <span className="text-sm font-medium text-gray-900">{segment.label}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">${segment.value.toFixed(2)}</div>
              <div className="text-xs text-gray-500">{segment.percentage.toFixed(1)}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
