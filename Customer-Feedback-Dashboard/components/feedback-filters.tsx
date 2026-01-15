"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface FeedbackFiltersProps {
  onRatingChange: (rating: string) => void
  onDateRangeChange: (range: string) => void
  onSearchChange: (search: string) => void
  selectedRating: string
  selectedDateRange: string
  searchQuery: string
}

export function FeedbackFilters({
  onRatingChange,
  onDateRangeChange,
  onSearchChange,
  selectedRating,
  selectedDateRange,
  searchQuery,
}: FeedbackFiltersProps) {
  const hasActiveFilters = selectedRating !== "all" || selectedDateRange !== "all" || searchQuery !== ""

  const handleResetFilters = () => {
    onRatingChange("all")
    onDateRangeChange("all")
    onSearchChange("")
  }

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        {/* Search Input */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search customer or feedback..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <Select value={selectedRating} onValueChange={onRatingChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
            <SelectItem value="180">Last 6 Months</SelectItem>
            <SelectItem value="365">Last Year</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="w-full md:col-span-4 lg:col-span-1 bg-transparent"
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
