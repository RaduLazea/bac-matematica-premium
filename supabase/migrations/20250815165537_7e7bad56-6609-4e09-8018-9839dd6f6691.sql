-- Create table for storing exam files
CREATE TABLE public.exam_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  year TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.exam_files ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to exam files
CREATE POLICY "Anyone can view exam files" 
ON public.exam_files 
FOR SELECT 
USING (true);

-- Insert initial exam files
INSERT INTO public.exam_files (title, difficulty, year, file_path) VALUES
('Variante BAC 2024 M1', 'M1', '2024', '/exams/2024_BAC_M1_mate-info.pdf'),
('Variante BAC 2024 M2 Științe', 'M2 Științe', '2024', '/exams/2024_BAC_M2_stiinte.pdf');