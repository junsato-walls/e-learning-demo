import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe"
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerClient";

export async function POST(req: NextRequest) {
    const supabase = supabaseRouteHandlerClient();
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET")

    if (query !== process.env.API_ROUTE_SECRET){
        return NextResponse.json({
            message: "APIを使用する権限がありません。"
        })
    }

    const data = await req.json()
    const { id, email } = data.record;
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!)
    const customer = await stripe.customers.create({
        email,
    })

    const { error } = await supabase
    .from("profile")
    .update({
        stripe_customer: customer.id
        })
    .eq("id",id);

    console.log(error);

    return NextResponse.json({
        message: `stripe customer created ${customer.id}`
    })
}
