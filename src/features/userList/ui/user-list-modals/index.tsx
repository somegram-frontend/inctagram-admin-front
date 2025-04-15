"use client";

import { useUserListModals } from "../../model/useUserListModals";
import { DeleteUserModal } from "./DeleteUserModal";
import { BanUserModal } from "./BanUserModal";
import { UnbanUserModal } from "./UnbanUserModal";

export const UserListModals = () => {
  const { viewModal } = useUserListModals();

  console.log("viewModal", viewModal);

  if (viewModal === "delete") {
    return <DeleteUserModal open={viewModal === "delete"} />;
  } else if (viewModal === "ban") {
    return <BanUserModal open={viewModal === "ban"} />;
  } else if (viewModal === "unban") {
    return <UnbanUserModal open={viewModal === "unban"} />;
  } else return null;
};
