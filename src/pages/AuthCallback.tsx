import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase, getCurrentUser, getSession } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      console.log('AuthCallback: Starting OAuth callback handling');
      console.log('URL params:', window.location.href);
      console.log('Location state:', location);
      console.log('Is Vercel deployment:', window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
      
      setIsProcessing(true);
      setError(null);
      
      try {
        // Check for error in the URL (e.g., access_denied)
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        console.log('AuthCallback: URL error params:', errorParam, errorDescription);
        
        if (errorParam) {
          console.error('OAuth error:', errorParam, errorDescription);
          setError(errorDescription || 'Authentication failed');
          navigate(`/login?error=${encodeURIComponent(errorDescription || 'Authentication failed')}`);
          return;
        }
        
        // For Supabase OAuth, the auth server should handle the callback automatically
        // We need to explicitly get the session to ensure it's available
        console.log('AuthCallback: Getting session...');
        
        // Longer delay for Vercel deployment
        const isVercel = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        await new Promise(resolve => setTimeout(resolve, isVercel ? 1500 : 500));
        
        // Try multiple ways to get the session
        let session = null;
        let sessionError = null;
        
        // First attempt - getSession
        try {
          const sessionResult = await getSession();
          if (sessionResult) {
            session = sessionResult;
            console.log('AuthCallback: Session found via getSession');
          }
        } catch (error) {
          console.error('Error getting session via getSession:', error);
        }
        
        // Second attempt - supabase.auth.getSession
        if (!session) {
          try {
            const { data, error } = await supabase.auth.getSession();
            if (data?.session) {
              session = data.session;
              console.log('AuthCallback: Session found via supabase.auth.getSession');
            }
            if (error) sessionError = error;
          } catch (error) {
            console.error('Error getting session via supabase.auth.getSession:', error);
          }
        }
        
        // Third attempt - check URL for access_token
        if (!session && window.location.hash) {
          console.log('Checking URL hash for access_token');
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          if (accessToken) {
            console.log('Found access_token in URL hash, attempting to set session');
            try {
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: hashParams.get('refresh_token') || '',
              });
              if (data?.session) {
                session = data.session;
                console.log('AuthCallback: Session set via access_token in URL');
              }
              if (error) sessionError = error;
            } catch (error) {
              console.error('Error setting session from URL hash:', error);
            }
          }
        }
        
        console.log('AuthCallback: Final session result:', 
          session ? 'Session found' : 'No session', 
          sessionError ? `Error: ${sessionError.message}` : 'No error'
        );
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Authentication failed');
          navigate('/login?error=Authentication failed');
          return;
        }
        
        if (!session) {
          console.error('No session found after OAuth callback');
          setError('No session found');
          navigate('/login?error=No session found');
          return;
        }
        
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
        
        // Force a small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // On Vercel, use window.location.href for more reliable navigation
        if (isVercel) {
          if (profileData && !profileError) {
            // User has completed onboarding, redirect to grants page
            console.log('AuthCallback: Redirecting to grants page via window.location');
            window.location.href = '/grants';
          } else {
            // New user, redirect to onboarding
            console.log('AuthCallback: Redirecting to onboarding via window.location');
            window.location.href = '/onboarding';
          }
        } else {
          // On localhost, use React Router navigation
          if (profileData && !profileError) {
            // User has completed onboarding, redirect to grants page
            console.log('AuthCallback: Redirecting to grants page');
            navigate('/grants', { replace: true });
          } else {
            // New user, redirect to onboarding
            console.log('AuthCallback: Redirecting to onboarding');
            navigate('/onboarding', { replace: true });
          }
        }
      } catch (error: any) {
        console.error('Error in auth callback:', error);
        setError(error.message || 'Authentication failed');
        navigate('/login?error=Authentication failed');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uni-purple-700 mx-auto"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Completing authentication...</h2>
            <p className="mt-2 text-gray-600">Please wait while we log you in.</p>
          </>
        ) : error ? (
          <>
            <div className="bg-red-100 p-4 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Authentication Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button 
              onClick={() => navigate('/login')} 
              className="mt-4 px-4 py-2 bg-uni-purple-600 text-white rounded hover:bg-uni-purple-700"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="bg-green-100 p-4 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Authentication Complete</h2>
            <p className="mt-2 text-gray-600">Redirecting you now...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
