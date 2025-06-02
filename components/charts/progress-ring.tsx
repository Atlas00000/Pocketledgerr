"use client"

import { motion } from "framer-motion"

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  animate?: boolean
  showPercentage?: boolean
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#10b981",
  backgroundColor = "#e5e7eb",
  animate = true,
  showPercentage = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          initial={animate ? { strokeDashoffset: circumference } : {}}
          animate={animate ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Percentage text */}
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={animate ? { opacity: 0, scale: 0.5 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-lg font-bold text-gray-900">{Math.round(progress)}%</span>
        </motion.div>
      )}
    </div>
  )
}
