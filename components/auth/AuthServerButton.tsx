import React from 'react'
import AuthClientButton from './AuthClientButton';
import { supabaseServer } from '@/utils/supabaseServer';

const AuthServerButton = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getSession();
  const session = user.session
  
  return <AuthClientButton session={session} />
}

export default AuthServerButton

// npx supabase gen types typescript --project-id lgymqbjbckjvpbdjpdfh > lib/database.types.ts
