"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/users-list/api";
import { SortDirection, UserBlockStatus } from "@/shared/configs/gql/graphql";
export type SortBy = "username" | "createdAt" | "";

type Params = {
  pageNumber: number;
  pageSize: number;
  sortBy: SortBy;
  sortDirection: SortDirection;
  search: string;
  statusFilter: UserBlockStatus;
};

export const useUsers = (props: Params) => {
  const { pageNumber, pageSize, sortBy, sortDirection, search, statusFilter } =
    props;

  return useQuery({
    queryKey: ["users", pageNumber, pageSize, statusFilter, search],
    queryFn: () =>
      fetchUsers({
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        search,
        statusFilter,
      }),
  });
};
