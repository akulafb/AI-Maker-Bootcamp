-- Insert mock feedback data
INSERT INTO feedback (customer_name, email, rating, category, status, feedback, created_at) VALUES
('Sarah Johnson', 'sarah@example.com', 5, 'Product Quality', 'resolved', 'Excellent product quality and fast delivery', NOW() - INTERVAL '4 days'),
('Michael Chen', 'michael@example.com', 4, 'Customer Service', 'in-review', 'Great support team, response time could be faster', NOW() - INTERVAL '3 days'),
('Emma Davis', 'emma@example.com', 3, 'Pricing', 'new', 'Product is good but pricing feels a bit high', NOW() - INTERVAL '2 days'),
('James Wilson', 'james@example.com', 5, 'Product Quality', 'resolved', 'Amazing features and intuitive interface', NOW() - INTERVAL '10 days'),
('Lisa Anderson', 'lisa@example.com', 2, 'Technical Support', 'new', 'Had issues with the product, support was slow to respond', NOW() - INTERVAL '1 day'),
('Robert Taylor', 'robert@example.com', 4, 'Delivery', 'resolved', 'Quick delivery but packaging could be better', NOW() - INTERVAL '7 days'),
('Jessica Martinez', 'jessica@example.com', 5, 'Customer Service', 'resolved', 'Outstanding customer service, very helpful team', NOW() - INTERVAL '14 days'),
('David Lee', 'david@example.com', 3, 'Product Quality', 'in-review', 'Decent product but some features are missing', NOW() - INTERVAL '5 days');
