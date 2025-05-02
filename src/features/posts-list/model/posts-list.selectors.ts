import { RootState } from "@/app/store";

export const getOpenedModalPostsList = (state: RootState) =>
  state.postsList.modal;
export const getSelectedUserInPostsList = (state: RootState) =>
  state.postsList.user;
