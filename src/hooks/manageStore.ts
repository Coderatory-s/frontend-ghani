// hooks/leaveStore.ts

import {create} from 'zustand';

interface LeaveStore {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  setEmployeeId: (id: string) => void;
  setLeaveType: (type: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setReason: (reason: string) => void;
  resetForm: () => void;
}

const useLeaveStore = create<LeaveStore>((set) => ({
  employeeId: '',
  leaveType: 'Sick Leave', // Default value
  startDate: '',
  endDate: '',
  reason: '',
  setEmployeeId: (id) => set({ employeeId: id }),
  setLeaveType: (type) => set({ leaveType: type }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setReason: (reason) => set({ reason }),
  resetForm: () => set({ employeeId: '', leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '' }),
}));

export default useLeaveStore;
