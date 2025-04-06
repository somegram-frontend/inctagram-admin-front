import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/userList/api";

type Params = {
  pageNumber: number;
  pageSize: number;
};
export const useUsers = ({ pageNumber, pageSize }: Params) => {
  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => fetchUsers({ pageNumber, pageSize }),
  });
};
