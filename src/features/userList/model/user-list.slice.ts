import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBlockStatus } from "@/shared/configs/gql/graphql";

export type ModalType = "delete" | "ban" | "unban" | null;

interface State {
  user: {
    userId: string;
    userName: string;
  } | null;
  modal: ModalType;
  statusFilter: UserBlockStatus;
}

const initialState: State = {
  user: null,
  modal: null,
  statusFilter: UserBlockStatus.All,
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
    setStatusFilter: (state, action: PayloadAction<UserBlockStatus>) => {
      state.statusFilter = action.payload;
    },
  },
});

export const userListActions = userListSlice.actions;
export default userListSlice.reducer;
