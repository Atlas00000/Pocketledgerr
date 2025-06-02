export interface Expense {
  id: string
  user_id: string
  amount: number
  category: string
  description?: string
  date: string
  created_at: string
}

export interface ExpenseInput {
  amount: number
  category: string
  description?: string
  date?: string
} 