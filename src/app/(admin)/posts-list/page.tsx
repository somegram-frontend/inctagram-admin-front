import { PostsListPage } from "@/features/posts-list/ui";
import { Suspense } from "react";

export default function PostsList() {
  return (
    <Suspense>
      <PostsListPage />
    </Suspense>
  );
}
