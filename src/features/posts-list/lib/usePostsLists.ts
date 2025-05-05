import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api";
import { SortDirection } from "@/shared/configs/gql/graphql";

export const usePosts = ({ search }: { search: string }) => {
  return useInfiniteQuery({
    queryKey: ["posts", search],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchPayments({
        pageNumber: pageParam,
        pageSize: 8,
        searchByUsername: search,
        sortBy: "createdAt",
        sortDirection: SortDirection.Desc,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.pagesCount) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
