import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UsersStore {
  users: User[];
  isLoading: boolean;
  addUser: (user: User) => void;
  fetchUsers: () => void;
}

export const useUsers = create<UsersStore>()(devtools(immer((set) => ({
  users: [],
  isLoading: false,
  addUser: (user) => set(state => {
    state.users.push(user);
  }),
  fetchUsers: async () => {
    // run server "npm run server"
    const result = await fetch('http://localhost:8000/users');
    const json = await result.json() as User[];
    set({users: json});
  },
}))));