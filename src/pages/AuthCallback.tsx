import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      console.log('AuthCallback: Starting OAuth callback handling');
      console.log('URL params:', window.location.href);
      
      try {
        // For Supabase OAuth, the auth server should handle the callback automatically
        // We just need to check if the session exists and redirect accordingly
        console.log('AuthCallback: Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('AuthCallback: Session result:', session ? 'Session found' : 'No session', error ? `Error: ${error.message}` : 'No error');
        
        // Check for error in the URL (e.g., access_denied)
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        console.log('AuthCallback: URL error params:', errorParam, errorDescription);
        
        if (errorParam) {
          console.error('OAuth error:', errorParam, errorDescription);
          navigate(`/login?error=${encodeURIComponent(errorDescription || 'Authentication failed')}`);
          return;
        }
        
        if (error) {
          console.error('Session error:', error);
          navigate('/login?error=Authentication failed');
          return;
        }
        
        if (session) {
          console.log('AuthCallback: User authenticated:', session.user.id);
          
          // Check if user has already completed onboarding
          console.log('AuthCallback: Checking if user has profile...');
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          console.log('AuthCallback: Profile check result:', 
            profileData ? 'Profile found' : 'No profile', 
            profileError ? `Error: ${profileError.message}` : 'No error'
          );
          
          if (profileData && !profileError) {
            // User has completed onboarding, redirect to grants page
            console.log('AuthCallback: Redirecting to grants page');
            navigate('/grants');
          } else {
            // New user, redirect to onboarding
            console.log('AuthCallback: Redirecting to onboarding');
            navigate('/onboarding');
          }
        } else {
          // If no session, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login?error=Authentication failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-purple-700 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Completing authentication...</h2>
        <p className="mt-2 text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
