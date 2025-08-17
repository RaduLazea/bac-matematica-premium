-- Create a security definer function to validate edge function requests
CREATE OR REPLACE FUNCTION public.is_valid_edge_function_request()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current role is the service role (used by edge functions)
  -- This ensures only legitimate edge functions with service role key can modify orders
  RETURN current_setting('role') = 'service_role';
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Edge functions can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Edge functions can update orders" ON public.orders;

-- Create more secure policies for edge functions
CREATE POLICY "Secure edge function insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  public.is_valid_edge_function_request() AND
  (user_id IS NULL OR user_id = auth.uid() OR current_setting('role') = 'service_role')
);

CREATE POLICY "Secure edge function update orders" 
ON public.orders 
FOR UPDATE 
USING (
  public.is_valid_edge_function_request() AND
  (user_id IS NULL OR user_id = auth.uid() OR current_setting('role') = 'service_role')
);

-- Add additional validation policy for sensitive fields
CREATE POLICY "Validate order data integrity" 
ON public.orders 
FOR ALL
USING (
  -- Ensure stripe_session_id follows expected format (starts with 'cs_')
  (stripe_session_id IS NULL OR stripe_session_id LIKE 'cs_%') AND
  -- Ensure total_amount is positive
  (total_amount > 0) AND
  -- Ensure status is one of allowed values
  (status IN ('pending', 'paid', 'failed', 'cancelled'))
);