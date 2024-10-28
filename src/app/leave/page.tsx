"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useLeaveStore from "../../hooks/leaveStore"; // Import the Zustand store
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// Define the payload type for the leave request
interface LeaveRequestPayload {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

const LeaveForm = () => {
  // Access Zustand state and actions
  const {
    employeeId,
    leaveType,
    startDate,
    endDate,
    reason,
    resetForm,
    setEmployeeId,
    setLeaveType,
    setStartDate,
    setEndDate,
    setReason,
  } = useLeaveStore();

  // Define the API call function
  const submitLeaveRequest = async (payload: LeaveRequestPayload) => {
    const response = await axios.post("http://localhost:3000/v1/leave", payload);
    return response.data;
  };

  // Set up the mutation with proper typing
  const mutation = useMutation<unknown, Error, LeaveRequestPayload>({
    mutationFn: submitLeaveRequest,
    onSuccess: (data) => {
      console.log("Leave request submitted:", data);
      toast.success("Leave request submitted successfully!"); // Notify success
      resetForm(); // Reset form after successful submission
    },
    onError: (error: Error) => {
      console.error("Error submitting leave request:", error);
      toast.error("Error submitting leave request."); // Notify error
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: LeaveRequestPayload = {
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending", // Assuming status is always "Pending" on submission
    };
    mutation.mutate(payload); // Pass the payload to mutate
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Request Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee ID */}
        <div>
          <label htmlFor="employeeId" className="block text-gray-700 font-medium mb-2">
            Employee ID
          </label>
          <input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Employee ID"
            required
          />
        </div>

        {/* Leave Type */}
        <div>
          <label htmlFor="leaveType" className="block text-gray-700 font-medium mb-2">
            Leave Type
          </label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
            Reason
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide the reason for your leave..."
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Leave Request
          </button>
        </div>
      </form>
      <ToastContainer /> {/* Add the ToastContainer for notifications */}
    </div>
  );
};

export default LeaveForm;
