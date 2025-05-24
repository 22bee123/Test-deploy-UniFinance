import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Create the Supabase client with specific options for better auth handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
});

// Auth helper functions
export const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
};

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const signInWithGoogle = async () => {
  // Simplified approach for both local and production environments
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  // Always use the current origin for local development
  let redirectUrl = `${window.location.origin}/auth/callback`;
  
  // For production (Vercel), use the exact URL
  if (isProduction) {
    redirectUrl = 'https://test-deploy-uni-finance.vercel.app/auth/callback';
  }
  
  console.log(`Google Sign-In: Environment=${isProduction ? 'Production' : 'Development'}, Redirecting to: ${redirectUrl}`);
  
  try {
    // Use signInWithOAuth with minimal options
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: 'select_account' // Force account selection every time
        }
      }
    });
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
