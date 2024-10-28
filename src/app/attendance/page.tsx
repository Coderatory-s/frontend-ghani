// src/app/attendance/page.tsx
"use client"; // Mark the component as client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct import for Next.js
import useStore from '../../hooks/useStore'; // Custom store hook
import { useMutation } from '@tanstack/react-query'; // Import useMutation from TanStack Query
import axios from 'axios'; // API requests
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa'; // Loading spinner
import { Button } from '@/components/ui/button'; // Button component
import { Input } from '@/components/ui/input'; // Input component
import { Alert } from '@/components/ui/alert'; // Alert component

const AttendanceForm = () => {
  const router = useRouter(); // Initialize router for navigation
  const setCheckIn = useStore((state) => state.setCheckIn); // Store check-in state
  const setCheckOut = useStore((state) => state.setCheckOut); // Store check-out state
  const [userId, setUserId] = useState(''); // User ID input state
  const [message, setMessage] = useState(''); // Success message state
  const [error, setError] = useState(''); // Error message state
  const [loadingCheckIn, setLoadingCheckIn] = useState(false); // Local loading state for check-in
  const [loadingCheckOut, setLoadingCheckOut] = useState(false); // Local loading state for check-out

  // Check-in mutation
  const checkInMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:3000/v1/attedance/attendance/checkin', { userId });
      return response.data;
    },
    onSuccess: () => {
      setCheckIn(new Date().toISOString());
      setMessage('Check-in successful!');
      setLoadingCheckIn(false); // Stop loading on success
      router.push('/report'); // Redirect to report page
    },
    onError: () => {
      setError('Check-in failed. Try again.');
      setLoadingCheckIn(false); // Stop loading on error
    },
  });

  // Check-out mutation
  const checkOutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:3000/v1/attedance/attendance/checkout', { userId });
      return response.data;
    },
    onSuccess: () => {
      setCheckOut(new Date().toISOString());
      setMessage('Check-out successful!');
      setLoadingCheckOut(false); // Stop loading on success
      router.push('/report'); // Redirect to report page
    },
    onError: () => {
      setError('Check-out failed. Try again.');
      setLoadingCheckOut(false); // Stop loading on error
    },
  });

  // Handle check-in button click
  const handleCheckIn = async () => {
    setLoadingCheckIn(true);
    setMessage(''); // Reset message
    setError(''); // Reset error
    checkInMutation.mutate();
  };

  // Handle check-out button click
  const handleCheckOut = async () => {
    setLoadingCheckOut(true);
    setMessage(''); // Reset message
    setError(''); // Reset error
    checkOutMutation.mutate();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 p-4 text-white space-y-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">Attendance</li>
          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">History</li>
          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">Reports</li>
          <li className="hover:bg-blue-800 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendance</h2>
          
          <Input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mb-4"
          />

          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
            <Button
              onClick={handleCheckIn}
              disabled={loadingCheckIn} // Disable button if loading
              variant="default" // Valid variant
              className="flex-1"
            >
              {loadingCheckIn ? <FaSpinner className="animate-spin inline-block mr-2" /> : <AiOutlineCheckCircle className="inline-block mr-2" />}
              {loadingCheckIn ? 'Checking In...' : 'Check In'}
            </Button>

            <Button
              onClick={handleCheckOut}
              disabled={loadingCheckOut} // Disable button if loading
              variant="destructive" // Valid variant
              className="flex-1"
            >
              {loadingCheckOut ? <FaSpinner className="animate-spin inline-block mr-2" /> : <AiOutlineCloseCircle className="inline-block mr-2" />}
              {loadingCheckOut ? 'Checking Out...' : 'Check Out'}
            </Button>
          </div>

          {message && <Alert variant="default">{message}</Alert>}
          {error && <Alert variant="destructive">{error}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
