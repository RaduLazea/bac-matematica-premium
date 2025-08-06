import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Parse request body
    const { packageData } = await req.json();
    if (!packageData) throw new Error("Package data is required");
    logStep("Package data received", packageData);

    // Create Supabase client using service role for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Try to get authenticated user (optional for guest checkout)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
      logStep("User authenticated", { userId: user?.id, email: user?.email });
    } else {
      logStep("Guest checkout - no authentication provided");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists for authenticated users
    let customerId;
    const customerEmail = user?.email || "guest@example.com";
    
    if (user?.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing Stripe customer", { customerId });
      }
    }

    // Calculate total amount (convert RON to cents for Stripe)
    const totalAmount = Math.round(packageData.pricePerHour * packageData.hours * 100);
    logStep("Calculated total amount", { totalAmount, currency: "ron" });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: { 
              name: `${packageData.title} - ${packageData.type === 'individual' ? 'Individual' : 'Grup'} ${packageData.sessionType === 'online' ? 'Online' : 'La domiciliu'}`,
              description: `${packageData.hours} ore de meditații`
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      metadata: {
        package_name: packageData.title,
        package_type: packageData.type,
        session_type: packageData.sessionType,
        hours: packageData.hours.toString(),
        user_id: user?.id || '',
      }
    });

    logStep("Stripe session created", { sessionId: session.id, url: session.url });

    // Save order to database
    await supabaseService.from("orders").insert({
      user_id: user?.id || null,
      stripe_session_id: session.id,
      package_name: packageData.title,
      package_type: packageData.type,
      session_type: packageData.sessionType,
      hours: packageData.hours,
      price_per_hour: Math.round(packageData.pricePerHour * 100), // Convert to cents
      total_amount: totalAmount,
      customer_email: customerEmail,
      customer_name: user?.user_metadata?.full_name || null,
      status: "pending"
    });

    logStep("Order saved to database");

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});