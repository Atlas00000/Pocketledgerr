"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSpinner } from "@/components/loading-spinner"
import { LazyImage } from "@/components/lazy-image"
import Head from 'next/head'
import {
  ArrowRight,
  Wallet,
  CreditCard,
  Calculator,
  Eye,
  Star,
  ChevronDown,
  DollarSign,
  Coins,
  BarChart3,
  Target,
  MessageCircle,
  BookOpen,
  PiggyBank,
  Shield,
  Smartphone,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Users,
  Globe,
  Award,
  CheckCircle2,
  Building2,
  Trophy,
  Lightbulb,
  Rocket,
  Leaf,
  Clock,
  TrendingUp,
  ChevronUp,
  Check,
  X,
  Plus,
  Minus,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { smoothScrollTo } from "@/lib/utils"
import { transitions } from "@/lib/utils"
import Link from 'next/link'

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  const [activeStory, setActiveStory] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [0, 1])
  const scale = useTransform(scrollY, [0, 200], [0.8, 1])

  useEffect(() => {
    setIsVisible(true)

    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4)
    }, 3000)

    // Auto-rotate success stories
    const storyInterval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % successStories.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(storyInterval)
    }
  }, [])

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Wallet",
      description: "Track expenses on-the-go with our intuitive mobile interface",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "Get instant financial advice and expense insights through chat",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Expense Catalog",
      description: "Browse and add expenses from our comprehensive category library",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Savings Goals",
      description: "Set and track financial goals with visual progress indicators",
      color: "from-orange-500 to-red-400",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "Your financial data protected with enterprise encryption",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "AI-powered insights and spending pattern analysis",
      color: "from-blue-500 to-cyan-400",
    },
  ]

  const stats = [
    { value: "2.4M+", label: "Expenses Tracked", icon: <DollarSign className="w-5 h-5" />, trend: "+12%" },
    { value: "85K+", label: "Active Users", icon: <Wallet className="w-5 h-5" />, trend: "+8%" },
    { value: "99.9%", label: "Uptime", icon: <Shield className="w-5 h-5" />, trend: "0%" },
    { value: "4.9★", label: "User Rating", icon: <Star className="w-5 h-5" />, trend: "+0.2" },
  ]

  const financialWidgets = [
    {
      title: "Monthly Savings",
      value: "$1,247",
      change: "+15.3%",
      positive: true,
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      title: "Budget Efficiency",
      value: "87%",
      change: "+5.2%",
      positive: true,
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Expense Reduction",
      value: "$342",
      change: "-8.1%",
      positive: true,
      icon: <TrendingDown className="w-5 h-5" />,
    },
  ]

  const integrations = [
    {
      name: "Banking",
      description: "Connect with 10,000+ banks worldwide",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Payment Apps",
      description: "Sync with popular payment platforms",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Investment",
      description: "Track your investment portfolio",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Tax Software",
      description: "Export data for tax preparation",
      icon: <Calculator className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
    },
  ]

  const successStories = [
    {
      name: "Sarah's Journey",
      role: "Small Business Owner",
      image: "https://i.pravatar.cc/150?img=8",
      story: "PocketLedger helped me save $15,000 in just 6 months by identifying unnecessary expenses.",
      metrics: {
        savings: "$15,000",
        timeframe: "6 months",
        improvement: "35%",
      },
    },
    {
      name: "Michael's Success",
      role: "Tech Entrepreneur",
      image: "https://i.pravatar.cc/150?img=9",
      story: "The AI insights helped me optimize my startup's burn rate and extend runway by 8 months.",
      metrics: {
        savings: "$50,000",
        timeframe: "8 months",
        improvement: "42%",
      },
    },
    {
      name: "Emma's Growth",
      role: "Freelance Designer",
      image: "https://i.pravatar.cc/150?img=10",
      story: "I doubled my savings rate and achieved my financial goals 6 months ahead of schedule.",
      metrics: {
        savings: "$12,000",
        timeframe: "1 year",
        improvement: "100%",
      },
    },
  ]

  const faqs = [
    {
      question: "How does PocketLedger protect my financial data?",
      answer: "We use bank-level encryption and security measures to protect your data. All information is encrypted in transit and at rest, and we never store your banking credentials.",
    },
    {
      question: "Can I use PocketLedger with multiple currencies?",
      answer: "Yes! PocketLedger supports over 170 currencies and automatically handles exchange rates for accurate tracking across different currencies.",
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI analyzes your spending patterns and provides personalized insights and recommendations to help you save more and make better financial decisions.",
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, PocketLedger is available on iOS and Android devices, with full feature parity to the web version and real-time sync across all platforms.",
    },
  ]

  return (
    <>
      <Head>
        <title>PocketLedger - Lightweight Expense Tracker</title>
        <meta name="description" content="Track your expenses with ease using PocketLedger, the lightweight and intuitive expense tracking app." />
        <meta name="keywords" content="expense tracker, personal finance, budgeting, money management" />
        <meta property="og:title" content="PocketLedger - Lightweight Expense Tracker" />
        <meta property="og:description" content="Track your expenses with ease using PocketLedger, the lightweight and intuitive expense tracking app." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200/50 dark:border-gray-700/50 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">PocketLedger</span>
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                {[
                  { name: "Features", href: "#features" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "About", href: "/about" },
                ].map((item, index) => (
                  item.href.startsWith('#') ? (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        smoothScrollTo(item.href.slice(1))
                      }}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                      whileHover={{ y: -2 }}
                      transition={transitions.smooth}
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                    >
                      <motion.span
                        whileHover={{ y: -2 }}
                        transition={transitions.smooth}
                      >
                        {item.name}
                        {item.name === "Dashboard" && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </motion.span>
                    </Link>
                  )
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0"
                  >
                    <a href="/dashboard">Go to Dashboard</a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400 dark:bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </motion.div>

          {/* Floating Financial Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Suspense fallback={null}>
              {[DollarSign, Coins, CreditCard, PiggyBank, Calculator].map((Icon, index) => (
                <FloatingIcon key={index} Icon={Icon} index={index} />
              ))}
            </Suspense>
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800 dark:hover:to-emerald-800 transition-all duration-300">
                <Star className="w-3 h-3 mr-1" />
                New: AI-Powered Financial Assistant
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Smart Money
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Management
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your financial habits with AI-powered insights, smart categorization, and personalized savings
                goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-6 border-0 shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-6 border-0 shadow-lg"
                  >
                    <Eye className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </motion.div>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className={`text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 ${
                      currentStat === index ? "ring-2 ring-green-400 shadow-lg" : ""
                    } transition-all duration-500`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
                        {stat.icon}
                      </div>
                      <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => smoothScrollTo('features')}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </section>

        {/* Financial Widgets Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real-Time{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Financial Insights
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Monitor your financial health with live updates and intelligent analytics
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {financialWidgets.map((widget, index) => (
                <motion.div
                  key={widget.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          {widget.icon}
                        </div>
                        <div
                          className={`flex items-center space-x-1 text-sm ${
                            widget.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {widget.positive ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span>{widget.change}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{widget.title}</h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{widget.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
          <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-green-500 to-transparent dark:from-green-600 rounded-full filter blur-3xl"></div>
          </motion.div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transitions.smooth}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Financial Tools
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to take control of your finances in one intelligent platform
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experience{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Smart Finance
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how our AI-powered platform transforms complex financial data into actionable insights
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-green-200/30">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Financial Dashboard Preview</h3>
                    <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">Live Demo</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {financialWidgets.map((widget, index) => (
                      <motion.div
                        key={widget.title}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-green-200/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">{widget.title}</span>
                          {widget.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{widget.value}</div>
                        <div className={`text-sm ${
                          widget.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}>
                          {widget.change}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button
                      onClick={() => setShowDemo(!showDemo)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      {showDemo ? "Hide Interactive Demo" : "Try Interactive Demo"}
                    </Button>

                    <AnimatePresence>
                      {showDemo && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 overflow-hidden"
                        >
                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-6 border border-green-200/30">
                            <h4 className="text-lg font-semibold mb-4">Try Our AI Assistant</h4>
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                  <MessageCircle className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                                  <p className="text-sm">How can I save more money?</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                  <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                                  <p className="text-sm">Based on your spending patterns, I recommend:</p>
                                  <ul className="mt-2 space-y-1">
                                    <li className="flex items-center text-sm">
                                      <Check className="w-4 h-4 mr-2 text-green-500" />
                                      Reduce subscription services by $50/month
                                    </li>
                                    <li className="flex items-center text-sm">
                                      <Check className="w-4 h-4 mr-2 text-green-500" />
                                      Optimize grocery shopping to save $100/month
                                    </li>
                                    <li className="flex items-center text-sm">
                                      <Check className="w-4 h-4 mr-2 text-green-500" />
                                      Consolidate high-interest debt
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-50/50 dark:to-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Success{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Stories
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how PocketLedger has helped people achieve their financial goals
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={successStories[activeStory].image}
                      alt={successStories[activeStory].name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {successStories[activeStory].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {successStories[activeStory].role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                    {successStories[activeStory].story}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {successStories[activeStory].metrics.savings}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Savings</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {successStories[activeStory].metrics.timeframe}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Timeframe</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {successStories[activeStory].metrics.improvement}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Improvement</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center space-x-2 mt-4">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeStory === index
                        ? "bg-green-500 w-4"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Seamless{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Integrations
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connect with your favorite financial tools and services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-lg flex items-center justify-center mb-4`}>
                        {integration.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{integration.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{integration.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-50/50 dark:to-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about PocketLedger
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm cursor-pointer transition-all duration-300 ${
                      expandedFaq === index ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 dark:text-gray-400 mt-4">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-12 backdrop-blur-sm border border-green-200/30">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Finances?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have achieved their financial goals with PocketLedger's intelligent platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-6 border-0 shadow-lg"
                  >
                    Start Your Financial Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-gray-900/20 text-gray-900 hover:bg-gray-900/10"
                  >
                    Explore Dashboard
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-200/30 dark:border-gray-700/30 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">PocketLedger</span>
              </div>

              <div className="text-gray-500 dark:text-gray-400 text-sm">© 2024 PocketLedger. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function FloatingIcon({ Icon, index }: { Icon: any; index: number }) {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: index * 0.2,
        ease: "easeInOut",
      },
    })
  }, [controls, index])

  return (
    <motion.div
      animate={controls}
      style={{ y }}
      className="absolute opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
  )
}
