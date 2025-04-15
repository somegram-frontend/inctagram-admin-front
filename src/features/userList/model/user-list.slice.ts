import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "delete" | "ban" | "unban" | null;

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

const userListSlice = createSlice({
  name: "userList",
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

export const userListActions = userListSlice.actions;
export default userListSlice.reducer;
