import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner className="w-12 h-12 text-green-500" />
        <div className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  )
} 