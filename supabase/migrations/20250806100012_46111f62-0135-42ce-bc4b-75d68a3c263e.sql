-- Create orders table to track tutoring package payments
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  package_name TEXT NOT NULL,
  package_type TEXT NOT NULL, -- 'individual' or 'group'
  session_type TEXT NOT NULL, -- 'online' or 'on-site'
  hours INTEGER NOT NULL,
  price_per_hour INTEGER NOT NULL, -- in RON cents
  total_amount INTEGER NOT NULL, -- in RON cents
  currency TEXT DEFAULT 'ron',
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  customer_email TEXT,
  customer_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT
  USING (user_id = auth.uid() OR customer_email = auth.email());

CREATE POLICY "Edge functions can insert orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Edge functions can update orders" ON public.orders
  FOR UPDATE
  USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();