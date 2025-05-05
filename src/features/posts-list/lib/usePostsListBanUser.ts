import { useMutation } from "@tanstack/react-query";
import { banUser } from "@/features/users-list/api";
import { toast } from "react-toastify";
import { queryClient } from "@/shared/api/instanse";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  getOpenedModalPostsList,
  getSelectedUserInPostsList,
  ModalType,
  postsListActions,
} from "@/features/posts-list/model";

export const usePostsListBanUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getSelectedUserInPostsList);
  const viewModal = useAppSelector(getOpenedModalPostsList);

  const cancel = () => {
    dispatch(postsListActions.closeModal());
  };

  const openModal = (
    user: { userName: string; userId: string },
    modal: ModalType,
  ) => {
    dispatch(postsListActions.openModal({ user, modal }));
  };

  const { mutate: confirmBanUser } = useMutation({
    mutationKey: ["users", "posts"],
    mutationFn: async ({ banReason }: { banReason: string }) =>
      await banUser({
        banUserInput: { userId: user?.userId || "", banReason },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "posts"] });
      toast.success("User banned successfully");
      cancel();
    },
    onError: () => {
      toast.error("Error banning user");
    },
  });

  return {
    viewModal,
    cancel,
    openModal,
    user,
    confirmBanUser,
  };
};
