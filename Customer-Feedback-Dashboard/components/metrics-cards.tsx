import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface MetricsCardsProps {
  averageRating: number
  totalFeedback: number
  resolvedFeedback: number
  ratingTrend?: "up" | "down" // added trend indicators
  feedbackTrend?: "up" | "down"
  resolutionTrend?: "up" | "down"
}

export function MetricsCards({
  averageRating,
  totalFeedback,
  resolvedFeedback,
  ratingTrend = "up",
  feedbackTrend = "up",
  resolutionTrend = "up",
}: MetricsCardsProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    if (rating >= 3.0) return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
    return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
  }

  const getRatingTextColor = (rating: number) => {
    if (rating >= 4.0) return "text-green-700 dark:text-green-300"
    if (rating >= 3.0) return "text-yellow-700 dark:text-yellow-300"
    return "text-red-700 dark:text-red-300"
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Average Rating Card */}
      <Card className={`${getRatingColor(averageRating)} border-2`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${getRatingTextColor(averageRating)}`}>{averageRating}</span>
              <span className="text-sm text-slate-500 dark:text-slate-500">/5.0</span>
            </div>
            <div className="flex items-center gap-1">
              {ratingTrend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Based on customer ratings</p>
        </CardContent>
      </Card>

      {/* Total Feedback Card */}
      <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{totalFeedback}</span>
              <span className="text-sm text-slate-500 dark:text-slate-500">entries</span>
            </div>
            <div className="flex items-center gap-1">
              {feedbackTrend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">Collected feedback</p>
        </CardContent>
      </Card>

      {/* Resolution Rate Card */}
      <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Resolved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{resolvedFeedback}</span>
              <span className="text-sm text-slate-500 dark:text-slate-500">completed</span>
            </div>
            <div className="flex items-center gap-1">
              {resolutionTrend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Resolution rate: {totalFeedback > 0 ? Math.round((resolvedFeedback / totalFeedback) * 100) : 0}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
