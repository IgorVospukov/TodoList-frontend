import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: string;
  name: string;
  surName: string;
  email: string;
  password: string;
  friends: [{id: string, email: string}];
};

interface GetFriendsState {
  currentUser: User | null;
  isAuthenticating: boolean;
  error: string | null;
}
type Token = string | null;

export const getFriends = createAsyncThunk<User, Token>(
  'getFriends',
  async (token: Token) => {
    console.log("token from redux getfriends", token);
    
    const response = await fetch(`http://localhost:5000/user/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,    
    },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    console.log('response from getUserFriends', responseData);
    console.log("response.data", responseData.friends);
    

    return responseData;
  }
);

export const getUsersFriends = createSlice({
  name: 'getFriends',
  initialState: {
    currentUser: null,
    isAuthenticating: false,
    error: null,
  } as GetFriendsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default getUsersFriends.reducer;
