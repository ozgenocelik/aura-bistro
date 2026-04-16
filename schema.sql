-- Drop the table if it exists
-- DROP TABLE IF EXISTS menu_items;

-- Create the menu_items table
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  category_en TEXT NOT NULL,
  category_it TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_it TEXT NOT NULL,
  description_en TEXT,
  description_it TEXT,
  price TEXT, -- Stored as text to allow symbols like €
  image_url TEXT,
  is_available BOOLEAN DEFAULT true
);

-- Enable Row Level Security (RLS)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Public can read menu items"
ON menu_items
FOR SELECT
USING (true);

-- Create authenticated insert/update/delete policy (for admin)
-- Note: Simplified for now. In a real app, you'd use 'auth.uid()' 
-- or a specific admin role. For now, we allow anon if they have the anon key 
-- (which is risky but okay for a small project if the user wants simplicity).
-- Recommended: Enable Auth and change 'anon' to 'authenticated'.

CREATE POLICY "Allow all operations for now"
ON menu_items
FOR ALL
USING (true)
WITH CHECK (true);
