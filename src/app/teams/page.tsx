"use client"; // Marks the component as a client component

import React from 'react';
import { useMutation } from '@tanstack/react-query'; // Import useMutation from TanStack Query
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; // Success Icon
import { AiOutlineWarning } from 'react-icons/ai'; // Error Icon
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import useTeamStore from '../../hooks/useTeamStore'; // Import Zustand store

const TeamForm = () => {
  const {
    teamName,
    description,
    leaderName,
    leaderEmail,
    members,
    setTeamName,
    setDescription,
    setLeaderName,
    setLeaderEmail,
    addMember,
    updateMember,
    resetForm,
  } = useTeamStore(); // Access Zustand store

  const [successMessage, setSuccessMessage] = React.useState<string>(''); // State for success message
  const [errorMessage, setErrorMessage] = React.useState<string>(''); // State for error message

  const router = useRouter(); // Initialize useRouter

  // Mutation for team submission
  const teamMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        teamName,
        description,
        leader: {
          name: leaderName,
          email: leaderEmail,
        },
        members,
      };

      const response = await axios.post('http://localhost:3000/v1/team/create', payload);
      return response.data; // Return response data if needed
    },
    onSuccess: () => {
      setSuccessMessage('Team created successfully! Redirecting...'); // Set success message
      setErrorMessage(''); // Reset error message

      // Reset form after successful submission
      resetForm();

      // Redirect to another page (if needed) after a short delay
      setTimeout(() => {
        router.push('/teams'); // Change to the desired route
      }, 2000); // 2 seconds delay
    },
    onError: () => {
      setErrorMessage('Team submission failed. Please try again.'); // Set error message
      setSuccessMessage(''); // Reset success message
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    teamMutation.mutate(); // Trigger the mutation
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Team</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter Team Name"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter Team Description"
          rows={4}
          required
        />

        <input
          type="text"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Leader Name"
          required
        />

        <input
          type="email"
          value={leaderEmail}
          onChange={(e) => setLeaderEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Leader Email"
          required
        />

        <h3 className="font-semibold text-xl mb-4 text-gray-700">Team Members</h3>
        {members.map((member, index) => (
          <div key={index} className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-3 mb-4">
            <input
              type="text"
              value={member.name}
              onChange={(e) => updateMember(index, 'name', e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Member Name"
              required
            />
            <input
              type="email"
              value={member.email}
              onChange={(e) => updateMember(index, 'email', e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Member Email"
              required
            />
            <input
              type="text"
              value={member.role}
              onChange={(e) => updateMember(index, 'role', e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Member Role"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMember}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all mb-6"
        >
          Add Another Member
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Create Team
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

export default TeamForm;
