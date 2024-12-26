import { Interval } from './../../../node_modules/@stripe/stripe-js/dist/api/sources.d';
import initStripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"
import { Database } from '@/lib/database.types';

export async function POST(req: NextRequest){
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const signature = req.headers.get("stripe_signature");
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET
    const reqBuffer = Buffer.from(await req.arrayBuffer())
    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature!, endpointSecret!);

        switch (event.type){
            case "customer.subscription.created":
                const customerSubscriptionCreated = event.data.object;
                await supabase.from("profile").update({
                    is_subscribed: true,
                    interval: customerSubscriptionCreated.items.data[0].plan.interval,
                })
                .eq("stripe_customer", event.data.object.customer);                
            case "customer.subscription.deleted":
            
            
            case "customer.subscription.updated":
                // const customerSubscriptionCreated = event.data.object;
                // await supabase.from("profile").update({
                //     is_subscribed: true,
                //     interval: customerSubscriptionCreated.items.data[0].plan.interval,
                // })
                // .eq("stripe_customer", event.data.object.customer);                

        }
    }catch(err:any){
        return NextResponse.json(`Webhook Error: ${err.message}`, { status:401 })
    }

    return NextResponse.json({received: true});
}