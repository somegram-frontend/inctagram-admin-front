import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/userList/api";
import { SortDirection } from "@/shared/configs/gql/graphql";

export type SortBy = "username" | "createdAt" | "";

type Params = {
  pageNumber: number;
  pageSize: number;
  sortBy: SortBy;
  sortDirection: SortDirection;
  search: string;
};

export const useUsers = (props: Params) => {
  const { pageNumber, pageSize, sortBy, sortDirection, search } = props;

  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () =>
      fetchUsers({ pageNumber, pageSize, sortBy, sortDirection, search }),
  });
};
