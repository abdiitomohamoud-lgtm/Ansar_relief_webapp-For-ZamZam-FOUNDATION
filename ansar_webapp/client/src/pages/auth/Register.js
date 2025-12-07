import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../store/api/apiSlice';
import { registerStart, registerSuccess, registerFailure, clearError } from '../../store/slices/authSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Input, ErrorAlert } from '../../components/common';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(state => state.auth);
  const [register] = useRegisterMutation();

  useEffect(() => {
    // Clear any previous errors when component mounts
      dispatch(clearError());
    
    // Redirect if already logged in
    if (user) {
      navigate('/');
    }
  }, [dispatch, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      dispatch(registerFailure('Please fill in all fields'));
      return;
    }
    
    if (password !== confirmPassword) {
      dispatch(registerFailure('Passwords do not match'));
      return;
    }
    
    if (!agreeTerms) {
      dispatch(registerFailure('You must agree to the terms and conditions'));
      return;
    }
    
    try {
      dispatch(registerStart());
      
      // Simulate API call
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          name,
          email,
          role: 'user'
        };
        dispatch(registerSuccess(userData));
        navigate('/');
      }, 1000);
      
    } catch (err) {
      dispatch(registerFailure(err.message || 'Registration failed'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

        {error && <ErrorAlert message={error} className="mt-4" />}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Full Name"
                    type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              startIcon={<FaUser className="text-gray-400" />}
              placeholder="Enter your full name"
                    required
            />
            
            <Input
              label="Email Address"
                  type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<FaEnvelope className="text-gray-400" />}
              placeholder="Enter your email"
                  required
            />
            
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<FaLock className="text-gray-400" />}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              placeholder="Create a password"
                  required
            />
            
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              startIcon={<FaLock className="text-gray-400" />}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              placeholder="Confirm your password"
              required
            />
              </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register; 