import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  // Determine the correct redirect URL based on the environment
  let redirectUrl;
  
  // Check if we're on localhost or a production URL
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local development
    redirectUrl = `${window.location.origin}/onboarding`;
  } else {
    // Production deployment (Vercel)
    redirectUrl = `https://test-deploy-uni-finance.vercel.app/onboarding`;
    
    // If you have a specific Vercel URL, you can hardcode it here for extra safety
    // redirectUrl = 'https://your-vercel-app-name.vercel.app/onboarding';
  }
  
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      skipBrowserRedirect: false,
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
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
