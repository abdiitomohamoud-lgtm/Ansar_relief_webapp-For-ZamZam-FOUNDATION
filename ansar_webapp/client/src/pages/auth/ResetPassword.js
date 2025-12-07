import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/appSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would verify the token with the API
    // For now, we'll simulate a token verification with a timeout
    const verifyToken = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, let's assume token is valid if it's at least 10 chars
        if (token && token.length >= 10) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          dispatch(addNotification({
            type: 'error',
            message: 'Invalid or expired password reset link'
          }));
        }
      } catch (error) {
        setIsTokenValid(false);
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to verify reset token'
        }));
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, dispatch]);

  const validateForm = () => {
    if (!password || !confirmPassword) {
      dispatch(addNotification({
        type: 'error',
        message: 'Both fields are required'
      }));
      return false;
    }

    if (password.length < 8) {
      dispatch(addNotification({
        type: 'error',
        message: 'Password must be at least 8 characters long'
      }));
      return false;
    }

    if (password !== confirmPassword) {
      dispatch(addNotification({
        type: 'error',
        message: 'Passwords do not match'
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state
      setIsSuccess(true);
      dispatch(addNotification({
        type: 'success',
        message: 'Your password has been successfully reset'
      }));
      
      // Redirect to login after a brief delay
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <LoadingSpinner size="lg" text="Verifying reset link..." />
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Invalid Reset Link</h3>
            <p className="mt-2 text-sm text-gray-500">
              This password reset link is invalid or has expired.
            </p>
            <div className="mt-6">
              <Link
                to="/auth/forgot-password"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Request a new reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Password reset successful</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your password has been reset successfully. You will be redirected to the login page in a few seconds.
              </p>
              <div className="mt-6">
                <Link
                  to="/auth/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Log in now
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {isSubmitting ? <LoadingSpinner size="sm" text="Resetting..." /> : 'Reset password'}
                </button>
              </div>
              
              <div className="text-sm text-center">
                <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 