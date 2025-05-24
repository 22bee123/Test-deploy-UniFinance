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
  // Get the current hostname to determine environment
  const hostname = window.location.hostname;
  const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
  
  // Determine the base URL based on the environment
  let baseUrl;
  if (isProduction) {
    // Use the exact production URL
    baseUrl = 'https://test-deploy-uni-finance.vercel.app';
  } else {
    // Use the current origin for local development
    baseUrl = window.location.origin;
  }
  
  // Create the full redirect URL
  const redirectUrl = `${baseUrl}/auth/callback`;
  
  // Log the environment and redirect URL for debugging
  console.log(`Google Sign-In: Environment=${isProduction ? 'Production' : 'Development'}`);
  console.log(`Hostname: ${hostname}`);
  console.log(`Redirect URL: ${redirectUrl}`);
  
  try {
    // Use a more direct approach with fewer options
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: false // Ensure browser redirects happen
      }
    });
    
    console.log('Sign-in initiated:', data);
    
    if (error) {
      console.error('Error during Google sign-in:', error);
      throw error;
    }
    
    return { data, error };
  } catch (error) {
    console.error('Exception during Google sign-in:', error);
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
