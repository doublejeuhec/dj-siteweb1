// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-customer-email",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function received request");

    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Request body parsed successfully:", requestBody);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const {
      name,
      email,
      phone,
      date,
      hec_student_tickets,
      young_tickets,
      hec_staff_tickets,
      other_tickets,
      palais_hec_student_tickets,
      palais_young_tickets,
      palais_other_tickets,
      user_id,
      return_url,
    } = requestBody;

    // Validate required fields
    console.log("Validating required fields:", { name, email, date });
    if (!name || !email || !date) {
      console.error("Missing required parameters:", { name, email, date });
      throw new Error("Missing required parameters");
    }

    // Validate that at least one ticket is selected
    const isHecVenue = date.includes("hec");
    const isPalaisVenue = date.includes("palais");

    if (
      isHecVenue &&
      !parseInt(hec_student_tickets || "0") &&
      !parseInt(young_tickets || "0") &&
      !parseInt(hec_staff_tickets || "0") &&
      !parseInt(other_tickets || "0")
    ) {
      throw new Error("At least one HEC ticket must be selected");
    }

    if (
      isPalaisVenue &&
      !parseInt(palais_hec_student_tickets || "0") &&
      !parseInt(palais_young_tickets || "0") &&
      !parseInt(palais_other_tickets || "0")
    ) {
      throw new Error("At least one Palais des Glaces ticket must be selected");
    }

    // Calculate total amount based on venue
    let totalAmount = 0;

    if (isHecVenue) {
      const hecStudentPrice = 700; // 7€ in cents
      const youngPrice = 900; // 9€ in cents
      const hecStaffPrice = 900; // 9€ in cents
      const otherPrice = 1200; // 12€ in cents

      const hecStudentTotal =
        (parseInt(hec_student_tickets) || 0) * hecStudentPrice;
      const youngTotal = (parseInt(young_tickets) || 0) * youngPrice;
      const hecStaffTotal = (parseInt(hec_staff_tickets) || 0) * hecStaffPrice;
      const otherTotal = (parseInt(other_tickets) || 0) * otherPrice;

      totalAmount = hecStudentTotal + youngTotal + hecStaffTotal + otherTotal;
    } else if (isPalaisVenue) {
      const palaisHecStudentPrice = 1200; // 12€ in cents
      const palaisYoungPrice = 1500; // 15€ in cents
      const palaisOtherPrice = 2000; // 20€ in cents

      const palaisHecStudentTotal =
        (parseInt(palais_hec_student_tickets) || 0) * palaisHecStudentPrice;
      const palaisYoungTotal =
        (parseInt(palais_young_tickets) || 0) * palaisYoungPrice;
      const palaisOtherTotal =
        (parseInt(palais_other_tickets) || 0) * palaisOtherPrice;

      totalAmount = palaisHecStudentTotal + palaisYoungTotal + palaisOtherTotal;
    }

    if (totalAmount <= 0) {
      throw new Error("Total amount must be greater than 0");
    }

    // Create line items for Stripe
    const lineItems = [];
    const showTitle = "La visite de la vieille dame";

    // Format the date for display
    let displayDate = "";
    let venue = "";

    if (date.includes("hec")) {
      if (date.includes("07")) {
        displayDate = "7 avril 2024 à 20h00";
      } else if (date.includes("08")) {
        displayDate = "8 avril 2024 à 20h00";
      }
      venue = "Campus HEC";
    } else if (date.includes("palais")) {
      displayDate = "12 avril 2024 à 17h00";
      venue = "Palais des Glaces, Paris";
    }

    // Add HEC tickets
    if (isHecVenue) {
      if (parseInt(hec_student_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet Étudiant HEC - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 700, // 7€
          },
          quantity: parseInt(hec_student_tickets),
        });
      }

      if (parseInt(young_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet -26 ans - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 900, // 9€
          },
          quantity: parseInt(young_tickets),
        });
      }

      if (parseInt(hec_staff_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet Personnel HEC - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 900, // 9€
          },
          quantity: parseInt(hec_staff_tickets),
        });
      }

      if (parseInt(other_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet Standard - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 1200, // 12€
          },
          quantity: parseInt(other_tickets),
        });
      }
    }

    // Add Palais des Glaces tickets
    if (isPalaisVenue) {
      if (parseInt(palais_hec_student_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet Étudiant HEC - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 1200, // 12€
          },
          quantity: parseInt(palais_hec_student_tickets),
        });
      }

      if (parseInt(palais_young_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet -26 ans - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 1500, // 15€
          },
          quantity: parseInt(palais_young_tickets),
        });
      }

      if (parseInt(palais_other_tickets) > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: `Billet Standard - ${showTitle}`,
              description: `${displayDate} - ${venue}`,
            },
            unit_amount: 2000, // 20€
          },
          quantity: parseInt(palais_other_tickets),
        });
      }
    }

    // Create Stripe checkout session
    console.log("Creating Stripe checkout session with line items:", lineItems);
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${return_url || "https://doublejeu-theatre.fr"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${return_url || "https://doublejeu-theatre.fr"}/tickets?canceled=true`,
        customer_email: email,
        metadata: {
          user_id: user_id || "",
          name,
          email,
          phone: phone || "",
          date,
          // Remove undefined variables

          total_amount: (totalAmount / 100).toFixed(2),
        },
      });
      console.log("Stripe session created successfully:", {
        sessionId: session.id,
      });

      // Create a record in the tickets table
      if (
        Deno.env.get("SUPABASE_URL") &&
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
      ) {
        const supabaseAdmin = createClient(
          Deno.env.get("SUPABASE_URL") || "",
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
        );

        // Prepare ticket data based on venue
        let ticketData = {
          user_id: user_id || null,
          customer_name: name,
          customer_email: email,
          customer_phone: phone || null,
          show_date: date,
          venue: isHecVenue ? "Campus HEC" : "Palais des Glaces",
          total_amount: totalAmount / 100,
          payment_status: "pending",
          payment_intent_id: session.payment_intent || null,
        };

        // Add ticket counts based on venue
        if (isHecVenue) {
          ticketData = {
            ...ticketData,
            hec_student_tickets: parseInt(hec_student_tickets) || 0,
            young_tickets: parseInt(young_tickets) || 0,
            hec_staff_tickets: parseInt(hec_staff_tickets) || 0,
            other_tickets: parseInt(other_tickets) || 0,
          };
        } else if (isPalaisVenue) {
          ticketData = {
            ...ticketData,
            palais_hec_student_tickets:
              parseInt(palais_hec_student_tickets) || 0,
            palais_young_tickets: parseInt(palais_young_tickets) || 0,
            palais_other_tickets: parseInt(palais_other_tickets) || 0,
          };
        }

        console.log("Inserting ticket data into Supabase:", ticketData);
        const { data, error } = await supabaseAdmin
          .from("tickets")
          .insert(ticketData);

        if (error) {
          console.error("Error inserting ticket data:", error);
          // Continue execution even if database insert fails
        } else {
          console.log("Ticket data inserted successfully");
        }
      } else {
        console.log(
          "Skipping database insert - Supabase credentials not available"
        );
      }

      return new Response(
        JSON.stringify({ sessionId: session.id, url: session.url }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (stripeError) {
      console.error("Error creating Stripe checkout session:", stripeError);
      return new Response(
        JSON.stringify({ error: `Stripe error: ${stripeError.message}` }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error creating ticket checkout session:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
        details: "An unexpected error occurred in the edge function",
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
