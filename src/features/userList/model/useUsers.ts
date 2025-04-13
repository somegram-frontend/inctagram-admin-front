import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/userList/api";
import { SortDirection } from "@/shared/configs/gql/graphql";

export type SortField = "username" | "createdAt" | "";

type Params = {
  pageNumber: number;
  pageSize: number;
  sortBy: SortField;
  sortDirection: SortDirection;
};
export const useUsers = (props: Params) => {
  const { pageNumber, pageSize, sortBy, sortDirection } = props;

  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => fetchUsers({ pageNumber, pageSize, sortBy, sortDirection }),
  });
};
