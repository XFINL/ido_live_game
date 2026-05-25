
import { create } from 'zustand';

interface GameState {
  gender: 'male' | 'female' | null;
  stageName: string;
  setGender: (gender: 'male' | 'female') => void;
  setStageName: (name: string) => void;
}

export const useGameStore = create&lt;GameState&gt;((set) =&gt; ({
  gender: null,
  stageName: '',
  setGender: (gender) =&gt; set({ gender }),
  setStageName: (name) =&gt; set({ stageName: name }),
}));
