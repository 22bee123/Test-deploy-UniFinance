import { useEffect } from 'react';

// Extremely simplified AuthCallback component that just redirects to onboarding
const AuthCallback = () => {
  useEffect(() => {
    // Log the callback URL for debugging
    console.log('Auth callback triggered. URL:', window.location.href);
    
    // Add a small delay to ensure any authentication processes complete
    setTimeout(() => {
      // Always redirect to onboarding for new users
      // The onboarding component will check if the user has a profile and redirect if needed
      console.log('Redirecting to onboarding page...');
      window.location.href = '/onboarding';
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-uni-purple-700 mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Complete</h2>
        <p className="text-gray-600">Redirecting you to complete your profile...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
