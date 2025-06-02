import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Expense, ExpenseInput } from '@/types/expense'

export const expenseApi = {
  // Create expense
  async create(expense: ExpenseInput) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
    
    if (error) throw error
    return data[0] as Expense
  },

  // Get user's expenses
  async getAll() {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data as Expense[]
  },

  // Update expense
  async update(id: string, updates: Partial<ExpenseInput>) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Expense
  },

  // Delete expense
  async delete(id: string) {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
} 