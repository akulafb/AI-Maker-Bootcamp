"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase/client"

interface FeedbackFormProps {
  onSuccess?: () => void
}

export function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    rating: "5",
    category: "Product Quality",
    status: "new" as const,
    feedback: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = getSupabaseClient()

      const { error: insertError } = await supabase.from("feedback").insert([
        {
          customer_name: formData.customer_name,
          email: formData.email,
          rating: Number.parseInt(formData.rating),
          category: formData.category,
          status: formData.status,
          feedback: formData.feedback,
        },
      ])

      if (insertError) {
        throw new Error(insertError.message)
      }

      setSuccess(true)
      setFormData({
        customer_name: "",
        email: "",
        rating: "5",
        category: "Product Quality",
        status: "new",
        feedback: "",
      })

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)

      // Notify parent to refresh data
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit feedback"
      setError(errorMessage)
      console.error("[v0] Feedback submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-lg">Add Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
              Error: {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
              Feedback submitted successfully!
            </div>
          )}

          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Customer Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              className="mt-1.5 border-slate-200 dark:border-slate-800"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1.5 border-slate-200 dark:border-slate-800"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="rating" className="text-sm font-medium">
              Rating
            </Label>
            <Select
              value={formData.rating}
              onValueChange={(value) => setFormData({ ...formData, rating: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="rating" className="mt-1.5 border-slate-200 dark:border-slate-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Poor</SelectItem>
                <SelectItem value="2">2 - Fair</SelectItem>
                <SelectItem value="3">3 - Good</SelectItem>
                <SelectItem value="4">4 - Very Good</SelectItem>
                <SelectItem value="5">5 - Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="category" className="mt-1.5 border-slate-200 dark:border-slate-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product Quality">Product Quality</SelectItem>
                <SelectItem value="Customer Service">Customer Service</SelectItem>
                <SelectItem value="Pricing">Pricing</SelectItem>
                <SelectItem value="Delivery">Delivery</SelectItem>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as "new" | "in-review" | "resolved" })}
              disabled={isLoading}
            >
              <SelectTrigger id="status" className="mt-1.5 border-slate-200 dark:border-slate-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="feedback" className="text-sm font-medium">
              Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Enter customer feedback..."
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="mt-1.5 resize-none border-slate-200 dark:border-slate-800"
              rows={4}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Add Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
