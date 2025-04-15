import { RootState } from "@/app/store";

export const getOpenedModalUserList = (state: RootState) =>
  state.userList.modal;
export const getSelectedUserUserList = (state: RootState) =>
  state.userList.user;
