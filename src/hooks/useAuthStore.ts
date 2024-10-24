// useAuthStore.ts
import {create} from 'zustand';

interface AuthState {
  email: string;
  password: string;
  errorMessage: string;
  successMessage: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  resetMessages: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  errorMessage: '',
  successMessage: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  resetMessages: () => set({ errorMessage: '', successMessage: '' }),
}));
