// src/hooks/useStore.ts
import { create } from 'zustand';

type AttendanceState = {
  checkInTime: string | null;
  checkOutTime: string | null;
};

type StoreState = {
  checkOut: any;
  checkIn: any;
  attendance: AttendanceState;
  setCheckIn: (time: string) => void;
  setCheckOut: (time: string) => void;
};

const useStore = create<StoreState>((set) => ({
  attendance: {
    checkInTime: null,
    checkOutTime: null,
  },
  setCheckIn: (time: string) => set((state) => ({
    attendance: { ...state.attendance, checkInTime: time },
  })),
  setCheckOut: (time: string) => set((state) => ({
    attendance: { ...state.attendance, checkOutTime: time },
  })),
}));

export default useStore;
