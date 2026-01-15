-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-review', 'resolved')),
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_email ON feedback(email);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy allowing all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON feedback
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to read and insert
CREATE POLICY "Allow anonymous read and insert" ON feedback
  FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous insert" ON feedback
  FOR INSERT
  WITH CHECK (true);
