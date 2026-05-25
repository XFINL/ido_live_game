import { create } from 'zustand';

interface GameState {
  gender: 'male' | 'female' | null;
  stageName: string;
  currentPage: 'start' | 'story' | 'main';
  setGender: (gender: 'male' | 'female') => void;
  setStageName: (name: string) => void;
  setCurrentPage: (page: 'start' | 'story' | 'main') => void;
}

export const useGameStore = create<GameState>((set) => ({
  gender: null,
  stageName: '',
  currentPage: 'start',
  setGender: (gender) => set({ gender }),
  setStageName: (stageName) => set({ stageName }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
