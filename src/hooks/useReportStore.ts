// useReportStore.ts
import {create} from 'zustand';

interface ReportFormState {
  title: string;
  description: string;
  progress: number;
  authorName: string;
  authorEmail: string;
  successMessage: string;
  errorMessage: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setProgress: (progress: number) => void;
  setAuthorName: (name: string) => void;
  setAuthorEmail: (email: string) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
  resetForm: () => void;
}

export const useReportStore = create<ReportFormState>((set) => ({
  title: '',
  description: '',
  progress: 0,
  authorName: '',
  authorEmail: '',
  successMessage: '',
  errorMessage: '',
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setProgress: (progress) => set({ progress }),
  setAuthorName: (name) => set({ authorName: name }),
  setAuthorEmail: (email) => set({ authorEmail: email }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  resetForm: () => set({
    title: '',
    description: '',
    progress: 0,
    authorName: '',
    authorEmail: '',
    successMessage: '',
    errorMessage: '',
  }),
}));
