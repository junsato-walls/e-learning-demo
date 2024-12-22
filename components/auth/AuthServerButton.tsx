import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from "next/headers"
import AuthClientButton from './AuthClientButton';

const AuthServerButton = async () => {
//   const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: user } = await supabase.auth.getSession();
  const session = user.session
  
  return <AuthClientButton session={session} />
}

export default AuthServerButton

// npx supabase gen types typescript --project-id lgymqbjbckjvpbdjpdfh > lib/database.types.ts
