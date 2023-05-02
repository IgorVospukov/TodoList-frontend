import { configureStore } from '@reduxjs/toolkit'
import  signUpUser  from './slices/signUpUser';
import authIsUserLogin from './slices/authIsUserLogin';
import getUsersFriends from './slices/getUsersFriends';
import getUserTodos from './slices/getUserTodos';
import checkUserIsRegistered from './slices/checkUserIsRegistered';
import getAllUsers from './slices/getAllUsers';
import addFriendToUser from './slices/addFriendToUser';
import createUserTodo from './slices/createUserTodo';

const store = configureStore({
  reducer: {
    signUpUser: signUpUser,
    authIsUserLogin: authIsUserLogin,
    getUsersFriends: getUsersFriends,
    getUserTodos: getUserTodos,
    checkUserIsRegistered: checkUserIsRegistered,
    getAllUsers: getAllUsers,
    addFriendToUser: addFriendToUser,
    createUserTodo: createUserTodo,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch