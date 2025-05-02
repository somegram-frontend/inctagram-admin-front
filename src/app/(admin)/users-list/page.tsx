import { UserList } from "@/features/users-list/ui";
import { Suspense } from "react";

export default function UserListPage() {
  return (
    <Suspense>
      <UserList />
    </Suspense>
  );
}
