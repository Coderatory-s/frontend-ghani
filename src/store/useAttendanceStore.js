// src/store/useAttendanceStore.js

import create from 'zustand';

const useAttendanceStore = create((set) => ({
  checkIn: null,
  checkOut: null,
  setCheckIn: (time) => set({ checkIn: time }),
  setCheckOut: (time) => set({ checkOut: time }),
}));

export default useAttendanceStore;
