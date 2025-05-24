import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Extract hash from URL if present
    const hashParams = window.location.hash && new URLSearchParams(
      window.location.hash.substring(1)
    );

    const processAuth = async () => {
      try {
        console.log('AuthCallback: Processing authentication');
        console.log('Current URL:', window.location.href);
        
        // Wait for Supabase to process the authentication
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setStatus('error');
          setMessage(error.message);
          return;
        }
        
        if (!data.session) {
          console.log('No session found, checking URL for tokens');
          
          // If no session but we have access_token in the URL, try to set it
          if (hashParams && hashParams.get('access_token')) {
            try {
              console.log('Found access_token in URL, attempting to set session');
              const accessToken = hashParams.get('access_token');
              const refreshToken = hashParams.get('refresh_token') || '';
              
              const { error: setSessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (setSessionError) {
                console.error('Error setting session:', setSessionError);
                setStatus('error');
                setMessage('Failed to set session from URL tokens');
                return;
              }
              
              // Get session again after setting it
              const { data: newData } = await supabase.auth.getSession();
              if (!newData.session) {
                console.error('Still no session after setting tokens');
                setStatus('error');
                setMessage('Authentication failed - no session');
                return;
              }
            } catch (tokenError) {
              console.error('Error processing tokens:', tokenError);
              setStatus('error');
              setMessage('Error processing authentication tokens');
              return;
            }
          } else {
            console.error('No session and no tokens in URL');
            setStatus('error');
            setMessage('Authentication failed - no session or tokens');
            return;
          }
        }
        
        // At this point we should have a session
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session;
        
        if (!session) {
          console.error('Still no session after all attempts');
          setStatus('error');
          setMessage('Failed to establish session');
          return;
        }
        
        console.log('User authenticated:', session.user.id);
        
        // Check if user has a profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
          
        console.log('Profile check:', profileData ? 'Found' : 'Not found');
        
        // Use direct window.location for more reliable redirection
        if (profileData && !profileError) {
          console.log('User has profile, redirecting to grants');
          setStatus('success');
          setMessage('Redirecting to grants page...');
          
          // Short delay before redirect
          setTimeout(() => {
            window.location.href = '/grants';
          }, 500);
        } else {
          console.log('User needs onboarding, redirecting');
          setStatus('success');
          setMessage('Redirecting to onboarding...');
          
          // Short delay before redirect
          setTimeout(() => {
            window.location.href = '/onboarding';
          }, 500);
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    processAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-uni-purple-700 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Processing Authentication</h2>
            <p className="text-gray-600">Please wait while we complete your sign-in...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="bg-red-100 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
            <p className="text-gray-600 mb-6">{message || 'There was a problem with your sign-in'}</p>
            <button 
              onClick={() => window.location.href = '/login'} 
              className="px-6 py-3 bg-uni-purple-600 text-white rounded-md hover:bg-uni-purple-700 transition-colors"
            >
              Return to Login
            </button>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="bg-green-100 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Successful</h2>
            <p className="text-gray-600">{message || 'Redirecting you now...'}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
