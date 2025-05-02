"use client";

import { usePostsListBanUser } from "@/features/posts-list/lib/usePostsListBanUser";
import { BanUserModal } from "@/features/users-list/ui/user-list-modals/BanUserModal";

export const PostsListModals = () => {
  const { viewModal, confirmBanUser, user, cancel } = usePostsListBanUser();

  switch (viewModal) {
    case "ban":
      return (
        <BanUserModal
          open={viewModal === "ban"}
          confirmBanUser={confirmBanUser}
          user={user}
          cancel={cancel}
        />
      );
    default:
      return null;
  }
};
