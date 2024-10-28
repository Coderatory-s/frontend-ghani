"use client";

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useRouter } from 'next/navigation';
import { useRegisterFormStore } from '../../hooks/useregStore'; // Import your Zustand store

const RegisterForm = () => {
  const {
    name,
    email,
    phoneNumber,
    password,
    consent,
    resetForm,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConsent,
  } = useRegisterFormStore(); // Access Zustand state and actions

  const router = useRouter();

  // Mutation for registration
  const registerMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name,
        email,
        phoneNumber,
        password,
        consent: consent.toString(),
      };

      const response = await axios.post('http://localhost:3000/v1/register', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Registration successful! Redirecting to login...'); // Success toast
      resetForm(); // Reset the form using Zustand store

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
    onError: () => {
      toast.error('Registration failed. Please try again.'); // Error toast
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Email Address"
          required
        />

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Phone Number"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Password"
          required
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mr-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="text-gray-700">I consent to the terms and conditions</label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition"
        >
          Register
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable /> {/* ToastContainer */}
    </div>
  );
};

export default RegisterForm;
