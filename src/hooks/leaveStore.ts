// leaveStore.ts
import {create} from 'zustand';

// Define the store's state and actions
interface LeaveStore {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  setEmployeeId: (id: string) => void;
  setLeaveType: (type: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setReason: (reason: string) => void;
  resetForm: () => void;
}

const useLeaveStore = create<LeaveStore>((set) => ({
  employeeId: '',
  leaveType: 'Sick Leave',
  startDate: '',
  endDate: '',
  reason: '',
  status: 'Pending',
  setEmployeeId: (id) => set({ employeeId: id }),
  setLeaveType: (type) => set({ leaveType: type }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setReason: (reason) => set({ reason }),
  resetForm: () => set({
    employeeId: '',
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',
  }),
}));

export default useLeaveStore;
