"use client"
import React from 'react'
import { Button } from '../ui/button'
// import { loadStripe } from '@stripe/stripe-js'

const SubscriptionButton =  ({ planId }: {planId: string}) => {
    // const supabase = createClientComponentClient();
    console.log("SubscriptionButton押下：")
    console.log(`${location.origin}/api/subscription/${planId}`)
    const processSubscription = async () =>{
        // const res = await fetch(`${location.origin}/api/subscription/${planId}`);        
        // const res = await fetch(`http://localhost:3000/api/subscription/${planId}`);        
        const res = await fetch(
          `http://localhost:3000/api/subscription/${planId}`
      );     
        const data = await res.json();
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        // await stripe?.redirectToCheckout({sessionId: data.id});
        console.log(data)
    };
    // const handleSiginIn = async () =>{

    // }
    // `http://localhost:3000/api/subscription/${planId}`

  return (
    <>    
    <Button onClick={processSubscription}>サブスクリプション契約する</Button>
    {/* <Button onClick={handleSiginIn}>サインイン</Button>        */}
    </>
  )
}

export default SubscriptionButton