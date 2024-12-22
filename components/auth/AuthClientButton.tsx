"use client"
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const AuthClientButton =  ({ session }: {session: Session | null}) => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSiginIn = async () =>{
      console.log('login')      
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options:{
              redirectTo: `${location.origin}/auth/callback`,
            }            
        })
        router.refresh();
    }

    const handleSiginOut = async () =>{
        console.log('logout')
        await supabase.auth.signOut();
        router.refresh();
    }

  return (
    <>
    {session ? (
    <Button onClick={handleSiginOut}>ログアウト</Button>
    ):( 
    <Button onClick={handleSiginIn}>サインイン</Button>       
    )}    
    </>
  )
}

export default AuthClientButton