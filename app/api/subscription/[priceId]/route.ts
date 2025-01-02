import initStripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandlerClient } from '@/utils/supabaseRouteHandlerClient';

export async function GET(
    req:NextRequest, 
    { params } : { params: { priceId: string } }
    ){
        const supabase = supabaseRouteHandlerClient(); 
        const { data } = await supabase.auth.getUser();
        const user = data.user;

        if(!user){
            return NextResponse.json("Unauthorized",{status: 401})
        }

        const { data: stripe_customer_data } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user?.id)
        .single();
        console.log(params)
        console.log(stripe_customer_data)        
        const host = req.headers.get('host') || 'localhost';
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const origin = `${protocol}://${host}`;

        const priceId = params.priceId;
        const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

        if(!stripe_customer_data?.stripe_customer){
            return NextResponse.json("Error creating Stripe session", { status: 500 });
        }
         const session = await stripe.checkout.sessions.create({
            customer:stripe_customer_data?.stripe_customer,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items:[{price:priceId,quantity:1}],
            success_url: `${origin}/payment/success`,
            cancel_url: `${origin}/payment/cancelled`
        });


        return NextResponse.json({id:session.id});
}

