-- First check what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'orders';

-- Drop ALL existing policies for orders table
DROP POLICY IF EXISTS "Secure edge function insert orders" ON public.orders;
DROP POLICY IF EXISTS "Secure edge function update orders" ON public.orders;
DROP POLICY IF EXISTS "Edge functions can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Edge functions can update orders" ON public.orders;
DROP POLICY IF EXISTS "Validate order data integrity" ON public.orders;