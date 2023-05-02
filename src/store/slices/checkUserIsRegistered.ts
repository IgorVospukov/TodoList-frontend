import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  surName: string;
  email: string;
  password: string;
  friends?: string[];
}

interface CheckUserState {
  currentUser: true | User | null;
  isAuthenticating: boolean;
  error: string | null;
}

interface IsRegisterUserInput {
  email: string;
  password: string;
}

export const isUserRegister = createAsyncThunk<User, IsRegisterUserInput>(
  'auth/IsRegisterUser',
  async (userData: IsRegisterUserInput) => {
    const response = await fetch(`http://localhost:5000/auth/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    console.log('response from isUserRegister', responseData);

    return responseData.data;
  }
);

export const checkUserIsRegistered = createSlice({
  name: 'checkUser',
  initialState: {
    currentUser: true,
    isAuthenticating: false,
    error: null,
  } as CheckUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isUserRegister.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(isUserRegister.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(isUserRegister.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default checkUserIsRegistered.reducer;
