"use client";

import { Page } from "@/shared/components/page";
import { Input } from "@honor-ui/inctagram-ui-kit";
import { useState, useRef, useEffect } from "react";

import s from "./posts-list-page.module.scss";
import { usePosts } from "../../lib/usePostsLists";
import { Loader } from "@/shared/components/loader";
import { Post } from "./post";
import { PostsListModals } from "@/features/posts-list/ui/posts-list-page/posts-list-modals";
import { usePostsListBanUser } from "@/features/posts-list/lib/usePostsListBanUser";

export const PostsListPage = () => {
  const [search, setSearch] = useState("");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { openModal } = usePostsListBanUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const {
    data,
    isLoading,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts({ search });

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Page className={s.page}>
      <div className={s.container}>
        <Input
          search
          value={search}
          onChange={handleInputChange}
          onInputClear={() => setSearch("")}
          className={s.searchInput}
        />

        {isLoading && !isFetched ? (
          <Loader />
        ) : (
          <>
            <div className={s.postsList}>
              {data?.pages.map((page) =>
                page.items.map(
                  (item) =>
                    item && (
                      <Post
                        key={item.id}
                        images={
                          item.getPostsPhotos
                            ?.map((photo) => photo.url)
                            .filter((url): url is string => Boolean(url)) || []
                        }
                        avatar={item.postOwnerInfo?.getAvatar?.url || ""}
                        username={item.postOwnerInfo?.username}
                        description={item.description || ""}
                        createdAt={item.createdAt}
                        openBanModal={() =>
                          openModal(
                            {
                              userName: item.postOwnerInfo?.username || "",
                              userId: item.postOwnerInfo?.userId || "",
                            },
                            "ban",
                          )
                        }
                      />
                    ),
                ),
              )}
            </div>
            <div ref={loadMoreRef} className={s.loadMoreTrigger}>
              {isFetchingNextPage && <Loader />}
            </div>
          </>
        )}
      </div>
      <PostsListModals />
    </Page>
  );
};
