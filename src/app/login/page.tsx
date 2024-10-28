"use client";

import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { FaLock } from 'react-icons/fa'; // Lock icon for design
import { useAuthStore } from '../../hooks/useAuthStore'; // Import the Zustand store

const LoginForm = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const { email, password, setEmail, setPassword, errorMessage, setErrorMessage, successMessage, setSuccessMessage, resetMessages } = useAuthStore(); // Use Zustand store
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false); // Local loading state

  // Define the API call function for login
  const login = async () => {
    const payload = { email, password }; // Create payload from Zustand store
    const response = await axios.post('http://localhost:3000/v1/login', payload);
    return response.data; // Return the response data
  };

  // Set up the mutation for the login request
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      resetMessages(); // Clear previous messages
      setSuccessMessage('Login successful!'); // Set success message
      setIsSubmitting(false); // Reset the loading state

      // Redirect to /attendance after a short delay to show success message
      setTimeout(() => {
        router.push('/attendance'); // Redirect to /attendance
      }, 1500); // Delay of 1.5 seconds
    },
    onError: (error: any) => {
      console.error('Error during login:', error);
      setErrorMessage('Invalid login credentials. Please try again.'); // Set error message on failure
      setSuccessMessage(''); // Clear any previous success messages
      setIsSubmitting(false); // Reset the loading state
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state before mutation
    mutation.mutate(); // Trigger the mutation
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Use Zustand to set email
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email Address"
            required
          />
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Use Zustand to set password
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Password"
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? (
            <>Logging in...</> // Show loading text while logging in
          ) : (
            <>
              <FaLock className="inline mr-2" /> Login
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up here</a>
      </p>
    </div>
  );
};

export default LoginForm;
