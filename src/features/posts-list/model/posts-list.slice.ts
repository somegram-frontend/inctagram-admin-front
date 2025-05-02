import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "ban" | null;

interface State {
  user: {
    userId: string;
    userName: string;
  } | null;
  modal: ModalType;
}

const initialState: State = {
  user: null,
  modal: null,
};

const postsListSlice = createSlice({
  name: "postsList",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        user: {
          userId: string;
          userName: string;
        } | null;
        modal: ModalType;
      }>,
    ) => {
      state.user = action.payload.user;
      state.modal = action.payload.modal;
    },
    closeModal: (state) => {
      state.user = null;
      state.modal = null;
    },
  },
});

export const postsListActions = postsListSlice.actions;
export default postsListSlice.reducer;
