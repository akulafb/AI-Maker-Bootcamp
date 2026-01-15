"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { MetricsCards } from "@/components/metrics-cards"
import { FeedbackForm } from "@/components/feedback-form"
import { FeedbackFilters } from "@/components/feedback-filters"
import { FeedbackTable } from "@/components/feedback-table"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Feedback } from "@/lib/types"

export default function Home() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedRating, setSelectedRating] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const supabase = getSupabaseClient()

        const { data, error: fetchError } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false })

        if (fetchError) {
          throw new Error(fetchError.message)
        }

        setFeedbackList(data || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load feedback"
        setError(errorMessage)
        console.error("[v0] Feedback fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  useEffect(() => {
    const supabase = getSupabaseClient()

    const channel = supabase
      .channel("feedback-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "feedback",
        },
        (payload) => {
          console.log("[v0] Real-time update received:", payload)

          if (payload.eventType === "INSERT") {
            setFeedbackList((prev) => [payload.new as Feedback, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setFeedbackList((prev) =>
              prev.map((item) => (item.id === payload.new.id ? (payload.new as Feedback) : item)),
            )
          } else if (payload.eventType === "DELETE") {
            setFeedbackList((prev) => prev.filter((item) => item.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredFeedbackList = useMemo(() => {
    return feedbackList.filter((item) => {
      // Filter by rating
      if (selectedRating !== "all" && item.rating !== Number(selectedRating)) {
        return false
      }

      // Filter by date range
      if (selectedDateRange !== "all") {
        const daysBack = Number(selectedDateRange)
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - daysBack)
        if (new Date(item.created_at) < cutoffDate) {
          return false
        }
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = item.customer_name.toLowerCase().includes(query)
        const matchesFeedback = item.feedback.toLowerCase().includes(query)
        if (!matchesName && !matchesFeedback) {
          return false
        }
      }

      return true
    })
  }, [feedbackList, selectedRating, selectedDateRange, searchQuery])

  const averageRating =
    feedbackList.length > 0
      ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
      : "0"

  const totalFeedback = feedbackList.length
  const resolvedFeedback = feedbackList.filter((f) => f.status === "resolved").length

  const handleFormSuccess = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data, error: fetchError } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError
      setFeedbackList(data || [])
    } catch (err) {
      console.error("[v0] Failed to refresh feedback:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
            Error: {error}
          </div>
        )}

        <MetricsCards
          averageRating={Number.parseFloat(averageRating)}
          totalFeedback={totalFeedback}
          resolvedFeedback={resolvedFeedback}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FeedbackForm onSuccess={handleFormSuccess} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <FeedbackFilters
              onRatingChange={setSelectedRating}
              onDateRangeChange={setSelectedDateRange}
              onSearchChange={setSearchQuery}
              selectedRating={selectedRating}
              selectedDateRange={selectedDateRange}
              searchQuery={searchQuery}
            />
            <FeedbackTable feedbackList={filteredFeedbackList} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}
