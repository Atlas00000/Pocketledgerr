"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BarData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarData[]
  width?: number
  height?: number
  animate?: boolean
  showValues?: boolean
}

export function BarChart({ data, width = 400, height = 300, animate = true, showValues = true }: BarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  if (!data || data.length === 0) return null

  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = (chartWidth / data.length) * 0.8
  const barSpacing = (chartWidth / data.length) * 0.2

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <g key={index}>
            <line
              x1={padding}
              y1={padding + ratio * chartHeight}
              x2={width - padding}
              y2={padding + ratio * chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x={padding - 10}
              y={padding + ratio * chartHeight + 4}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              ${(maxValue * (1 - ratio)).toFixed(0)}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
          const y = padding + chartHeight - barHeight
          const color = item.color || "#10b981"

          return (
            <g key={index}>
              {/* Bar */}
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx="4"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                initial={animate ? { height: 0, y: padding + chartHeight } : {}}
                animate={
                  animate
                    ? {
                        height: barHeight,
                        y,
                        opacity: hoveredBar === null || hoveredBar === index ? 1 : 0.7,
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: animate ? index * 0.1 : 0,
                  opacity: { duration: 0.2 },
                }}
                whileHover={{ scale: 1.05 }}
              />

              {/* Value label */}
              {showValues && (
                <motion.text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                  initial={animate ? { opacity: 0 } : {}}
                  animate={animate ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: animate ? 0.8 + index * 0.1 : 0 }}
                >
                  ${item.value.toFixed(0)}
                </motion.text>
              )}

              {/* X-axis label */}
              <motion.text
                x={x + barWidth / 2}
                y={height - padding + 20}
                textAnchor="middle"
                className="text-xs fill-gray-600"
                initial={animate ? { opacity: 0 } : {}}
                animate={animate ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: animate ? 1 + index * 0.1 : 0 }}
              >
                {item.label}
              </motion.text>
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {hoveredBar !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-10"
          style={{
            left: padding + hoveredBar * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2 - 40,
            top: padding + chartHeight - (data[hoveredBar].value / maxValue) * chartHeight - 50,
          }}
        >
          <div className="font-medium">{data[hoveredBar].label}</div>
          <div className="text-xs opacity-75">${data[hoveredBar].value.toFixed(2)}</div>
        </motion.div>
      )}
    </div>
  )
}
