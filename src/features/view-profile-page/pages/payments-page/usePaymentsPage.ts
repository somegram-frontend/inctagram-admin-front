"use client";

import { useParams, useRouter } from "next/navigation";
import { Path } from "@/shared/const/path";
import { useQuery } from "@tanstack/react-query";
import { fetchPaymentsByUser } from "@/features/view-profile-page/api";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";

export const usePaymentsPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const { pageSize, pageNumber, setNewParams } = usePaginationParams({});

  if (!id) {
    router.push(Path.Admin.UserList);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["viewProfile", "Payments", id, pageNumber, pageSize],
    queryFn: () =>
      fetchPaymentsByUser({
        pageNumber,
        pageSize,
        userId: id || "",
      }),
  });

  return {
    data,
    isLoading,
    pageSize,
    pageNumber,
    setNewParams,
  };
};
