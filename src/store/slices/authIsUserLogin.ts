import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../hooks';

interface AuthLogState {
  currentToken: string | null;
  isAuthenticating: boolean;
  error: string | null;
}
interface LoginUserInput {
  email: string;
  password: string;
}

const API_USER_LOGIN = process.env.API_USER_LOGIN;
export const loginUser = createAsyncThunk<string, LoginUserInput>(
  'auth/loginUser',
  async (userData) => {
    const response = await fetch(`${API_USER_LOGIN}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json'},   
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.access_token;
  }
);

export const authIsUserLogin = createSlice({
  name: 'authLog',
  initialState: {
    currentToken: null,
    isAuthenticating: false,
    error: null,
  } as AuthLogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentToken = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default authIsUserLogin.reducer;