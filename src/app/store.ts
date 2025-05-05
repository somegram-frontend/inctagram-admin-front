import { configureStore } from "@reduxjs/toolkit";
import userListSlice from "@/features/users-list/model/user-list.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postsListSlice from "@/features/posts-list/model/posts-list.slice";

export const store = configureStore({
  reducer: {
    userList: userListSlice,
    postsList: postsListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
