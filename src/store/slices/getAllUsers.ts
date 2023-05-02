import { configureStore, createSlice } from '@reduxjs/toolkit';

  interface User {
    id: string;
    name: string;
    surName: string;
    email: string;
    password: string;
    friends?: [string];
  };

  interface AllUsers {
    items: User[] | null;
  }

export const getAllUsers = createSlice({
  name: 'data',
  initialState: {
    items: [] ,
  } as AllUsers,
  reducers: {
    setData: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setData } = getAllUsers.actions;
export default getAllUsers.reducer;
