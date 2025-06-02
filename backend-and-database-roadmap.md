# Backend & Database Implementation Roadmap

## Overview
This roadmap outlines the implementation plan for PocketLedger's backend and database using Supabase. The focus is on quick wins and core functionality, prioritizing basic features and aesthetics over complexity.

## Phase 1: Supabase Setup & Basic Auth (Week 1)

### 1. Supabase Project Setup
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Database Schema (Basic Tables)
```sql
-- users table (handled by Supabase Auth)
-- expenses table
create table expenses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  amount decimal not null,
  category text not null,
  description text,
  date timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable RLS (Row Level Security)
alter table expenses enable row level security;

-- Basic RLS policies
create policy "Users can only see their own expenses"
  on expenses for select
  using (auth.uid() = user_id);

create policy "Users can only insert their own expenses"
  on expenses for insert
  with check (auth.uid() = user_id);
```

## Phase 2: Core API Functions (Week 1-2)

### 1. Expense Management
```typescript
// lib/api/expenses.ts
export const expenseApi = {
  // Create expense
  async create(expense: ExpenseInput) {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Get user's expenses
  async getAll() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Delete expense
  async delete(id: string) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
```

### 2. Auth Integration
```typescript
// lib/auth.ts
export const auth = {
  // Sign in with magic link
  async signIn(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}
```

## Phase 3: Frontend Integration (Week 2)

### 1. Auth Context
```typescript
// contexts/AuthContext.tsx
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 2. Expense Hooks
```typescript
// hooks/useExpenses.ts
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExpenses()
  }, [])

  async function loadExpenses() {
    try {
      const data = await expenseApi.getAll()
      setExpenses(data)
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    expenses,
    loading,
    addExpense: async (expense: ExpenseInput) => {
      const newExpense = await expenseApi.create(expense)
      setExpenses(prev => [newExpense, ...prev])
    },
    deleteExpense: async (id: string) => {
      await expenseApi.delete(id)
      setExpenses(prev => prev.filter(e => e.id !== id))
    }
  }
}
```

## Phase 4: Basic Features Implementation (Week 2-3)

### 1. CSV Export
```typescript
// utils/export.ts
export function exportToCSV(expenses: Expense[]) {
  const headers = ['Date', 'Category', 'Amount', 'Description']
  const rows = expenses.map(e => [
    new Date(e.date).toLocaleDateString(),
    e.category,
    e.amount,
    e.description
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
}
```

### 2. Basic Category Totals
```typescript
// utils/calculations.ts
export function calculateCategoryTotals(expenses: Expense[]) {
  return expenses.reduce((acc, expense) => {
    const category = expense.category
    acc[category] = (acc[category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
}
```

## Implementation Timeline

### Week 1: Foundation
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Implement basic auth
- [ ] Set up API functions

### Week 2: Core Features
- [ ] Integrate auth with frontend
- [ ] Implement expense CRUD
- [ ] Add basic data visualization
- [ ] Set up CSV export

### Week 3: Polish & Testing
- [ ] Add error handling
- [ ] Implement loading states
- [ ] Add basic animations
- [ ] Test core functionality

## Key Principles

1. **Keep it Simple**
   - Start with basic tables
   - Use simple queries
   - Avoid complex relationships

2. **Quick Wins**
   - Focus on core features first
   - Use Supabase's built-in features
   - Leverage existing UI components

3. **Progressive Enhancement**
   - Start with basic functionality
   - Add features incrementally
   - Keep the code maintainable

## Dependencies

- @supabase/supabase-js
- @supabase/auth-helpers-nextjs
- next-auth (for additional auth features if needed)

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Notes

- This roadmap focuses on MVP features as defined in the PRD
- Authentication will use email-based magic links
- Data visualization will use basic charts initially
- CSV export will use native JavaScript
- All features will be responsive and mobile-friendly 