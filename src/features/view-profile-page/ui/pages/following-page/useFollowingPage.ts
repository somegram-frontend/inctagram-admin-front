import { useQuery } from "@tanstack/react-query";
import { fetchFollowingByUser } from "@/features/view-profile-page/api/fetchFollowingByUser";
import { useParams, useRouter } from "next/navigation";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";
import { Path } from "@/shared/const/path";
import { useState } from "react";
import { SortDirection } from "@/shared/configs/gql/graphql";

export type SortByParam = "username" | "createdAt";

export const useFollowingPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortByParam>("username");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc,
  );
  const { pageSize, pageNumber, setNewParams } = usePaginationParams({});

  if (!id) {
    router.push(Path.Admin.UserList);
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["viewProfile", "Following", id, pageNumber, pageSize, sortBy],
    queryFn: () =>
      fetchFollowingByUser({
        sortBy,
        pageNumber,
        pageSize,
        sortDirection: sortDirection,
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
