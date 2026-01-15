export interface Feedback {
  id: string
  customer_name: string
  email: string
  rating: number
  category: string
  status: "new" | "in-review" | "resolved"
  feedback: string
  created_at: string
  updated_at: string
}

export interface FeedbackFormData {
  customer_name: string
  email: string
  rating: number
  category: string
  status: "new" | "in-review" | "resolved"
  feedback: string
}
