import { useQuery } from "@tanstack/react-query";
import { fetchFollowingByUser } from "@/features/view-profile-page/api/fetchFollowingByUser";
import { useParams, useRouter } from "next/navigation";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";
import { Path } from "@/shared/const/path";
import { useState } from "react";
import { SortDirection } from "@/shared/configs/gql/graphql";

export type SortByParam = "username" | "createdAt";

export const useFollowersPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortByParam>("username");
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    null,
  );
  const { pageSize, pageNumber, setNewParams } = usePaginationParams({});

  if (!id) {
    router.push(Path.Admin.UserList);
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["viewProfile", "Followers", id, pageNumber, pageSize, sortBy],
    queryFn: () =>
      fetchFollowingByUser({
        sortBy,
        pageNumber,
        pageSize,
        sortDirection: sortDirection || SortDirection.Asc,
        userId: id || "",
      }),
  });

  const toggleSort = (field: SortByParam) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSortDirection(SortDirection.Asc);
    } else {
      setSortDirection(
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc,
      );
    }

    refetch();
  };

  return {
    data,
    isLoading,
    pageSize,
    pageNumber,
    setNewParams,
    sortBy,
    sortDirection,
    toggleSort,
  };
};
