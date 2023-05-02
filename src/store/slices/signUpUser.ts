import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  surName: string;
  email: string;
  password: string;
  friends?: [string];
}

interface AuthRegState {
  currentUser: User | null;
  isAuthenticating: boolean;
  error: string | null;
}

interface RegisterUserInput {
  name: string;
  surName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<User, RegisterUserInput>(
  'auth/registerUser',
  async (userData: RegisterUserInput) => {
    const response = await fetch(`http://localhost:5000/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
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

export const signUpUser = createSlice({
  name: 'signUp',
  initialState: {
    currentUser: null,
    isAuthenticating: false,
    error: null,
  } as AuthRegState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default signUpUser.reducer;
