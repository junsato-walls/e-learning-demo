"use client"
import React from 'react'
import { Button } from '../ui/button'
import { loadStripe } from '@stripe/stripe-js'

const SubscriptionButton =  ({ planId }: {planId: string}) => {
    // const supabase = createClientComponentClient();
    const processSubscription = async () =>{
        const res = await fetch(
            `http://localhost:3000/api/subscription/${planId}`
        );        
        const data = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        await stripe?.redirectToCheckout({sessionId: data.id});
        console.log(data)
    };
    // const handleSiginIn = async () =>{

    // }

  return (
    <>    
    <Button onClick={processSubscription}>サブスクリプション契約する</Button>
    {/* <Button onClick={handleSiginIn}>サインイン</Button>        */}
    </>
  )
}

export default SubscriptionButton