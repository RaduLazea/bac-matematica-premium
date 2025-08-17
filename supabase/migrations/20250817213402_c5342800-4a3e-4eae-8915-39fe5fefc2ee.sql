-- Fix function search path security issues
-- Drop dependent policies first
DROP POLICY IF EXISTS "Secure edge function insert orders" ON public.orders;
DROP POLICY IF EXISTS "Secure edge function update orders" ON public.orders;

-- Drop and recreate the function with proper search_path
DROP FUNCTION IF EXISTS public.is_valid_edge_function_request();

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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path = '';

-- Recreate the secure policies
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

-- Also fix the existing handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN new;
END;
$function$;