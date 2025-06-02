"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AreaData {
  date: string
  income: number
  expenses: number
}

interface AreaChartProps {
  data: AreaData[]
  width?: number
  height?: number
  animate?: boolean
}

export function AreaChart({ data, width = 500, height = 300, animate = true }: AreaChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  if (!data || data.length === 0) return null

  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses]))
  const minValue = 0

  const createPath = (values: number[]) => {
    return values.reduce((path, value, index) => {
      const x = padding + (index / (values.length - 1)) * chartWidth
      const y = padding + ((maxValue - value) / (maxValue - minValue)) * chartHeight
      const command = index === 0 ? "M" : "L"
      return `${path} ${command} ${x} ${y}`
    }, "")
  }

  const createAreaPath = (values: number[]) => {
    const linePath = createPath(values)
    const firstX = padding
    const lastX = padding + chartWidth
    const bottomY = padding + chartHeight
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
  }

  const incomeValues = data.map((d) => d.income)
  const expenseValues = data.map((d) => d.expenses)

  const incomePath = createPath(incomeValues)
  const expensePath = createPath(expenseValues)
  const incomeAreaPath = createAreaPath(incomeValues)
  const expenseAreaPath = createAreaPath(expenseValues)

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </linearGradient>
        </defs>

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
              ${((maxValue * (1 - ratio)) / 1000).toFixed(0)}k
            </text>
          </g>
        ))}

        {/* Expense area */}
        <motion.path
          d={expenseAreaPath}
          fill="url(#expenseGradient)"
          initial={animate ? { opacity: 0 } : {}}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Income area */}
        <motion.path
          d={incomeAreaPath}
          fill="url(#incomeGradient)"
          initial={animate ? { opacity: 0 } : {}}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Expense line */}
        <motion.path
          d={expensePath}
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : {}}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Income line */}
        <motion.path
          d={incomePath}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : {}}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Data points */}
        {data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth
          const incomeY = padding + ((maxValue - point.income) / (maxValue - minValue)) * chartHeight
          const expenseY = padding + ((maxValue - point.expenses) / (maxValue - minValue)) * chartHeight

          return (
            <g key={index}>
              {/* Income point */}
              <motion.circle
                cx={x}
                cy={incomeY}
                r={hoveredPoint === index ? 6 : 4}
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                initial={animate ? { scale: 0 } : {}}
                animate={animate ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
              />

              {/* Expense point */}
              <motion.circle
                cx={x}
                cy={expenseY}
                r={hoveredPoint === index ? 6 : 4}
                fill="#ef4444"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                initial={animate ? { scale: 0 } : {}}
                animate={animate ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              />
            </g>
          )
        })}

        {/* X-axis labels */}
        {data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth
          return (
            <motion.text
              key={index}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-xs fill-gray-600"
              initial={animate ? { opacity: 0 } : {}}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
            >
              {point.date}
            </motion.text>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-gray-900 text-white px-4 py-3 rounded-lg text-sm pointer-events-none z-10"
          style={{
            left: padding + (hoveredPoint / (data.length - 1)) * chartWidth - 60,
            top: padding - 80,
          }}
        >
          <div className="font-medium mb-1">{data[hoveredPoint].date}</div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Income: ${data[hoveredPoint].income.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Expenses: ${data[hoveredPoint].expenses.toFixed(2)}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
