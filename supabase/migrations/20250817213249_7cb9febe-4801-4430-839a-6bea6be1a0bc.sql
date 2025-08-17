-- Fix function search path security issues by setting explicit search_path
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