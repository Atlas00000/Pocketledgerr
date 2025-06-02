"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, DollarSign, Sparkles, Zap, Shield, Users, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals just starting their financial journey",
    features: [
      "Basic expense tracking",
      "Up to 50 transactions per month",
      "Basic financial insights",
      "Community support",
      "Mobile app access",
    ],
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    badge: "Popular",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "month",
    description: "Ideal for serious budgeters and small families",
    features: [
      "Unlimited transactions",
      "Advanced financial insights",
      "AI-powered recommendations",
      "Priority support",
      "Custom categories",
      "Export to Excel/PDF",
      "Family sharing (up to 3 users)",
    ],
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    badge: "Best Value",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$29.99",
    period: "month",
    description: "For businesses and large families",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Team collaboration tools",
      "Advanced security features",
    ],
    icon: <Shield className="w-6 h-6" />,
    color: "from-emerald-500 to-green-500",
    badge: "Premium",
  },
]

const features = [
  {
    title: "Smart Analytics",
    description: "Get AI-powered insights into your spending patterns and personalized recommendations.",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    title: "Secure & Private",
    description: "Bank-level security with end-to-end encryption to keep your data safe.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: "Real-time Sync",
    description: "Your data syncs instantly across all your devices, keeping you updated anywhere.",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    title: "Family Sharing",
    description: "Share expenses and budgets with family members while maintaining privacy.",
    icon: <Users className="w-8 h-8" />,
  },
]

export default function PricingPage() {
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
              <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800">Pricing</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.a
                href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowRight className="w-4 h-4" />
                <span>Back to Home</span>
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your financial journey. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden ${
                  plan.highlighted
                    ? "border-2 border-purple-500 dark:border-purple-400 shadow-lg"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center`}>
                      {plan.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</CardTitle>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        {plan.period && (
                          <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have questions? We're here to help.
          </p>
          <Button
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-800"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 