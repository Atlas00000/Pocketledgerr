"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DollarSign,
  ArrowRight,
  Users,
  Target,
  Shield,
  Sparkles,
  Heart,
  Globe,
  Award,
  Clock,
  TrendingUp,
  Zap,
  Star,
  MessageCircle,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Building2,
  Trophy,
  Lightbulb,
  Rocket,
  Leaf,
} from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/150?img=1",
    bio: "Former financial advisor with 10+ years of experience in personal finance.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://i.pravatar.cc/150?img=2",
    bio: "Tech innovator with a passion for making financial tools accessible to everyone.",
  },
  {
    name: "Emma Rodriguez",
    role: "Head of Design",
    image: "https://i.pravatar.cc/150?img=3",
    bio: "Award-winning designer focused on creating intuitive user experiences.",
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?img=4",
    bio: "Full-stack developer with expertise in building scalable financial applications.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "PocketLedger was born from a vision to make personal finance management accessible to everyone.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    year: "2021",
    title: "First Million Users",
    description: "Reached our first million users, proving the need for better financial management tools.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched our AI-powered financial insights and recommendations system.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 50+ countries, helping people worldwide manage their finances better.",
    icon: <Globe className="w-6 h-6" />,
  },
]

const values = [
  {
    title: "Innovation",
    description: "Constantly pushing boundaries to create better financial tools.",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    title: "Security",
    description: "Bank-level security to protect your financial data.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: "Accessibility",
    description: "Making financial management tools available to everyone.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Growth",
    description: "Helping users achieve their financial goals.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
]

const achievements = [
  {
    title: "Global Reach",
    value: "50+",
    label: "Countries",
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "User Trust",
    value: "1M+",
    label: "Active Users",
    icon: <Users className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Innovation",
    value: "15+",
    label: "Patents",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Growth",
    value: "300%",
    label: "YoY Growth",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
  },
]

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Small Business Owner",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "PocketLedger transformed how I manage my business finances. The insights are invaluable.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Financial Advisor",
    image: "https://i.pravatar.cc/150?img=6",
    quote: "I recommend PocketLedger to all my clients. It's the perfect tool for financial management.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Tech Entrepreneur",
    image: "https://i.pravatar.cc/150?img=7",
    quote: "The AI-powered insights have helped me make better financial decisions for my startup.",
    rating: 5,
  },
]

const officeLocations = [
  {
    city: "San Francisco",
    country: "United States",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=60",
    teamSize: "50+",
    focus: "Product & Engineering",
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60",
    teamSize: "30+",
    focus: "International Expansion",
  },
  {
    city: "Singapore",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=60",
    teamSize: "20+",
    focus: "Asia Pacific Operations",
  },
]

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
              <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800">About</Badge>
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
        {/* Hero Section with Parallax */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 -z-10">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make personal finance management simple, accessible, and empowering for everyone.
          </p>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mb-4`}>
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{achievement.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{achievement.label}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{achievement.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500 to-emerald-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2 px-8">
                    <Card 
                      className={`bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm cursor-pointer transition-all duration-300 ${
                        expandedMilestone === index ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => setExpandedMilestone(expandedMilestone === index ? null : index)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            {milestone.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{milestone.year}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.title}</p>
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedMilestone === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-600 dark:text-gray-400 mt-4">{milestone.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="flex justify-end mt-2">
                          {expandedMilestone === index ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Users Say</h2>
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-green-500 w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Office Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Global Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={office.image}
                      alt={office.city}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold text-white">{office.city}</h3>
                      <p className="text-gray-200">{office.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Team Size</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{office.teamSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Focus</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{office.focus}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="bg-white/70 dark:bg-gray-800/70 border-green-200/30 dark:border-gray-700/30 shadow-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-gray-200">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
            <CardContent className="p-8 relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl"
              />
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Help us make personal finance management accessible to everyone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-x-4 space-y-4 sm:space-y-0">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  View Open Positions
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 