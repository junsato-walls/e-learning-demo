import initStripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandlerClient } from '@/utils/supabaseRouteHandlerClient';

export async function GET(req:NextRequest){
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

        const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
        const host = req.headers.get('host') || 'localhost';
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const origin = `${protocol}://${host}`;

        const session = await stripe.billingPortal.sessions.create({
            customer: stripe_customer_data?.stripe_customer!,
            return_url:  `${origin}/dashboard`
        })


        return NextResponse.json({url: session.url});
}

