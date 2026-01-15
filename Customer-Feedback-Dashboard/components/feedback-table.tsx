"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Feedback } from "@/lib/types"

interface FeedbackTableProps {
  feedbackList: Feedback[]
  isLoading?: boolean
}

function getStatusColor(status: string) {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "in-review":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
  }
}

function getRatingColor(rating: number) {
  if (rating >= 4) return "text-green-600 dark:text-green-400"
  if (rating >= 3) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

export function FeedbackTable({ feedbackList, isLoading }: FeedbackTableProps) {
  return (
    <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-lg">Feedback Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Rating</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Feedback</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <td className="px-4 py-3 text-slate-900 dark:text-white">{item.customer_name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.email}</td>
                  <td className={`px-4 py-3 font-semibold ${getRatingColor(item.rating)}`}>{item.rating}.0</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.category}</td>
                  <td className="px-4 py-3">
                    <Badge className={`${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-600 dark:text-slate-400">{item.feedback}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {feedbackList.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                    No feedback entries yet
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                    Loading feedback...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
