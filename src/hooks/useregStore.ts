// useStore.ts
import {create} from 'zustand';

interface RegisterFormState {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  consent: boolean;
  successMessage: string;
  errorMessage: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setConsent: (consent: boolean) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
  resetForm: () => void;
}

export const useRegisterFormStore = create<RegisterFormState>((set) => ({
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  consent: false,
  successMessage: '',
  errorMessage: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPassword: (password) => set({ password }),
  setConsent: (consent) => set({ consent }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  resetForm: () => set({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    consent: false,
    successMessage: '',
    errorMessage: '',
  }),
}));
