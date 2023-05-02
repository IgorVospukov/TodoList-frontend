import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../hooks';

interface User {
  name: string;
  surName: string;
  email: string;
  password: string;
  friends?: string[];
}

interface AddFriend {
 id: string;
 email: string;
}


interface FriendState {
  currentUser: User | null;
  isAuthenticating: boolean;
  error: string | null;
}

export const addFriend = createAsyncThunk<User, AddFriend>(
  'auth/addfriends',
  async ( {id, email}) => {
    const token = useAppSelector( state => state.authIsUserLogin.currentToken);
    const response = await fetch(`http://localhost:5000/user/friends/${id}/${email}`, {
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
    
    return responseData.data;
  }
);

export const addFriendToUser = createSlice({
  name: 'getFriends',
  initialState: {
    currentUser: null,
    isAuthenticating: false,
    error: null,
  } as FriendState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFriend.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.error.message ?? 'An error occurred';
      })     
  },
});

export default addFriendToUser.reducer;
