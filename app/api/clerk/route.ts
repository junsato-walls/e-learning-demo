import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
// import { supabaseRouteHandlerClient } from '@/utils/supabaseRouteHandlerClient'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  const userData = evt.data
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)
  console.log('Webhook id:', userData)
  

  if (evt.type === 'user.created') {
    console.log('userId:', evt.data.id)
    console.log('Webhook payload:', evt.data.email_addresses)
    console.log('Webhook payload:', evt.data.username)
  }




//   if (eventType === 'user.created') {
//     const userData = evt.data

//     // Upsert the user data into Supabase
//     const supabase = supabaseRouteHandlerClient()
//     const { data, error } = await supabase
//       .from('users')
//       .upsert(
//         {
//           id: userData.id, // User ID
//           email: userData.email_addresses[0]?.email_address, // User email
//           username: userData.username, // User username
//         }
//       )

//     if (error) {
//       console.error("Error inserting user into Supabase:", error)
//       return new Response('Error inserting user into Supabase', { status: 500 })
//     } else {
//       console.log("User added to Supabase:", data)
//     }
//   }


  return new Response('Webhook received', { status: 200 })
}



