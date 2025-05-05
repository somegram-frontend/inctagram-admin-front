"use client";

import { useUserListModals } from "@/features/users-list/lib";
import { DeleteUserModal } from "./DeleteUserModal";
import { BanUserModal } from "./BanUserModal";
import { UnbanUserModal } from "./UnbanUserModal";

export const UserListModals = () => {
  const { viewModal } = useUserListModals();

  const { cancel, user, confirmBanUser } = useUserListModals();

  console.log("viewModal", viewModal);

  if (viewModal === "delete") {
    return <DeleteUserModal open={viewModal === "delete"} />;
  } else if (viewModal === "ban") {
    return (
      <BanUserModal
        open={viewModal === "ban"}
        cancel={cancel}
        user={user}
        confirmBanUser={confirmBanUser}
      />
    );
  } else if (viewModal === "unban") {
    return <UnbanUserModal open={viewModal === "unban"} />;
  } else return null;
};
