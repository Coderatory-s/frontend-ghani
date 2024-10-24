"use client"; // Marks the component as a client component

import React from 'react';
import { useMutation } from '@tanstack/react-query'; // Import useMutation from TanStack Query
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; // Success Icon
import { AiOutlineWarning } from 'react-icons/ai'; // Error Icon
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useReportStore } from '../../hooks/useReportStore'; // Import Zustand store

const ReportForm = () => {
  const {
    title,
    description,
    progress,
    authorName,
    authorEmail,
    successMessage,
    errorMessage,
    setTitle,
    setDescription,
    setProgress,
    setAuthorName,
    setAuthorEmail,
    setSuccessMessage,
    setErrorMessage,
    resetForm,
  } = useReportStore(); // Destructure the store

  const router = useRouter(); // Initialize useRouter

  // Mutation for report submission
  const reportMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        description,
        progress,
        author: {
          name: authorName,
          email: authorEmail,
        },
      };

      const response = await axios.post('http://localhost:3000/v1/report/report/create', payload);
      return response.data; // Return response data if needed
    },
    onSuccess: () => {
      setSuccessMessage('Report created successfully! Redirecting...'); // Set success message
      setErrorMessage(''); // Reset error message

      // Reset form after successful submission
      resetForm();

      // Redirect to another page (if needed) after a short delay
      setTimeout(() => {
        router.push('/teams'); // Change to the desired route
      }, 2000); // 2 seconds delay
    },
    onError: () => {
      setErrorMessage('Report submission failed. Please try again.'); // Set error message
      setSuccessMessage(''); // Reset success message
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    reportMutation.mutate(); // Trigger the mutation
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Report Title"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Report Description"
          required
        />

        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Progress (0-100)"
          min={0}
          max={100}
          required
        />

        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Author Name"
          required
        />

        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Author Email"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition"
        >
          Submit Report
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-600 text-center flex items-center justify-center">
          <FaCheckCircle className="mr-2" /> {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="mt-4 text-red-600 text-center flex items-center justify-center">
          <AiOutlineWarning className="mr-2" /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ReportForm;
