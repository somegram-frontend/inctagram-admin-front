import { UserList } from "@/features/userList/ui";
import { Suspense } from "react";

export default function UserListPage() {
  return (
    <Suspense>
      <UserList />
    </Suspense>
  );
}
