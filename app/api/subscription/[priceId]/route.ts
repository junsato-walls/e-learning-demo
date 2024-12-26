import initStripe from 'stripe';
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"

export async function GET(
    req:NextRequest, 
    { params } : { params: { priceId: string } }
    ){
        const supabase = createRouteHandlerClient({cookies})
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        console.log("コンソールテスト")

        if(!user){
            return NextResponse.json("Unauthorized",{status: 401})
        }

        const { data: stripe_customer_data } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user?.id)
        .single();
        
        const priceId = params.priceId;
        const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

          // リクエストのホストを取得（例: example.com）
         const host = req.headers.get('host') || 'localhost';

          // プロトコルを手動で指定（HTTPまたはHTTPS）
         const protocol = req.headers.get('x-forwarded-proto') || 'http';

          // オリジンを組み立てる
         const origin = `${protocol}://${host}`;

         console.log("Request Origin:");

        //  console.log("Request Origin:", protocol);
         http://localhost:3000/api/subscription/price_1QZ0RFRo1S8doQfhf5l1oN0t

        // const session = await stripe.checkout.sessions.create({
        //     customer:stripe_customer_data?.stripe_customer,
        //     mode: "subscription",
        //     payment_method_types: ["card"],
        //     line_items:[{price:priceId,quantity:1}],
        //     success_url: `${location.origin}/api/subscription/payment/success`,
        //     cancel_url: `${location.origin}/api/subscription/payment/cancelled`
        // });
        // success_url: "http://localhost:3000/payment/success",
        // cancel_url: "http://localhost:3000/payment/cancelled"

        console.log("リクエストパラメータ:" + params.priceId)
        console.log("カスタマーID取得:" + stripe_customer_data?.stripe_customer)
        console.log("セッション:")
        // console.log(session)
        return NextResponse.json({id:host});
        // return NextResponse.json({id:session.id});
}

