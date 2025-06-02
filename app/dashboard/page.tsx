"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LineChart } from "@/components/charts/line-chart"
import { DonutChart } from "@/components/charts/donut-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { ProgressRing } from "@/components/charts/progress-ring"
import { AreaChart } from "@/components/charts/area-chart"
import {
  DollarSign,
  Wallet,
  CreditCard,
  Calculator,
  PieChart,
  Plus,
  Trash2,
  Filter,
  Download,
  ArrowLeft,
  Coins,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Gamepad2,
  Plane,
  MessageCircle,
  BookOpen,
  Target,
  Send,
  Bot,
  User,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Award,
  Trophy,
  Lightbulb,
  Rocket,
  Leaf,
  Bell,
  Settings,
  HelpCircle,
  ExternalLink,
  PiggyBank,
  X,
  ToggleLeft,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
  icon: React.ReactNode
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  message: string
  timestamp: string
}

interface SavingsGoal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: string
  icon: React.ReactNode
}

interface ExpenseCatalogItem {
  id: string
  name: string
  category: string
  averageAmount: number
  icon: React.ReactNode
  description: string
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 45.5,
      category: "Food",
      description: "Lunch at downtown cafe",
      date: "2024-01-15",
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      id: "2",
      amount: 120.0,
      category: "Transport",
      description: "Gas for the week",
      date: "2024-01-14",
      icon: <Car className="w-4 h-4" />,
    },
    {
      id: "3",
      amount: 89.99,
      category: "Entertainment",
      description: "Movie tickets and snacks",
      date: "2024-01-13",
      icon: <Gamepad2 className="w-4 h-4" />,
    },
    {
      id: "4",
      amount: 250.0,
      category: "Shopping",
      description: "Groceries for the week",
      date: "2024-01-12",
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      id: "5",
      amount: 75.0,
      category: "Utilities",
      description: "Internet bill",
      date: "2024-01-11",
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: "6",
      amount: 32.5,
      category: "Food",
      description: "Coffee and breakfast",
      date: "2024-01-10",
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      id: "7",
      amount: 180.0,
      category: "Shopping",
      description: "Clothing purchase",
      date: "2024-01-09",
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      id: "8",
      amount: 65.0,
      category: "Transport",
      description: "Uber rides",
      date: "2024-01-08",
      icon: <Car className="w-4 h-4" />,
    },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hello! I'm your AI financial assistant. How can I help you manage your expenses today?",
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      type: "user",
      message: "What's my spending pattern this month?",
      timestamp: "10:01 AM",
    },
    {
      id: "3",
      type: "bot",
      message:
        "Based on your data, you've spent $857.99 this month. Your top categories are Shopping (50%) and Food (25%). You're 12% under your usual spending pace - great job!",
      timestamp: "10:01 AM",
    },
    {
      id: "4",
      type: "user",
      message: "Any suggestions to save more?",
      timestamp: "10:02 AM",
    },
    {
      id: "5",
      type: "bot",
      message:
        "I notice you spend $39 on average for food. Consider meal prepping - you could save $200/month! Also, your entertainment spending is up 20% this month.",
      timestamp: "10:02 AM",
    },
  ])

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      title: "Emergency Fund",
      target: 5000,
      current: 3200,
      deadline: "2024-12-31",
      category: "Safety",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "2",
      title: "Vacation to Japan",
      target: 3500,
      current: 1800,
      deadline: "2024-08-15",
      category: "Travel",
      icon: <Plane className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "New Laptop",
      target: 1200,
      current: 850,
      deadline: "2024-06-01",
      category: "Technology",
      icon: <Calculator className="w-5 h-5" />,
    },
  ])

  const [expenseCatalog, setExpenseCatalog] = useState<ExpenseCatalogItem[]>([
    {
      id: "1",
      name: "Coffee Shop",
      category: "Food",
      averageAmount: 5.5,
      icon: <Coffee className="w-4 h-4" />,
      description: "Daily coffee and pastries",
    },
    {
      id: "2",
      name: "Gas Station",
      category: "Transport",
      averageAmount: 45.0,
      icon: <Car className="w-4 h-4" />,
      description: "Vehicle fuel costs",
    },
    {
      id: "3",
      name: "Grocery Store",
      category: "Shopping",
      averageAmount: 85.0,
      icon: <ShoppingCart className="w-4 h-4" />,
      description: "Weekly grocery shopping",
    },
    {
      id: "4",
      name: "Movie Theater",
      category: "Entertainment",
      averageAmount: 25.0,
      icon: <Gamepad2 className="w-4 h-4" />,
      description: "Movies and entertainment",
    },
    {
      id: "5",
      name: "Utility Bill",
      category: "Utilities",
      averageAmount: 120.0,
      icon: <Home className="w-4 h-4" />,
      description: "Monthly utility payments",
    },
    {
      id: "6",
      name: "Restaurant",
      category: "Food",
      averageAmount: 35.0,
      icon: <Coffee className="w-4 h-4" />,
      description: "Dining out expenses",
    },
  ])

  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [showInsights, setShowInsights] = useState(false)
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Budget Alert",
      message: "You're approaching your monthly budget limit",
      type: "warning",
      time: "5 min ago",
    },
    {
      id: "2",
      title: "Savings Milestone",
      message: "You've reached 75% of your emergency fund goal!",
      type: "success",
      time: "1 hour ago",
    },
    {
      id: "3",
      title: "Spending Pattern",
      message: "Your entertainment expenses are up 20% this month",
      type: "info",
      time: "2 hours ago",
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const [activeInsight, setActiveInsight] = useState<string | null>(null)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategoryDetails, setShowCategoryDetails] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false)
  const [showInvestmentTracker, setShowInvestmentTracker] = useState(false)
  const [showDebtTracker, setShowDebtTracker] = useState(false)
  const [showBillReminders, setShowBillReminders] = useState(false)
  const [showRecurringExpenses, setShowRecurringExpenses] = useState(false)
  const [showIncomeTracker, setShowIncomeTracker] = useState(false)
  const [showTaxEstimator, setShowTaxEstimator] = useState(false)
  const [showRetirementPlanner, setShowRetirementPlanner] = useState(false)
  const [showEmergencyFund, setShowEmergencyFund] = useState(false)
  const [showNetWorth, setShowNetWorth] = useState(false)
  const [showCashFlow, setShowCashFlow] = useState(false)
  const [showFinancialGoals, setShowFinancialGoals] = useState(false)
  const [showSpendingInsights, setShowSpendingInsights] = useState(false)
  const [showBudgetAlerts, setShowBudgetAlerts] = useState(false)
  const [showSavingsTips, setShowSavingsTips] = useState(false)
  const [showInvestmentTips, setShowInvestmentTips] = useState(false)
  const [showDebtPayoff, setShowDebtPayoff] = useState(false)
  const [showBillPayments, setShowBillPayments] = useState(false)
  const [showRecurringBills, setShowRecurringBills] = useState(false)
  const [showIncomeSources, setShowIncomeSources] = useState(false)
  const [showTaxDeductions, setShowTaxDeductions] = useState(false)
  const [showRetirementGoals, setShowRetirementGoals] = useState(false)
  const [showEmergencyFundGoals, setShowEmergencyFundGoals] = useState(false)
  const [showNetWorthGoals, setShowNetWorthGoals] = useState(false)
  const [showCashFlowGoals, setShowCashFlowGoals] = useState(false)
  const [showFinancialGoalTips, setShowFinancialGoalTips] = useState(false)
  const [showSpendingGoalTips, setShowSpendingGoalTips] = useState(false)
  const [showBudgetGoalTips, setShowBudgetGoalTips] = useState(false)
  const [showSavingsGoalTips, setShowSavingsGoalTips] = useState(false)
  const [showInvestmentGoalTips, setShowInvestmentGoalTips] = useState(false)
  const [showDebtGoalTips, setShowDebtGoalTips] = useState(false)
  const [showBillGoalTips, setShowBillGoalTips] = useState(false)
  const [showRecurringGoalTips, setShowRecurringGoalTips] = useState(false)
  const [showIncomeGoalTips, setShowIncomeGoalTips] = useState(false)
  const [showTaxGoalTips, setShowTaxGoalTips] = useState(false)
  const [showRetirementGoalTips, setShowRetirementGoalTips] = useState(false)
  const [showEmergencyFundGoalTips, setShowEmergencyFundGoalTips] = useState(false)
  const [showNetWorthGoalTips, setShowNetWorthGoalTips] = useState(false)
  const [showCashFlowGoalTips, setShowCashFlowGoalTips] = useState(false)
  const [showAllTools, setShowAllTools] = useState(false)
  const [expandedTool, setExpandedTool] = useState<string | null>(null)
  const [toolHover, setToolHover] = useState<string | null>(null)

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [0, 1])
  const scale = useTransform(scrollY, [0, 200], [0.8, 1])
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const categories = [
    { name: "Food", icon: <Coffee className="w-4 h-4" />, color: "#f97316" },
    { name: "Transport", icon: <Car className="w-4 h-4" />, color: "#3b82f6" },
    { name: "Entertainment", icon: <Gamepad2 className="w-4 h-4" />, color: "#8b5cf6" },
    { name: "Shopping", icon: <ShoppingCart className="w-4 h-4" />, color: "#10b981" },
    { name: "Utilities", icon: <Home className="w-4 h-4" />, color: "#ef4444" },
    { name: "Travel", icon: <Plane className="w-4 h-4" />, color: "#06b6d4" },
  ]

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyBudget = 2000
  const remainingBudget = monthlyBudget - totalExpenses
  const budgetPercentage = (totalExpenses / monthlyBudget) * 100

  const categoryTotals = categories
    .map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0)
      return {
        ...category,
        total,
        label: category.name,
        value: total,
        color: category.color,
      }
    })
    .filter((cat) => cat.total > 0)

  // Generate chart data
  const expenseTrendData = [
    { date: "Jan 1", amount: 120 },
    { date: "Jan 5", amount: 250 },
    { date: "Jan 8", amount: 180 },
    { date: "Jan 10", amount: 320 },
    { date: "Jan 12", amount: 280 },
    { date: "Jan 15", amount: 450 },
    { date: "Jan 18", amount: 380 },
    { date: "Jan 20", amount: 520 },
    { date: "Jan 22", amount: 480 },
    { date: "Jan 25", amount: 650 },
    { date: "Jan 28", amount: 580 },
    { date: "Today", amount: totalExpenses },
  ]

  const monthlyComparisonData = [
    { label: "Oct", value: 1850, color: "#e5e7eb" },
    { label: "Nov", value: 1920, color: "#e5e7eb" },
    { label: "Dec", value: 1780, color: "#e5e7eb" },
    { label: "Jan", value: totalExpenses, color: "#10b981" },
  ]

  const incomeVsExpensesData = [
    { date: "Week 1", income: 1200, expenses: 450 },
    { date: "Week 2", income: 1200, expenses: 380 },
    { date: "Week 3", income: 1200, expenses: 520 },
    { date: "Week 4", income: 1200, expenses: totalExpenses - 1350 },
  ]

  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const categoryData = categories.find((cat) => cat.name === newExpense.category)
      const expense: Expense = {
        id: Date.now().toString(),
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date,
        icon: categoryData?.icon || <DollarSign className="w-4 h-4" />,
      }
      setExpenses([expense, ...expenses])
      setNewExpense({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  const addExpenseFromCatalog = (item: ExpenseCatalogItem) => {
    const categoryData = categories.find((cat) => cat.name === item.category)
    const expense: Expense = {
      id: Date.now().toString(),
      amount: item.averageAmount,
      category: item.category,
      description: item.name,
      date: new Date().toISOString().split("T")[0],
      icon: item.icon,
    }
    setExpenses([expense, ...expenses])
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages([...chatMessages, userMessage])

      // Simulate AI response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          message:
            "I understand you're asking about " +
            newMessage.toLowerCase() +
            ". Based on your spending patterns, I'd recommend reviewing your budget allocation. Would you like me to analyze your recent expenses?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setChatMessages((prev) => [...prev, botResponse])
      }, 1000)

      setNewMessage("")
    }
  }

  const financialInsights = [
    {
      title: "Spending Efficiency",
      value: "87%",
      change: "+5.2%",
      positive: true,
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Your spending efficiency has improved this month",
    },
    {
      title: "Savings Rate",
      value: "23%",
      change: "+3.1%",
      positive: true,
      icon: <PiggyBank className="w-5 h-5" />,
      description: "You're saving more than last month",
    },
    {
      title: "Budget Health",
      value: "92%",
      change: "-2.5%",
      positive: false,
      icon: <Activity className="w-5 h-5" />,
      description: "Slightly below target, but still healthy",
    },
  ]

  const quickActions = [
    {
      title: "Add Expense",
      icon: <Plus className="w-5 h-5" />,
      action: () => setShowAddExpense(true),
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Add Goal",
      icon: <Target className="w-5 h-5" />,
      action: () => setShowAddGoal(true),
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Export Data",
      icon: <Download className="w-5 h-5" />,
      action: () => setShowExportOptions(true),
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "View Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      action: () => setShowReports(true),
      color: "from-orange-500 to-red-600",
    },
  ]

  const financialTools = [
    {
      title: "Budget Planner",
      description: "Plan and track your monthly budget",
      icon: <Calculator className="w-6 h-6" />,
      action: () => setShowBudgetPlanner(true),
      features: [
        "Monthly budget allocation",
        "Category-wise spending limits",
        "Budget vs actual tracking",
        "Custom budget templates"
      ],
      color: "from-green-500 to-emerald-600",
      stats: {
        current: 1850,
        target: 2000,
        trend: "+5.2%"
      }
    },
    {
      title: "Investment Tracker",
      description: "Monitor your investment portfolio",
      icon: <TrendingUp className="w-6 h-6" />,
      action: () => setShowInvestmentTracker(true),
      features: [
        "Portfolio performance",
        "Asset allocation",
        "Investment returns",
        "Risk analysis"
      ],
      color: "from-blue-500 to-cyan-600",
      stats: {
        current: 25000,
        target: 30000,
        trend: "+8.5%"
      }
    },
    {
      title: "Debt Tracker",
      description: "Track and manage your debts",
      icon: <CreditCard className="w-6 h-6" />,
      action: () => setShowDebtTracker(true),
      features: [
        "Debt payoff schedule",
        "Interest calculations",
        "Payment reminders",
        "Debt snowball/avalanche"
      ],
      color: "from-purple-500 to-pink-600",
      stats: {
        current: 5000,
        target: 0,
        trend: "-12.3%"
      }
    },
    {
      title: "Bill Reminders",
      description: "Never miss a payment again",
      icon: <Bell className="w-6 h-6" />,
      action: () => setShowBillReminders(true),
      features: [
        "Payment scheduling",
        "Auto-pay setup",
        "Due date alerts",
        "Payment history"
      ],
      color: "from-orange-500 to-red-600",
      stats: {
        current: 8,
        target: 0,
        trend: "-25%"
      }
    }
  ]

  const financialTips = [
    {
      title: "Emergency Fund",
      tip: "Aim to save 3-6 months of expenses",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      title: "Investment Strategy",
      tip: "Diversify your portfolio for better returns",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Debt Management",
      tip: "Pay high-interest debts first",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Budget Planning",
      tip: "Follow the 50/30/20 rule",
      icon: <Calculator className="w-5 h-5" />,
    },
  ]

  const [userName, setUserName] = useState('Alex')
  const [currentTime] = useState(() => {
    return new Date().toLocaleTimeString()
  })

  useEffect(() => {
    // Move localStorage access to useEffect
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const welcomeMessages = [
    `Ready to take control of your finances, ${userName}?`,
    `Let's make today count, ${userName}!`,
    `Your financial journey continues, ${userName}...`,
    `Time to check your progress, ${userName}!`,
    `Stay on top of your goals, ${userName}!`,
  ]

  const [welcomeMessage] = useState(() => {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-green-200/50 dark:border-gray-700/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.a
                href="/"
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">PocketLedger</span>
              </motion.a>
              <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800">Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
                        <div className="space-y-4">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  notification.type === "warning" ? "bg-red-100 dark:bg-red-900" :
                                  notification.type === "success" ? "bg-green-100 dark:bg-green-900" :
                                  "bg-blue-100 dark:bg-blue-900"
                                }`}>
                                  {notification.type === "warning" ? <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" /> :
                                   notification.type === "success" ? <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" /> :
                                   <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{notification.message}</p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQuickActions(!showQuickActions)}
                >
                  <Zap className="w-5 h-5" />
                </Button>
                <AnimatePresence>
                  {showQuickActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {quickActions.map((action) => (
                            <motion.button
                              key={action.title}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={action.action}
                              className={`p-3 rounded-lg bg-gradient-to-r ${action.color} text-white flex flex-col items-center justify-center space-y-2`}
                            >
                              {action.icon}
                              <span className="text-sm font-medium">{action.title}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <ThemeToggle />
            <motion.a
              href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </motion.a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="flex items-center space-x-3 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <User className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold">
                  Good {currentTime}, {userName}!
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                {welcomeMessage}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    View Insights
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Set Goals
                  </Button>
                </motion.div>
              </div>
        </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"
            />
            
            {/* Animated Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 right-4 flex space-x-2"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <DollarSign className="w-6 h-6 text-white/20" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              >
                <TrendingUp className="w-6 h-6 text-white/20" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              >
                <Target className="w-6 h-6 text-white/20" />
              </motion.div>
            </motion.div>
                    </div>
          </motion.div>

        {/* Header with Financial Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          className="mb-8"
          >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Financial Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400"
              >
                Welcome back! Here's your financial overview
              </motion.p>
                    </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-4 md:mt-0"
            >
              <Button
                onClick={() => setShowInsights(!showInsights)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {showInsights ? "Hide Insights" : "Show Insights"}
              </Button>
          </motion.div>
          </div>

          <AnimatePresence>
            {showInsights && (
          <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {financialInsights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setActiveInsight(activeInsight === insight.title ? null : insight.title)}
                      className="cursor-pointer"
          >
                      <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
              <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                              {insight.icon}
                    </div>
                            <div className={`flex items-center space-x-1 text-sm ${
                              insight.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            }`}>
                              {insight.positive ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                              <span>{insight.change}</span>
                  </div>
                  </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{insight.value}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                          <AnimatePresence>
                            {activeInsight === insight.title && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-4"
                              >
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  <p>Detailed analysis and recommendations will appear here.</p>
                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
              </CardContent>
            </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </motion.div>

        {/* Financial Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Tools</h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => setShowAllTools(!showAllTools)}
              >
                <Settings className="w-4 h-4" />
                <span>Customize Tools</span>
              </Button>
          </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialTools.map((tool, index) => (
          <motion.div
                key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setToolHover(tool.title)}
                onHoverEnd={() => setToolHover(null)}
                onClick={() => setExpandedTool(expandedTool === tool.title ? null : tool.title)}
                className="cursor-pointer"
          >
                <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        {tool.icon}
                    </div>
          <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: toolHover === tool.title ? 1 : 0 }}
                        className="flex items-center space-x-1"
                      >
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {tool.stats.trend}
                        </span>
                        {tool.stats.trend.startsWith('+') ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </motion.div>
                  </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {tool.stats.current} / {tool.stats.target}
                        </span>
                  </div>
                      <Progress
                        value={(tool.stats.current / tool.stats.target) * 100}
                        className="h-2"
                      />
        </div>

                    <AnimatePresence>
                      {expandedTool === tool.title && (
          <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Features:</h4>
                            <ul className="space-y-2">
                              {tool.features.map((feature, idx) => (
                                <motion.li
                                  key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
          <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  tool.action();
                                }}
                                className={`w-full bg-gradient-to-r ${tool.color} text-white`}
                              >
                                Open Tool
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
            ))}
          </div>

          {/* Tool Customization Modal */}
          <AnimatePresence>
            {showAllTools && (
          <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowAllTools(false)}
              >
          <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customize Financial Tools</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowAllTools(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {financialTools.map((tool) => (
                      <div
                        key={tool.title}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
                            {tool.icon}
                </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{tool.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
        </div>
                        </div>
                        <ToggleLeft />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Financial Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                      {tip.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tip.tip}</p>
            </CardContent>
          </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Budget Overview */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                  <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Budget Overview</CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Budget</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${monthlyBudget}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${remainingBudget}</p>
                              </div>
                    </div>
                    <Progress value={budgetPercentage} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">0%</span>
                      <span className="text-gray-600 dark:text-gray-400">50%</span>
                      <span className="text-gray-600 dark:text-gray-400">100%</span>
                    </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            {/* Expense Trends */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                  <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Expense Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="h-[300px]">
                    <LineChart data={expenseTrendData} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Distribution */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <DonutChart data={categoryTotals} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

          {/* Right Column - AI Assistant and Recent Expenses */}
          <div className="space-y-8">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
              <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4">
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ask about your finances..."
                    className="flex-1"
                  />
                      <Button onClick={sendMessage} className="bg-green-500 hover:bg-green-600">
                    <Send className="w-4 h-4" />
                  </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Recent Expenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
              <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {expenses.slice(0, 5).map((expense) => (
                    <motion.div
                        key={expense.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            {expense.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{expense.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{expense.category}</p>
                        </div>
                      </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">${expense.amount}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{expense.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Savings Goals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
                >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                    <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Savings Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savingsGoals.map((goal) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
                        onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            {goal.icon}
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{goal.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{goal.category}</p>
                          </div>
                        </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              ${goal.current} / ${goal.target}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due: {goal.deadline}</p>
                        </div>
                          </div>
                        <Progress
                          value={(goal.current / goal.target) * 100}
                          className="h-2"
                        />
                        <AnimatePresence>
                          {expandedGoal === goal.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-2"
                            >
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>Progress: {Math.round((goal.current / goal.target) * 100)}%</p>
                                <p>Remaining: ${goal.target - goal.current}</p>
                                <p>Days left: {Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}</p>
                        </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                </motion.div>
              ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
        </div>
      </div>
    </div>
  )
}
