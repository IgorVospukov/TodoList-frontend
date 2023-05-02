import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface Todo {
  title: string;
  description: string;
}

interface AuthTodoState {
  currentTodo: Todo | null;
  isAuthenticating: boolean;
  error: string | null;
}

interface TodoInput {
  title: string;
  description?: string;
  token: string | null;
}


export const createTodo = createAsyncThunk<Todo, TodoInput>(
  'createTodo',
  async (userData) => {
    const {title, description, token} = userData;
    const response = await fetch(`http://localhost:5000/todos/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,    
    },
      body: JSON.stringify({title, description}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    console.log('response from create Todo', responseData);
    
    return responseData.data;
  }
);

export const createUserTodo = createSlice({
  name: 'createTodo',
  initialState: {
    currentTodo: null,
    isAuthenticating: false,
    error: null,
  } as AuthTodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentTodo = action.payload;
        state.error = null;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default createUserTodo.reducer;
