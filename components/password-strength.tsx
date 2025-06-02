'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password = '', className }: PasswordStrengthProps) {
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])

  useEffect(() => {
    let newScore = 0
    const newFeedback: string[] = []

    // Length check
    if (password.length >= 8) {
      newScore += 1
    } else {
      newFeedback.push('At least 8 characters')
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      newScore += 1
    } else {
      newFeedback.push('Include uppercase letter')
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      newScore += 1
    } else {
      newFeedback.push('Include lowercase letter')
    }

    // Number check
    if (/[0-9]/.test(password)) {
      newScore += 1
    } else {
      newFeedback.push('Include a number')
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      newScore += 1
    } else {
      newFeedback.push('Include a special character')
    }

    setScore(newScore)
    setFeedback(newFeedback)
  }, [password])

  const getStrengthColor = () => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500'
      case 2:
      case 3:
        return 'bg-yellow-500'
      case 4:
      case 5:
        return 'bg-green-500'
      default:
        return 'bg-gray-200'
    }
  }

  const getStrengthText = () => {
    switch (score) {
      case 0:
      case 1:
        return 'Very Weak'
      case 2:
      case 3:
        return 'Medium'
      case 4:
      case 5:
        return 'Strong'
      default:
        return 'No Password'
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className={cn(
          'font-medium',
          score <= 2 ? 'text-red-500' :
          score === 3 ? 'text-yellow-500' :
          'text-green-500'
        )}>
          {getStrengthText()}
        </span>
        <span className="text-gray-500">
          {score}/5
        </span>
      </div>
      {feedback.length > 0 && (
        <div className="text-sm text-gray-500">
          Needs: {feedback.join(', ')}
        </div>
      )}
    </div>
  )
} 