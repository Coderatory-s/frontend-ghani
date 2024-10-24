// useTeamStore.ts
import {create} from 'zustand';

interface Member {
  name: string;
  email: string;
  role: string;
}

interface TeamState {
  teamName: string;
  description: string;
  leaderName: string;
  leaderEmail: string;
  members: Member[];
  setTeamName: (name: string) => void;
  setDescription: (description: string) => void;
  setLeaderName: (name: string) => void;
  setLeaderEmail: (email: string) => void;
  addMember: () => void;
  updateMember: (index: number, field: keyof Member, value: string) => void;
  resetForm: () => void;
}

const useTeamStore = create<TeamState>((set) => ({
  teamName: '',
  description: '',
  leaderName: '',
  leaderEmail: '',
  members: [{ name: '', email: '', role: '' }],
  setTeamName: (name) => set({ teamName: name }),
  setDescription: (description) => set({ description }),
  setLeaderName: (name) => set({ leaderName: name }),
  setLeaderEmail: (email) => set({ leaderEmail: email }),
  addMember: () => set((state) => ({
    members: [...state.members, { name: '', email: '', role: '' }],
  })),
  updateMember: (index, field, value) => set((state) => {
    const newMembers = [...state.members];
    newMembers[index][field] = value;
    return { members: newMembers };
  }),
  resetForm: () => set({
    teamName: '',
    description: '',
    leaderName: '',
    leaderEmail: '',
    members: [{ name: '', email: '', role: '' }],
  }),
}));

export default useTeamStore;
