'use client'

import { useState, useEffect } from 'react'
import { expenseApi } from '@/lib/api/expenses'
import type { Expense, ExpenseInput } from '@/types/expense'
import { useAuth } from '@/contexts/AuthContext'

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadExpenses()
    }
  }, [user])

  async function loadExpenses() {
    try {
      setLoading(true)
      setError(null)
      const data = await expenseApi.getAll()
      setExpenses(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async (expense: ExpenseInput) => {
    try {
      setError(null)
      const newExpense = await expenseApi.create(expense)
      setExpenses(prev => [newExpense, ...prev])
      return newExpense
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const updateExpense = async (id: string, updates: Partial<ExpenseInput>) => {
    try {
      setError(null)
      const updatedExpense = await expenseApi.update(id, updates)
      setExpenses(prev => 
        prev.map(expense => 
          expense.id === id ? updatedExpense : expense
        )
      )
      return updatedExpense
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      setError(null)
      await expenseApi.delete(id)
      setExpenses(prev => prev.filter(expense => expense.id !== id))
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refresh: loadExpenses
  }
} 