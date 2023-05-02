import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface MyTodos {
  title: string;
  description: string;
}

interface GetTodosState {
  currentUserTodos: MyTodos[] | [];
  isAuthenticating: boolean;
  error: string | null;
}

export const getTodos = createAsyncThunk<MyTodos[], string | null>(
  'auth/registerUser',
  async (token) => {
    const response = await fetch(`http://localhost:5000/todos/mytodos`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`,   
    },

    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    console.log('response', responseData);
    
    return responseData.data;
  }
);

export const getUserTodos = createSlice({
  name: 'getFriends',
  initialState: {
    currentUserTodos: [],
    isAuthenticating: false,
    error: null,
  } as GetTodosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentUserTodos = action.payload;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default getUserTodos.reducer;
